import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path));
const text = (path) => read(path).toString("utf8");
const sha256 = (path) => createHash("sha256").update(read(path)).digest("hex");

describe("Elixir-first repository boundary", () => {
  it("keeps hosted runtime paths out of the active tree", () => {
    for (const path of [
      "src",
      "public",
      ".env.example",
      "next-env.d.ts",
      "next.config.ts",
      "playwright.elixirs.config.ts",
      "tests/e2e/guide.spec.ts",
    ]) {
      expect(existsSync(resolve(root, path)), path).toBe(false);
    }
  });

  it("makes the cabinet the default command and dependency surface", () => {
    const packageJson = JSON.parse(text("package.json"));
    expect(packageJson.scripts.start).toBe(
      "npm run build && npm run audit:elixirs && npm run start:elixirs",
    );
    expect(packageJson.scripts.build).toBe("npm run build:elixirs");
    expect(packageJson.scripts["test:e2e"]).toBe("playwright test");
    expect({ ...packageJson.dependencies, ...packageJson.devDependencies }).not.toHaveProperty("next");
    expect({ ...packageJson.dependencies, ...packageJson.devDependencies }).not.toHaveProperty("react");
    expect({ ...packageJson.dependencies, ...packageJson.devDependencies }).not.toHaveProperty("react-dom");
  });

  it("preserves the reviewed cartridge and artwork bytes", () => {
    expect({
      signal: sha256("content/elixirs/signal.md"),
      mystery: sha256("content/elixirs/mystery.md"),
      story: sha256("content/elixirs/story.md"),
      signalArt: sha256("site/elixirs/assets/cartridges/signal.png"),
      mysteryArt: sha256("site/elixirs/assets/cartridges/mystery.png"),
      storyArt: sha256("site/elixirs/assets/cartridges/story.png"),
    }).toEqual({
      signal: "1c371b5813f6d93f37cabe486337f2680928f3e2ae5c19d4e86d40328f597cbb",
      mystery: "f02cc863fb1a7cabd137c7980c2206e947313fa0e010926d1754bb5cb7f2b093",
      story: "48f4cb4f2b9cbca8c4ce04ba844b12cfb28a6a2e5398cb211ad827e04d6874d9",
      signalArt: "bc91387fba453db6efcea7c5cb1464c9fcf4271672c467806d1973535fb51f5c",
      mysteryArt: "11951585da65e906b2c94488598bf72eca6d1e4a4a5b40b1d49d0437253d022e",
      storyArt: "be8da2a8d9fa5e8a723d1cdb6f72ef37526201f6602e21e5b9607f7278fed4ba",
    });
  });

  it("documents exact non-destructive recovery and the compatibility blocker", () => {
    const archive = text("docs/archive/hosted-prototype/README.md");
    expect(archive).toContain("hosted-prototype-final");
    expect(archive).toContain("27a1de7d92fd49f18c51b826c81d82cbb095b235");
    expect(archive).toContain("git worktree add");
    expect(archive).not.toMatch(/reset\s+--hard/);

    const overview = text("README.md");
    expect(overview).toMatch(/One\s+owner-observed ChatGPT attempt failed/);
    expect(overview).toMatch(
      /not a complete evidence\s+run or\s+compatibility pass/,
    );
  });
});
