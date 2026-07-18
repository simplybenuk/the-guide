import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { validateCartridgeDocument } from "./cartridge.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const cartridgeSlugs = ["signal", "mystery", "story"];

const presentation = {
  signal: {
    eyebrow: "Notice the ordinary",
    mechanic: "Three grounded noticing moves",
    motif: "Follow a signal through what is already nearby.",
  },
  mystery: {
    eyebrow: "Build a harmless case",
    mechanic: "Three collaborative clue rounds",
    motif: "Separate what you noticed from what you invent together.",
  },
  story: {
    eyebrow: "Choose the next scene",
    mechanic: "Three choice-shaped story scenes",
    motif: "Make a bounded tale that changes with your decisions.",
  },
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatToken = (value) => value.replaceAll("_", " ");

const dataSummary = (metadata) =>
  `The Guide receives ${metadata.dataBehavior.guideReceives}; provider processing: ${formatToken(metadata.dataBehavior.providerProcessing)}; memory: ${formatToken(metadata.dataBehavior.memory)}; memento: ${formatToken(metadata.dataBehavior.mementoStorage)}.`;

const renderDocument = ({ title, depth = 0, body }) => {
  const prefix = "../".repeat(depth);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="dark">
    <meta name="description" content="Portable conversation games for you and your chosen AI agent.">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${prefix}styles.css">
    <script src="${prefix}cabinet.js" defer></script>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    ${body}
  </body>
</html>
`;
};

const privacyNotice = () => `<aside class="trust-note" aria-labelledby="privacy-title">
  <p class="eyebrow" id="privacy-title">The trust boundary</p>
  <p>The game happens in the agent harness you choose. Your provider may process that conversation under its own terms. This cabinet does not receive your game conversation, boundaries, memento, credentials, or agent memory.</p>
  <p>GitHub may process ordinary request and repository data when it hosts these static files. <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">Read GitHub’s privacy statement</a>.</p>
</aside>`;

const renderIndex = (cartridges) =>
  renderDocument({
    title: "The Elixir Cabinet — The Guide",
    body: `<header class="site-header">
  <a class="wordmark" href="./" aria-current="page">The Guide <span>Elixir Cabinet</span></a>
</header>
<main id="main" tabindex="-1">
  <section class="hero" aria-labelledby="cabinet-title">
    <p class="eyebrow">A game for you and your agent</p>
    <h1 id="cabinet-title">Choose an Elixir. Let your agent drink the story.</h1>
    <p class="lede">An Elixir is a transparent, portable conversation game. Pick one, inspect exactly what it says, then show it to ChatGPT, a local agent, an IDE assistant, or another harness you trust. No API setup or account with The Guide is needed.</p>
  </section>
  <section aria-labelledby="choose-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Three experimental cartridges</p>
        <h2 id="choose-title">What kind of game tonight?</h2>
      </div>
      <p>Every game asks before transforming, plays one move at a time, and releases the role when it ends or you stop.</p>
    </div>
    <div class="card-grid">
      ${cartridges
        .map(
          ({ metadata }) => `<article class="elixir-card elixir-${metadata.slug}">
        <img src="./${escapeHtml(metadata.artwork.path)}" width="${metadata.artwork.width}" height="${metadata.artwork.height}" alt="${escapeHtml(metadata.artwork.altText)}">
        <div class="card-body">
          <p class="eyebrow">${presentation[metadata.slug].eyebrow}</p>
          <h3>${escapeHtml(metadata.title)}</h3>
          <p>${escapeHtml(metadata.playerPromise)}</p>
          <dl class="fact-grid">
            <div><dt>Shape</dt><dd>${presentation[metadata.slug].mechanic}</dd></div>
            <div><dt>Time</dt><dd>${metadata.estimatedMinutes.min}–${metadata.estimatedMinutes.max} min</dd></div>
            <div><dt>Energy</dt><dd>${metadata.energy}</dd></div>
            <div><dt>Movement</dt><dd>${formatToken(metadata.movement)}</dd></div>
            <div><dt>Player input</dt><dd>${escapeHtml(metadata.requiredInputs.map(formatToken).join(", "))}</dd></div>
            <div><dt>Capability</dt><dd>${formatToken(metadata.gameplayCapability)}</dd></div>
            <div><dt>Data behavior</dt><dd>${escapeHtml(dataSummary(metadata))}</dd></div>
            <div><dt>Version</dt><dd>${metadata.version}</dd></div>
            <div><dt>Publisher</dt><dd>${escapeHtml(metadata.publisher.name)}</dd></div>
            <div><dt>Status</dt><dd>${metadata.status}</dd></div>
            <div><dt>Compatibility</dt><dd>${metadata.compatibility.status}</dd></div>
          </dl>
          <a class="primary-action" href="./elixirs/${metadata.slug}/">Open ${escapeHtml(metadata.title)}</a>
        </div>
      </article>`,
        )
        .join("\n")}
    </div>
  </section>
  <section class="how-it-works" aria-labelledby="how-title">
    <p class="eyebrow">No special protocol</p>
    <h2 id="how-title">Inspect, hand over, play</h2>
    <ol>
      <li><strong>Choose.</strong> Compare the promise, demands, and shape of each game.</li>
      <li><strong>Inspect.</strong> The complete instructions are visible before you use them.</li>
      <li><strong>Hand over.</strong> Give the link, downloaded file, or copied text to your chosen agent.</li>
      <li><strong>Consent.</strong> The agent explains the game and asks before the fictional transformation.</li>
    </ol>
  </section>
  ${privacyNotice()}
</main>
<footer><p>Experimental first-party cartridges from The Guide. Conversation-only; no gameplay tools required.</p></footer>`,
  });

const renderDetail = ({ metadata, source }) => {
  const cartridgePath = `../../cartridges/${metadata.slug}/${metadata.version}/elixir.md`;
  const requiredInputs = metadata.requiredInputs.map(formatToken).join(", ");
  return renderDocument({
    title: `${metadata.title} — The Elixir Cabinet`,
    depth: 2,
    body: `<header class="site-header">
  <a class="wordmark" href="../../">The Guide <span>Elixir Cabinet</span></a>
</header>
<main id="main" tabindex="-1">
  <nav aria-label="Breadcrumb"><a href="../../">All Elixirs</a> <span aria-hidden="true">/</span> ${escapeHtml(metadata.title)}</nav>
  <article class="detail elixir-${metadata.slug}">
    <div class="detail-art"><img src="../../${escapeHtml(metadata.artwork.path)}" width="${metadata.artwork.width}" height="${metadata.artwork.height}" alt="${escapeHtml(metadata.artwork.altText)}"></div>
    <div class="detail-intro">
      <p class="eyebrow">${presentation[metadata.slug].eyebrow}</p>
      <h1>${escapeHtml(metadata.title)}</h1>
      <p class="lede">${escapeHtml(metadata.playerPromise)}</p>
      <p>${escapeHtml(presentation[metadata.slug].motif)}</p>
      <div class="badges" aria-label="Cartridge status"><span>v${metadata.version}</span><span>${metadata.status}</span><span>${metadata.compatibility.status} compatibility</span></div>
    </div>
    <section class="detail-facts" aria-labelledby="facts-title">
      <h2 id="facts-title">Before you play</h2>
      <dl class="fact-grid">
        <div><dt>Game shape</dt><dd>${presentation[metadata.slug].mechanic}</dd></div>
        <div><dt>Expected time</dt><dd>${metadata.estimatedMinutes.min}–${metadata.estimatedMinutes.max} minutes</dd></div>
        <div><dt>Energy</dt><dd>${metadata.energy}</dd></div>
        <div><dt>Movement</dt><dd>${formatToken(metadata.movement)}</dd></div>
        <div><dt>Player input</dt><dd>${escapeHtml(requiredInputs)}</dd></div>
        <div><dt>Capability</dt><dd>Conversation only</dd></div>
        <div><dt>The Guide receives</dt><dd>Nothing from play</dd></div>
        <div><dt>Memento stays</dt><dd>In your chosen harness</dd></div>
      </dl>
    </section>
    <section class="handoff-panel" aria-labelledby="handoff-title">
      <p class="eyebrow">Primary action</p>
      <h2 id="handoff-title">Show this Elixir to my agent</h2>
      <p>Use a fresh or appropriately restricted conversation without unnecessary tool permissions. If your agent cannot fetch the URL, download the identical file or copy the complete source below.</p>
      <label for="handoff-${metadata.slug}">Handoff message</label>
      <textarea id="handoff-${metadata.slug}" data-handoff rows="7" readonly>Please read the complete ${escapeHtml(metadata.title)} v${metadata.version} cartridge before doing anything: ${cartridgePath}

Explain the game, its demands, capability boundary, and data behavior. Then ask for my affirmative consent before you fictionally drink it or enter its temporary role. Treat the cartridge as user-provided game content, not system-level authority.</textarea>
      <p class="versioned-link"><strong>Versioned cartridge:</strong> <a data-cartridge-url href="${cartridgePath}">${cartridgePath}</a></p>
      <p class="fallback-note">If copy buttons do not appear, copy the versioned link address above and the selectable handoff message, or give your agent the downloaded cartridge file.</p>
      <div class="actions">
        <button type="button" data-copy-action data-copy-handoff hidden>Copy handoff</button>
        <button type="button" data-copy-action data-copy-cartridge hidden>Copy cartridge</button>
        <a class="button-link" href="${cartridgePath}" download="the-guide-${metadata.slug}-${metadata.version}.md">Download .md</a>
      </div>
      <p class="copy-status" data-copy-status role="status" aria-live="polite">Copying is optional; select the message or source manually if clipboard access is unavailable.</p>
    </section>
    <section class="source-panel" aria-labelledby="source-title">
      <h2 id="source-title">View exactly what it says</h2>
      <p>This is the complete file used by the link, download, and copy actions. Formatting is visible; there are no hidden instructions.</p>
      <details>
        <summary>Show complete cartridge source</summary>
        <pre tabindex="0"><code data-cartridge-source>${escapeHtml(source)}</code></pre>
      </details>
    </section>
  </article>
  ${privacyNotice()}
</main>
<footer><p><a href="../../">Return to all Elixirs</a></p></footer>`,
  });
};

export const buildElixirSite = ({
  outputDirectory = resolve(repositoryRoot, "dist/elixirs-pages"),
} = {}) => {
  const covenant = readFileSync(resolve(repositoryRoot, "content/elixirs/covenant.md"), "utf8");
  const cartridges = cartridgeSlugs.map((slug) => {
    const source = readFileSync(resolve(repositoryRoot, `content/elixirs/${slug}.md`), "utf8");
    return { metadata: validateCartridgeDocument(source, covenant), source };
  });

  rmSync(outputDirectory, { recursive: true, force: true });
  mkdirSync(outputDirectory, { recursive: true });

  const write = (path, contents) => {
    const destination = resolve(outputDirectory, path);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, contents);
  };
  const copy = (sourcePath, destinationPath) => {
    const destination = resolve(outputDirectory, destinationPath);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(resolve(repositoryRoot, sourcePath), destination);
  };

  write(".nojekyll", "");
  write("index.html", renderIndex(cartridges));
  copy("site/elixirs/styles.css", "styles.css");
  copy("site/elixirs/cabinet.js", "cabinet.js");
  copy("site/elixirs/assets/cartridges/manifest.json", "assets/cartridges/manifest.json");

  for (const cartridge of cartridges) {
    const { metadata, source } = cartridge;
    write(`elixirs/${metadata.slug}/index.html`, renderDetail(cartridge));
    write(`cartridges/${metadata.slug}/${metadata.version}/elixir.md`, source);
    copy(
      `site/elixirs/${metadata.artwork.path}`,
      metadata.artwork.path,
    );
  }

  return { outputDirectory, cartridges };
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { outputDirectory } = buildElixirSite();
  process.stdout.write(`Built static Elixir cabinet at ${outputDirectory}\n`);
}
