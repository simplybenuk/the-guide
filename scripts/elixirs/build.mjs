import { copyFileSync, lstatSync, mkdirSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

import {
  createPublicCatalogueIndex,
  loadCatalogue,
  relatedCatalogueEntries,
  renderWithdrawalTombstone,
} from "./catalogue.mjs";
import {
  deliveryDeploymentRevision,
  renderDeliveryEventBrowserRuntime,
} from "./delivery-events.mjs";
import {
  createCartridgeDownloadName,
  createLauncherPrompt,
  validateUniqueCartridgeDownloadNames,
  validateSourceRevision,
} from "./delivery-envelope.mjs";
import {
  agentElixirArchiveName,
  createAgentElixirArchive,
} from "./skill-archive.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const cataloguePageSize = 24;

const resolveInside = (root, path, label) => {
  if (isAbsolute(path)) throw new Error(`${label} path must be relative: ${path}`);
  const destination = resolve(root, path);
  const fromRoot = relative(root, destination);
  if (fromRoot === "" || fromRoot === ".." || fromRoot.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`) || isAbsolute(fromRoot)) {
    throw new Error(`${label} path escapes its approved root: ${path}`);
  }
  return destination;
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatToken = (value) => value.replaceAll("_", " ");
const releaseKey = ({ elixirId, version }) => `${elixirId}@${version}`;
const evidenceArtifactPath = ({ release, kind, index }) => `evidence/${release.publisherId}/${release.slug}/${release.version}/${kind}-${index + 1}.md`;
const renderEvidenceLinks = ({ release, kind, references, prefix }) => references.map((reference, index) => `<a href="${prefix}${evidenceArtifactPath({ release, kind, index })}">${escapeHtml(reference.split("/").at(-1))}</a>`).join(", ");

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
    <script src="${prefix}delivery-events.js" defer></script>
    <script src="${prefix}catalogue.js" defer></script>
    <script src="${prefix}cabinet.js" defer></script>
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    ${body}
  </body>
</html>
`;
};

const privacyNotice = (depth = 0) => `<aside class="trust-note" aria-labelledby="privacy-title">
  <p class="eyebrow" id="privacy-title">The trust boundary</p>
  <p>The game happens in the agent harness you choose. Your provider may process that conversation under its own terms. The Guide does not receive your game conversation, search, boundaries, memento, credentials, or agent memory.</p>
  <p>GitHub may process ordinary request and repository data when it hosts these static files. <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">Read GitHub’s privacy statement</a>.</p>
  <p>This experimental release is for personal, non-commercial alpha testing. <a href="${"../".repeat(depth)}terms.md">Read the alpha usage terms</a>.</p>
</aside>`;

const catalogueMaps = (catalogue) => ({
  byId: new Map(catalogue.taxonomy.map((value) => [value.id, value])),
  releaseByKey: new Map(catalogue.releases.map((value) => [releaseKey(value), value])),
  cartridgeByKey: new Map(catalogue.cartridges.map((value) => [releaseKey(value.release), value])),
});

const compactCardView = ({ entry, catalogue }) => {
  const { byId, releaseByKey, cartridgeByKey } = catalogueMaps(catalogue);
  const release = releaseByKey.get(`${entry.elixirId}@${entry.recommendedVersion}`);
  const { metadata } = cartridgeByKey.get(releaseKey(release));
  const mechanic = byId.get(entry.mechanicId).label;
  const taxonomyIds = [...new Set([
    ...entry.categoryIds, ...entry.tagIds, ...entry.toneIds, entry.mechanicId,
    ...entry.activityIds, entry.replayabilityId, entry.durationBandId,
    ...entry.contentNoteIds, ...entry.accessConsiderationIds, ...entry.audienceIds, ...entry.localeIds,
    ...(entry.storyDiscovery ? Object.values(entry.storyDiscovery).flat() : []),
  ])].join(" ");
  const artwork = entry.catalogueArtwork
    ? (() => {
        const asset = catalogue.artworkManifest.assets.find(({ id }) => id === entry.catalogueArtwork.provenanceId);
        return {
          path: asset.path,
          width: asset.dimensions.width,
          height: asset.dimensions.height,
          altText: entry.catalogueArtwork.altText,
        };
      })()
    : metadata.artwork;
  return { release, metadata, artwork, mechanic, taxonomyIds };
};

const renderFitSignals = ({ entry, metadata, mechanic }) => `<ul class="fit-signals" aria-label="Elixir fit">
  <li>${metadata.estimatedMinutes.min}–${metadata.estimatedMinutes.max} min</li>
  <li>${escapeHtml(formatToken(entry.energy))} energy</li>
  <li>${escapeHtml(mechanic)}</li>
</ul>`;

const renderCompactCard = ({ entry, catalogue, hrefPrefix = "./" }) => {
  const { release, metadata, artwork, mechanic, taxonomyIds } = compactCardView({ entry, catalogue });
  return `<article class="elixir-card compact-card elixir-${entry.slug}" data-catalogue-entry data-elixir-id="${escapeHtml(entry.elixirId)}" data-taxonomy-ids="${escapeHtml(taxonomyIds)}">
    <img src="${hrefPrefix}${escapeHtml(artwork.path)}" width="${artwork.width}" height="${artwork.height}" alt="${escapeHtml(artwork.altText)}" loading="lazy">
    <div class="card-body">
      <p class="eyebrow">${escapeHtml(mechanic)}</p>
      <h3>${escapeHtml(entry.title)}</h3>
      <p class="card-promise">${escapeHtml(entry.playerPromise)}</p>
      ${renderFitSignals({ entry, metadata, mechanic })}
      <p class="card-status">${escapeHtml(release.statusAtPublication)} · ${escapeHtml(entry.lifecycle)}</p>
      <a class="primary-action" href="${hrefPrefix}elixirs/${entry.slug}/">Open ${escapeHtml(entry.title)}</a>
    </div>
  </article>`;
};

const renderSpotlight = ({ entry, catalogue }) => {
  const { release, metadata, artwork, mechanic } = compactCardView({ entry, catalogue });
  return `<article class="spotlight elixir-${entry.slug}" data-spotlight>
    <div class="spotlight-art"><img src="./${escapeHtml(artwork.path)}" width="${artwork.width}" height="${artwork.height}" alt="${escapeHtml(artwork.altText)}"></div>
    <div class="spotlight-body">
      <p class="eyebrow">Featured story · ${escapeHtml(mechanic)}</p>
      <h2>${escapeHtml(entry.title)}</h2>
      <p class="lede">${escapeHtml(entry.playerPromise)}</p>
      <p>${escapeHtml(entry.featuredRationale)}</p>
      ${renderFitSignals({ entry, metadata, mechanic })}
      <p class="card-status">${escapeHtml(release.statusAtPublication)} · ${escapeHtml(entry.lifecycle)} · not ranked by popularity</p>
      <div class="actions"><a class="primary-action" href="./elixirs/${entry.slug}/">View ${escapeHtml(entry.title)}</a><a class="button-link" href="./browse/">Browse all stories</a></div>
    </div>
  </article>`;
};

const renderShelf = ({ collection, catalogue }) => {
  const titleId = `collection-${collection.id}`;
  return `<section class="catalogue-shelf" data-shelf aria-labelledby="${titleId}">
    <div class="shelf-heading">
      <div><p class="eyebrow">Story collection</p><h2 id="${titleId}">${escapeHtml(collection.title)}</h2><p>${escapeHtml(collection.summary)}</p></div>
      <a href="./collections/${collection.id}/">View collection</a>
    </div>
    <div class="shelf-controls" aria-label="${escapeHtml(collection.title)} shelf controls">
      <button class="secondary-action" type="button" data-shelf-previous hidden aria-label="Previous ${escapeHtml(collection.title)} Elixirs">←</button>
      <button class="secondary-action" type="button" data-shelf-next hidden aria-label="Next ${escapeHtml(collection.title)} Elixirs">→</button>
    </div>
    <ol class="shelf-track" data-shelf-track tabindex="0" aria-label="${escapeHtml(collection.title)} Elixirs">
      ${collection.elixirIds.map((id) => `<li class="shelf-item">${renderCompactCard({ entry: catalogue.entries.find(({ elixirId }) => elixirId === id), catalogue })}</li>`).join("\n")}
    </ol>
  </section>`;
};

const publicJson = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

const renderFilterControls = (catalogue) => {
  const index = createPublicCatalogueIndex(catalogue);
  const used = new Set(index.entries.flatMap(({ taxonomyIds }) => taxonomyIds));
  const facets = [
    "duration", "energy", "movement", "mechanic", "tone", "genre", "story_shape",
    "interaction_mode", "emotional_intensity", "replayability", "input", "content_note", "access",
  ];
  return facets.map((facet) => {
    const values = catalogue.taxonomy.filter((value) => value.facet === facet && value.lifecycle === "active" && used.has(value.id));
    if (values.length === 0) return "";
    return `<fieldset><legend>${escapeHtml(formatToken(facet))}</legend>${values.map((value) => `<label class="filter-option"><input type="checkbox" data-filter-id="${value.id}" data-filter-facet="${facet}"> ${escapeHtml(value.label)}</label>`).join("")}</fieldset>`;
  }).join("");
};

const renderPagination = ({ page, pages, nested = false }) => {
  if (pages <= 1) return "";
  const links = Array.from({ length: pages }, (_, index) => index + 1).map((number) => {
    const href = number === 1 ? (nested ? "../" : "./") : (nested ? `../page-${number}/` : `./page-${number}/`);
    return number === page
      ? `<span aria-current="page">Page ${number}</span>`
      : `<a href="${href}">Page ${number}</a>`;
  });
  return `<nav class="catalogue-pagination" data-static-pagination aria-label="Catalogue pages">${links.join(" ")}</nav>`;
};

const renderIndex = (catalogue) => {
  const publicEntries = catalogue.entries.filter(({ lifecycle }) => lifecycle !== "withdrawn");
  const spotlight = publicEntries.find(({ featuredRationale }) => featuredRationale) ?? publicEntries[0];
  return renderDocument({
    title: "The Guide — Interactive stories",
    body: `<header class="site-header">
  <a class="wordmark" href="./" aria-current="page">The Guide <span>Interactive stories</span></a>
</header>
<main id="main" tabindex="-1">
  <section class="hero" aria-labelledby="cabinet-title">
    <p class="eyebrow">Interactive stories for you and your AI</p>
    <h1 id="cabinet-title">Choose a story. Shape what happens.</h1>
    <p class="lede">Explore original stories you play in conversation. Pick a title, download its cartridge, then attach the complete experience to a new chat with an agent you trust.</p>
    <p><a class="button-link" href="./browse/#catalogue-search">Browse all ${publicEntries.length} stories</a></p>
  </section>
  ${renderSpotlight({ entry: spotlight, catalogue })}
  <section class="shelf-library" aria-labelledby="collections-title">
    <div class="section-heading"><div><p class="eyebrow">The collection</p><h2 id="collections-title">Find something to play</h2></div><p>Curated by people, never ranked from private play, tracking, or popularity.</p></div>
    ${catalogue.collections.map((collection) => renderShelf({ collection, catalogue })).join("\n")}
  </section>
  <section class="how-it-works" aria-labelledby="how-title">
    <p class="eyebrow">No special protocol</p><h2 id="how-title">Download, attach, play</h2>
    <ol><li><strong>Choose.</strong> Compare the promise, demands, and shape.</li><li><strong>Download.</strong> Save the clearly named Markdown cartridge.</li><li><strong>Attach.</strong> Add it to a new chat and send the short prompt.</li><li><strong>Consent.</strong> The agent explains the game and asks first.</li></ol>
  </section>
  ${privacyNotice()}
</main>
<footer><p>Original interactive stories from The Guide. Played in conversation; no gameplay tools required.</p></footer>`,
  });
};

const renderBrowsePage = ({ catalogue, page, pages }) => {
  const index = createPublicCatalogueIndex(catalogue);
  const publicEntries = catalogue.entries.filter(({ lifecycle }) => lifecycle !== "withdrawn");
  const entries = publicEntries.slice((page - 1) * cataloguePageSize, page * cataloguePageSize);
  const nested = page > 1;
  const rootPrefix = nested ? "../../" : "../";
  const controls = page === 1 ? `<section data-catalogue data-root-prefix="../" aria-labelledby="browse-title">
    <div class="catalogue-controls">
      <label for="catalogue-search">Search titles, promises, mechanics, and moods</label>
      <input id="catalogue-search" type="search" data-catalogue-search autocomplete="off">
      <label for="catalogue-sort">Sort</label>
      <select id="catalogue-sort" data-catalogue-sort><option value="editorial">Editorial order</option><option value="title">Title</option><option value="duration">Duration</option></select>
      <details class="filter-panel"><summary>Filter the catalogue</summary>${renderFilterControls(catalogue)}<button class="secondary-action" type="button" data-clear-filters>Clear search and filters</button></details>
      <p data-catalogue-status role="status" aria-live="polite">${index.entries.length} Elixirs shown${index.entries.length > entries.length ? `; first ${entries.length} displayed` : ""}.</p>
    </div>
    <p data-catalogue-empty hidden>No Elixirs match those choices. Clear one filter or reset the catalogue.</p>
    <div class="card-grid compact-grid" data-catalogue-grid>${entries.map((entry) => renderCompactCard({ entry, catalogue, hrefPrefix: "../" })).join("\n")}</div>
    <p class="catalogue-more"><button class="secondary-action" type="button" data-show-more hidden>Show more Elixirs</button></p>
    ${renderPagination({ page, pages })}
    <script id="catalogue-data" type="application/json">${publicJson(index)}</script>
  </section>` : `<div class="card-grid compact-grid">${entries.map((entry) => renderCompactCard({ entry, catalogue, hrefPrefix: rootPrefix })).join("\n")}</div>${renderPagination({ page, pages, nested: true })}`;
  return renderDocument({
    title: `Story catalogue page ${page} — The Guide`,
    depth: nested ? 2 : 1,
    body: `<header class="site-header"><a class="wordmark" href="${rootPrefix}">The Guide <span>Interactive stories</span></a></header>
<main id="main" tabindex="-1">
  <nav aria-label="Breadcrumb"><a href="${rootPrefix}">Home</a> <span aria-hidden="true">/</span> ${page === 1 ? "Browse all Elixirs" : `Browse page ${page}`}</nav>
  <section class="hero"><p class="eyebrow">All stories</p><h1 id="browse-title">${page === 1 ? "Browse all stories" : `Story catalogue page ${page}`}</h1><p class="lede">Search by mood, format, time, or the kind of choice you want to make.</p></section>
  ${controls}
  ${privacyNotice(nested ? 2 : 1)}
</main><footer><p><a href="${rootPrefix}">Return to editorial discovery</a></p></footer>`,
  });
};

const renderCollection = ({ collection, catalogue }) => renderDocument({
  title: `${collection.title} — The Guide`,
  depth: 2,
  body: `<header class="site-header"><a class="wordmark" href="../../">The Guide <span>Interactive stories</span></a></header>
<main id="main" tabindex="-1">
  <nav aria-label="Breadcrumb"><a href="../../">All stories</a> <span aria-hidden="true">/</span> ${escapeHtml(collection.title)}</nav>
  <section class="hero"><p class="eyebrow">Editorial collection</p><h1>${escapeHtml(collection.title)}</h1><p class="lede">${escapeHtml(collection.summary)}</p><p>Curated by ${escapeHtml(collection.curator)} · Updated ${collection.updatedAt}</p></section>
  <div class="card-grid compact-grid">${collection.elixirIds.map((id) => renderCompactCard({ entry: catalogue.entries.find(({ elixirId }) => elixirId === id), catalogue, hrefPrefix: "../../" })).join("\n")}</div>
  ${privacyNotice(2)}
</main><footer><p><a href="../../">Return to all stories</a></p></footer>`,
});

const renderTrustFacts = ({ entry, release, metadata, catalogue }) => {
  const publisher = catalogue.publishers.find(({ publisherId }) => publisherId === entry.publisherId);
  const contentNotes = entry.contentNoteIds.map((id) => catalogue.taxonomy.find((value) => value.id === id)?.label).filter(Boolean);
  return `<details class="trust-panel disclosure-panel">
    <summary>Version, safety, and provenance</summary>
    <div class="disclosure-content"><h2>Factual trust record</h2>
    <dl class="fact-grid">
      <div><dt>Publisher</dt><dd>${escapeHtml(publisher.displayName)} · first party</dd></div>
      <div><dt>Release</dt><dd>${release.version} · ${release.statusAtPublication}</dd></div>
      <div><dt>Lifecycle</dt><dd>${entry.lifecycle}</dd></div>
      <div><dt>Review</dt><dd>${entry.review.state} · ${entry.review.date}</dd></div>
      <div><dt>Maintenance</dt><dd>${escapeHtml(entry.maintenanceOwner)}</dd></div>
      <div><dt>Compatibility</dt><dd>${metadata.compatibility.status}: ${metadata.compatibility.testedHarnessClasses.map(formatToken).join(", ") || "no tested class"}</dd></div>
      <div><dt>Compatibility evidence</dt><dd>${renderEvidenceLinks({ release, kind: "compatibility", references: release.compatibilityReferences, prefix: "../../" })}</dd></div>
      <div><dt>Covenant</dt><dd>${release.covenantVersion}</dd></div>
      <div><dt>Integrity</dt><dd>SHA-256 ${release.sha256}</dd></div>
      <div><dt>Review evidence</dt><dd>${renderEvidenceLinks({ release, kind: "review", references: release.reviewReferences, prefix: "../../" })}</dd></div>
      <div><dt>Artwork provenance</dt><dd><a href="../../assets/cartridges/manifest.json">${escapeHtml(release.artwork.map(({ provenanceId }) => provenanceId).join(", "))}</a></dd></div>
      <div><dt>Source revision</dt><dd>${release.sourceRevision}</dd></div>
      <div><dt>Rights record</dt><dd><a href="../../terms.md">Alpha usage terms</a> · personal, non-commercial alpha terms</dd></div>
      <div><dt>Content notes</dt><dd>${escapeHtml(contentNotes.join(", ") || "No additional catalogue note")}</dd></div>
    </dl>
    <p><a href="versions/${release.version}/">View this version’s immutable paths and history</a></p>
    </div>
  </details>`;
};

const renderLifecycleNotice = ({ entry, state = entry, catalogue, hrefPrefix, versionRoute = false }) => {
  if (state.lifecycle === "withdrawn") {
    const successor = state.successor ? catalogue.entries.find(({ elixirId }) => elixirId === state.successor.elixirId) : null;
    const successorLink = successor ? ` Use <a href="${hrefPrefix}${successor.slug}/versions/${state.successor.version}/">${escapeHtml(successor.title)} ${state.successor.version}</a> instead.` : "";
    return `<aside class="lifecycle-notice" aria-labelledby="lifecycle-title-${entry.slug}"><p class="eyebrow">withdrawn</p><h2 id="lifecycle-title-${entry.slug}">This release is not playable</h2><p>The published cartridge paths now contain a deterministic public-interest tombstone. This history page does not provide delivery controls.${successorLink}</p></aside>`;
  }
  if (!["deprecated", "superseded"].includes(state.lifecycle) || !state.successor) return "";
  const successor = catalogue.entries.find(({ elixirId }) => elixirId === state.successor.elixirId);
  if (!successor) throw new Error(`Lifecycle successor is not in the catalogue: ${entry.elixirId}`);
  const successorHref = versionRoute ? `${hrefPrefix}${successor.slug}/versions/${state.successor.version}/` : `${hrefPrefix}${successor.slug}/`;
  return `<aside class="lifecycle-notice" aria-labelledby="lifecycle-title-${entry.slug}"><p class="eyebrow">${state.lifecycle}</p><h2 id="lifecycle-title-${entry.slug}">Use the maintained successor</h2><p>This historical version remains inspectable, but The Guide recommends <a href="${successorHref}">${escapeHtml(successor.title)} ${state.successor.version}</a> before starting play.</p></aside>`;
};

const renderDetail = ({ entry, release, metadata, source, catalogue, index }) => {
  const deliveryPath = release.legacyPaths[0] ?? release.canonicalPath;
  const cartridgePath = `../../${deliveryPath}`;
  const downloadName = createCartridgeDownloadName(metadata);
  const requiredInputs = metadata.requiredInputs.map(formatToken).join(", ");
  const prompt = createLauncherPrompt();
  const mechanic = catalogue.taxonomy.find(({ id }) => id === entry.mechanicId).label;
  const related = relatedCatalogueEntries(index.entries, entry.elixirId);
  const artwork = compactCardView({ entry, catalogue }).artwork;
  const participation = metadata.story
    ? metadata.story.interactionModes.map(formatToken).join(", ")
    : entry.interactionLabel;
  const playerNeedLabel = metadata.story ? "Your role" : "You provide";
  const playerNeed = metadata.story ? metadata.story.playerRole : requiredInputs;
  return renderDocument({
    title: `${metadata.title} — The Guide`, depth: 2,
    body: `<header class="site-header"><a class="wordmark" href="../../">The Guide <span>Interactive stories</span></a></header>
<main id="main" tabindex="-1">
  <nav aria-label="Breadcrumb"><a href="../../">All stories</a> <span aria-hidden="true">/</span> ${escapeHtml(metadata.title)}</nav>
  <article class="detail elixir-${metadata.slug}">
    <div class="detail-art"><img src="../../${escapeHtml(artwork.path)}" width="${artwork.width}" height="${artwork.height}" alt="${escapeHtml(artwork.altText)}"></div>
    <div class="detail-intro"><p class="eyebrow">${escapeHtml(mechanic)}</p><h1>${escapeHtml(metadata.title)}</h1><p class="lede">${escapeHtml(entry.summary)}</p></div>
    <section class="play-overview" aria-labelledby="play-overview-title"><p class="eyebrow">At a glance</p><h2 id="play-overview-title">What you need to play</h2><dl class="play-facts">
      <div><dt>Time and energy</dt><dd>${metadata.estimatedMinutes.min}–${metadata.estimatedMinutes.max} minutes · ${metadata.energy} energy</dd></div>
      <div><dt>How you play</dt><dd>${escapeHtml(participation)}</dd></div>
      <div><dt>${playerNeedLabel}</dt><dd>${escapeHtml(playerNeed)}</dd></div>
      <div><dt>Format</dt><dd>Conversation only · no gameplay tools</dd></div>
    </dl></section>
    ${renderLifecycleNotice({ entry, catalogue, hrefPrefix: "../" })}
    <section class="handoff-panel" aria-labelledby="handoff-title" data-elixir-id="${escapeHtml(metadata.id)}" data-elixir-version="${escapeHtml(metadata.version)}">
      <p class="eyebrow">How to play</p><h2 id="handoff-title">Take this story to your AI</h2>
      <ol class="delivery-steps"><li>Download the story cartridge.</li><li>Attach the Markdown file to a new conversation.</li><li>Send the short prompt below. Your agent explains the experience and asks before play begins.</li></ol>
      <div class="actions"><a class="primary-action" data-download-cartridge href="${cartridgePath}" download="${escapeHtml(downloadName)}">Download story</a></div>
      <label for="launcher-prompt-${metadata.slug}">Prompt to send with the attached file</label><textarea id="launcher-prompt-${metadata.slug}" data-launcher-prompt rows="6" readonly>${escapeHtml(prompt)}</textarea>
      <div class="actions"><button class="secondary-action" type="button" data-copy-action data-copy-launcher hidden>Copy prompt</button></div>
      <p class="copy-status" data-copy-status role="status" aria-live="polite">If clipboard access is unavailable, select and copy the visible prompt manually.</p>
      <details class="skill-panel"><summary>Use the Agent Skill</summary><p>On a compatible Agent Skills host, install this generic skill once. For any story, attach its downloaded cartridge and invoke <code>/agent-elixir</code> instead of sending the prompt above.</p><p>The skill contains no story and the cartridge must still be attached.</p><div class="actions"><a class="button-link" data-download-skill href="../../skills/${agentElixirArchiveName}" download="${agentElixirArchiveName}">Download agent-elixir skill</a></div></details>
    </section>
    ${renderTrustFacts({ entry, release, metadata, catalogue })}
    <details class="source-panel disclosure-panel"><summary>Read the complete cartridge</summary><div class="disclosure-content"><p>This is the complete story file served by the versioned link and download. Formatting is visible; there are no hidden instructions.</p><pre tabindex="0"><code data-cartridge-source>${escapeHtml(source)}</code></pre></div></details>
    <section class="related-panel" aria-labelledby="related-title"><p class="eyebrow">Explainable suggestions</p><h2 id="related-title">Try a different shape next</h2><div class="related-grid">${related.map(({ entry: relatedEntry, reasonIds, differentMechanic }) => {
      const reasons = reasonIds.map((id) => catalogue.taxonomy.find((value) => value.id === id)?.label).filter(Boolean);
      const reason = `${reasons.slice(0, 1).join("") || "Similar fit"}${differentMechanic ? ", different mechanic" : ""}`;
      return `<article><h3><a href="../${relatedEntry.slug}/">${escapeHtml(relatedEntry.title)}</a></h3><p>${escapeHtml(reason)}.</p></article>`;
    }).join("")}</div></section>
  </article>
  ${privacyNotice(2)}
</main><footer><p><a href="../../">Return to all stories</a></p></footer>`,
  });
};

const renderVersion = ({ entry, release, releaseState, metadata, catalogue }) => renderDocument({
  title: `${entry.title} ${release.version} — Version history`, depth: 4,
  body: `<header class="site-header"><a class="wordmark" href="../../../../">The Guide <span>Interactive stories</span></a></header>
<main id="main" tabindex="-1"><nav aria-label="Breadcrumb"><a href="../../../../">All stories</a> <span aria-hidden="true">/</span> <a href="../../">${escapeHtml(entry.title)}</a> <span aria-hidden="true">/</span> ${release.version}</nav>
  <section class="hero"><p class="eyebrow">Immutable release record</p><h1>${escapeHtml(entry.title)} ${release.version}</h1><p class="lede">Published cartridge bytes are bound to the paths and digest below.</p></section>
  <section class="trust-panel"><h2>Release facts</h2><dl class="fact-grid"><div><dt>Elixir ID</dt><dd>${release.elixirId}</dd></div><div><dt>Publisher</dt><dd>${metadata.publisher.name}</dd></div><div><dt>Published</dt><dd>${release.publishedAt}</dd></div><div><dt>Lifecycle</dt><dd>${releaseState.lifecycle}</dd></div><div><dt>Maintenance</dt><dd>${escapeHtml(entry.maintenanceOwner)}</dd></div><div><dt>Bytes</dt><dd>${release.bytes}</dd></div><div><dt>SHA-256</dt><dd>${release.sha256}</dd></div><div><dt>Covenant</dt><dd>${release.covenantVersion}</dd></div><div><dt>Review</dt><dd>${entry.review.state} ${entry.review.date}</dd></div><div><dt>Review evidence</dt><dd>${renderEvidenceLinks({ release, kind: "review", references: release.reviewReferences, prefix: "../../../../" })}</dd></div><div><dt>Compatibility</dt><dd>${metadata.compatibility.status}: ${metadata.compatibility.testedHarnessClasses.map(formatToken).join(", ") || "no tested class"}</dd></div><div><dt>Compatibility evidence</dt><dd>${renderEvidenceLinks({ release, kind: "compatibility", references: release.compatibilityReferences, prefix: "../../../../" })}</dd></div><div><dt>Artwork provenance</dt><dd><a href="../../../../assets/cartridges/manifest.json">${escapeHtml(release.artwork.map(({ provenanceId }) => provenanceId).join(", "))}</a></dd></div><div><dt>Rights record</dt><dd><a href="../../../../terms.md">Alpha usage terms</a></dd></div><div><dt>Source revision</dt><dd>${release.sourceRevision}</dd></div></dl>
  <p><strong>Canonical path:</strong> <a href="../../../../${release.canonicalPath}">${release.canonicalPath}</a></p>${release.legacyPaths.map((path) => `<p><strong>Permanent legacy path:</strong> <a href="../../../../${path}">${path}</a></p>`).join("")}</section>
  ${renderLifecycleNotice({ entry, state: releaseState, catalogue, hrefPrefix: "../../../../elixirs/", versionRoute: true })}
  ${privacyNotice(4)}
</main><footer><p><a href="../../">Return to ${escapeHtml(entry.title)}</a></p></footer>`,
});

export const buildElixirSite = ({
  outputDirectory = resolve(repositoryRoot, "dist/elixirs-pages"),
  sourceRevision = process.env.ELIXIR_SOURCE_REVISION ?? execFileSync("git", ["rev-parse", "HEAD"], { cwd: repositoryRoot, encoding: "utf8" }).trim(),
  sourceRoot = repositoryRoot,
  catalogue = loadCatalogue({ repositoryRoot: sourceRoot }),
} = {}) => {
  validateSourceRevision(sourceRevision);
  const activeDownloadMetadata = catalogue.entries
    .filter(({ lifecycle }) => lifecycle !== "withdrawn")
    .map((entry) => {
      const release = catalogue.releases.find(({ elixirId, version }) => elixirId === entry.elixirId && version === entry.recommendedVersion);
      const cartridge = catalogue.cartridges.find(({ release: candidate }) => releaseKey(candidate) === releaseKey(release));
      return cartridge.metadata;
    });
  validateUniqueCartridgeDownloadNames(activeDownloadMetadata);
  rmSync(outputDirectory, { recursive: true, force: true });
  mkdirSync(outputDirectory, { recursive: true });

  const write = (path, contents) => {
    const destination = resolveInside(outputDirectory, path, "Artifact output");
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, contents);
  };
  const copy = (sourcePath, destinationPath) => {
    const source = resolveInside(sourceRoot, sourcePath, "Artifact source");
    let sourceComponent = resolve(sourceRoot);
    for (const segment of relative(resolve(sourceRoot), source).split(process.platform === "win32" ? "\\" : "/")) {
      sourceComponent = resolve(sourceComponent, segment);
      if (lstatSync(sourceComponent).isSymbolicLink()) throw new Error(`Artifact source path contains a symbolic link: ${sourcePath}`);
    }
    const sourceStat = lstatSync(source);
    if (sourceStat.isSymbolicLink() || !sourceStat.isFile()) throw new Error(`Artifact source must be a regular file: ${sourcePath}`);
    const realSourceRoot = realpathSync(sourceRoot);
    const realSource = realpathSync(source);
    const fromRealRoot = relative(realSourceRoot, realSource);
    if (fromRealRoot === ".." || fromRealRoot.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`) || isAbsolute(fromRealRoot)) throw new Error(`Artifact source resolves outside its approved root: ${sourcePath}`);
    const destination = resolveInside(outputDirectory, destinationPath, "Artifact output");
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(source, destination);
  };

  const publicIndex = createPublicCatalogueIndex(catalogue);
  const releaseByKey = new Map(catalogue.releases.map((release) => [releaseKey(release), release]));
  const cartridgeByKey = new Map(catalogue.cartridges.map((cartridge) => [releaseKey(cartridge.release), cartridge]));
  const withdrawalByKey = new Map(catalogue.withdrawals.map((withdrawal) => [releaseKey(withdrawal), withdrawal]));

  write(".nojekyll", "");
  copy("TERMS.md", "terms.md");
  write("index.html", renderIndex(catalogue));
  const publicEntryCount = catalogue.entries.filter(({ lifecycle }) => lifecycle !== "withdrawn").length;
  const cataloguePages = Math.ceil(publicEntryCount / cataloguePageSize);
  write("browse/index.html", renderBrowsePage({ catalogue, page: 1, pages: cataloguePages }));
  for (let page = 2; page <= cataloguePages; page += 1) write(`browse/page-${page}/index.html`, renderBrowsePage({ catalogue, page, pages: cataloguePages }));
  write("catalogue-index.json", `${JSON.stringify(publicIndex, null, 2)}\n`);
  copy("site/elixirs/styles.css", "styles.css");
  copy("site/elixirs/catalogue.js", "catalogue.js");
  write("delivery-events.js", renderDeliveryEventBrowserRuntime({
    validReferences: catalogue.entries.filter(({ lifecycle }) => lifecycle !== "withdrawn").map(({ elixirId: id, recommendedVersion: version }) => ({ id, version })),
    deploymentRevision: deliveryDeploymentRevision,
  }));
  write(`skills/${agentElixirArchiveName}`, createAgentElixirArchive({ repositoryRoot }));
  copy("site/elixirs/cabinet.js", "cabinet.js");
  copy("site/elixirs/assets/cartridges/manifest.json", "assets/cartridges/manifest.json");
  for (const asset of catalogue.artworkManifest.assets) copy(`site/elixirs/${asset.path}`, asset.path);
  for (const release of catalogue.releases) {
    release.reviewReferences.forEach((reference, index) => copy(reference, evidenceArtifactPath({ release, kind: "review", index })));
    release.compatibilityReferences.forEach((reference, index) => copy(reference, evidenceArtifactPath({ release, kind: "compatibility", index })));
  }

  for (const collection of catalogue.collections) write(`collections/${collection.id}/index.html`, renderCollection({ collection, catalogue }));

  for (const release of catalogue.releases) {
    const cartridge = cartridgeByKey.get(releaseKey(release));
    const withdrawal = withdrawalByKey.get(releaseKey(release));
    const bytes = withdrawal ? renderWithdrawalTombstone({ withdrawal, release }) : cartridge.source;
    write(release.canonicalPath, bytes);
    for (const path of release.legacyPaths) write(path, bytes);
    const entry = catalogue.entries.find(({ elixirId }) => elixirId === release.elixirId);
    const releaseState = entry.releaseStates.find(({ version }) => version === release.version);
    write(`elixirs/${release.slug}/versions/${release.version}/index.html`, renderVersion({ entry, release, releaseState, metadata: cartridge.metadata, catalogue }));
  }

  for (const entry of catalogue.entries.filter(({ lifecycle }) => lifecycle !== "withdrawn")) {
    const release = releaseByKey.get(`${entry.elixirId}@${entry.recommendedVersion}`);
    const cartridge = cartridgeByKey.get(releaseKey(release));
    write(`elixirs/${entry.slug}/index.html`, renderDetail({ entry, release, ...cartridge, catalogue, index: publicIndex }));
  }

  return { outputDirectory, cartridges: catalogue.cartridges, catalogue, publicIndex };
};

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { outputDirectory } = buildElixirSite();
  process.stdout.write(`Built static Elixir catalogue at ${outputDirectory}\n`);
}
