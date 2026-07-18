import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, index, values) => {
    if (value.startsWith("--")) pairs.push([value.slice(2), values[index + 1]]);
    return pairs;
  }, []),
);

const root = resolve(args.root ?? "dist/elixirs-pages");
const port = Number(args.port ?? 4173);
const basePath = `/${String(args["base-path"] ?? "").replace(/^\/+|\/+$/g, "")}`;
const normalizedBase = basePath === "/" ? "" : basePath;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
};

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host ?? "localhost"}`);
  let pathname = decodeURIComponent(requestUrl.pathname);
  if (normalizedBase && (pathname === normalizedBase || pathname.startsWith(`${normalizedBase}/`))) {
    pathname = pathname.slice(normalizedBase.length) || "/";
  }

  let candidate = resolve(root, `.${pathname}`);
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    candidate = resolve(candidate, "index.html");
  }
  if (!existsSync(candidate) || !statSync(candidate).isFile()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": contentTypes[extname(candidate)] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(candidate).pipe(response);
});

server.listen(port, "0.0.0.0", () => {
  process.stdout.write(
    `Static Elixir cabinet listening at http://127.0.0.1:${port}${normalizedBase}/\n` +
      "Warning: this unauthenticated development server listens on all network interfaces; protect remote access with firewall or SSH controls.\n",
  );
});
