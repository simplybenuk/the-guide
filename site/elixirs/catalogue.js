(() => {
  "use strict";

  for (const shelf of document.querySelectorAll("[data-shelf]")) {
    const track = shelf.querySelector("[data-shelf-track]");
    const previous = shelf.querySelector("[data-shelf-previous]");
    const next = shelf.querySelector("[data-shelf-next]");
    if (!track || !previous || !next) continue;
    previous.hidden = false;
    next.hidden = false;
    const updateControls = () => {
      const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
      const hasOverflow = maximum > 1;
      previous.hidden = !hasOverflow;
      next.hidden = !hasOverflow;
      previous.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= maximum - 1;
    };
    const move = (direction) => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.8, 240), behavior: reducedMotion ? "auto" : "smooth" });
    };
    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);
    updateControls();
  }

  const pageSize = 24;
  const root = document.querySelector("[data-catalogue]");
  const source = document.querySelector("#catalogue-data");
  if (!root || !source) return;

  let index;
  try {
    index = JSON.parse(source.textContent);
  } catch {
    return;
  }
  if (index.schemaVersion !== "1.0.0" || !Array.isArray(index.entries)) return;

  const cards = new Map(
    [...root.querySelectorAll("[data-catalogue-entry]")].map((card) => [card.dataset.elixirId, card]),
  );
  const search = root.querySelector("[data-catalogue-search]");
  const sort = root.querySelector("[data-catalogue-sort]");
  const status = root.querySelector("[data-catalogue-status]");
  const empty = root.querySelector("[data-catalogue-empty]");
  const grid = root.querySelector("[data-catalogue-grid]");
  const filters = [...root.querySelectorAll("[data-filter-id]")];
  const clear = root.querySelector("[data-clear-filters]");
  const showMore = root.querySelector("[data-show-more]");
  const staticPagination = root.querySelector("[data-static-pagination]");
  const rootPrefix = root.dataset.rootPrefix ?? "./";
  const allowedFilters = new Set(filters.map((control) => control.dataset.filterId));
  let visibleLimit = pageSize;

  const formatToken = (value) => value.replaceAll("_", " ");
  const element = (tag, { className, text } = {}) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const createCard = (entry) => {
    const card = element("article", { className: `elixir-card compact-card elixir-${entry.slug}` });
    card.dataset.catalogueEntry = "";
    card.dataset.elixirId = entry.elixirId;
    card.dataset.taxonomyIds = entry.taxonomyIds.join(" ");
    const artwork = element("img");
    artwork.src = `${rootPrefix}${entry.artwork.path}`;
    artwork.width = entry.artwork.width;
    artwork.height = entry.artwork.height;
    artwork.alt = entry.artwork.altText;
    artwork.loading = "lazy";
    const body = element("div", { className: "card-body" });
    const mechanic = entry.labels[entry.taxonomyIds.indexOf(entry.mechanicId)] ?? formatToken(entry.mechanicId.replace(/^mechanic-/, ""));
    body.append(
      element("p", { className: "eyebrow", text: mechanic }),
      element("h3", { text: entry.title }),
      element("p", { className: "card-promise", text: entry.playerPromise }),
    );
    const signals = element("ul", { className: "fit-signals" });
    signals.setAttribute("aria-label", "Elixir fit");
    signals.append(
      element("li", { text: `${entry.duration.min}–${entry.duration.max} min` }),
      element("li", { text: `${formatToken(entry.energy)} energy` }),
      element("li", { text: mechanic }),
    );
    const cardStatus = element("p", { className: "card-status", text: `${entry.status} · ${entry.lifecycle}` });
    const link = element("a", { className: "primary-action", text: `Open ${entry.title}` });
    link.href = `${rootPrefix}elixirs/${entry.slug}/`;
    body.append(signals, cardStatus, link);
    card.append(artwork, body);
    cards.set(entry.elixirId, card);
    return card;
  };

  const normalize = (value) => value.toLocaleLowerCase("en").normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();
  const searchableEntries = index.entries.map((entry) => ({
    entry,
    title: normalize(entry.title),
    publisher: normalize(entry.publisher),
    prose: normalize(`${entry.summary} ${entry.playerPromise}`),
    terms: entry.searchTerms.map(normalize),
  }));
  const score = (record, normalized) => {
    if (!normalized) return 1;
    const tokens = normalized.split(" ");
    if (record.title === normalized) return 600;
    if (record.title.startsWith(normalized)) return 500;
    if (tokens.every((token) => record.title.split(" ").some((word) => word.startsWith(token)))) return 400;
    if (record.terms.some((term) => term.includes(normalized))) return 300;
    if (record.publisher.includes(normalized)) return 200;
    return tokens.every((token) => record.prose.includes(token)) ? 100 : 0;
  };

  const selectedByFacet = () => {
    const selected = {};
    for (const control of filters.filter(({ checked }) => checked)) {
      const facet = control.dataset.filterFacet;
      (selected[facet] ??= []).push(control.dataset.filterId);
    }
    return selected;
  };

  const updateUrl = () => {
    const url = new URL(window.location.href);
    url.search = "";
    for (const control of filters.filter(({ checked }) => checked)) url.searchParams.append("filter", control.dataset.filterId);
    history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const apply = ({ updateAddress = true, resetLimit = false } = {}) => {
    if (resetLimit) visibleLimit = pageSize;
    const selected = selectedByFacet();
    const query = search.value;
    const normalizedQuery = normalize(query);
    const results = searchableEntries
      .map((record) => ({ entry: record.entry, score: score(record, normalizedQuery) }))
      .filter(({ entry, score: rank }) => rank > 0 && Object.values(selected).every((values) => values.some((id) => entry.taxonomyIds.includes(id))));

    results.sort((left, right) => {
      if (query && right.score !== left.score) return right.score - left.score;
      if (sort.value === "title") return left.entry.title.localeCompare(right.entry.title);
      if (sort.value === "duration") return left.entry.duration.max - right.entry.duration.max || left.entry.title.localeCompare(right.entry.title);
      return left.entry.editorialOrder - right.entry.editorialOrder || left.entry.title.localeCompare(right.entry.title);
    });

    const displayed = results.slice(0, visibleLimit).map(({ entry }) => cards.get(entry.elixirId) ?? createCard(entry));
    grid.replaceChildren(...displayed);
    empty.hidden = results.length !== 0;
    const bounded = results.length > displayed.length ? `; first ${displayed.length} displayed` : "";
    status.textContent = `${results.length} Elixir${results.length === 1 ? "" : "s"} shown${bounded}.`;
    showMore.hidden = displayed.length >= results.length;
    if (staticPagination) staticPagination.hidden = Boolean(query || Object.keys(selected).length || sort.value !== "editorial");
    if (updateAddress) updateUrl();
  };

  for (const id of new URL(window.location.href).searchParams.getAll("filter")) {
    if (!allowedFilters.has(id)) continue;
    const control = filters.find((candidate) => candidate.dataset.filterId === id);
    if (control) control.checked = true;
  }

  search.addEventListener("input", () => apply({ resetLimit: true }));
  sort.addEventListener("change", () => apply({ resetLimit: true }));
  for (const control of filters) control.addEventListener("change", () => apply({ resetLimit: true }));
  showMore.addEventListener("click", () => {
    visibleLimit += pageSize;
    apply();
  });
  clear.addEventListener("click", () => {
    search.value = "";
    sort.value = "editorial";
    for (const control of filters) control.checked = false;
    apply({ resetLimit: true });
    search.focus();
  });

  apply({ updateAddress: false });
})();
