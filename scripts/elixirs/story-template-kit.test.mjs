import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { validateCartridgeDocument } from "./cartridge.mjs";

const root = process.cwd();
const templateDirectory = resolve(root, "templates/story-elixir");
const read = (name) => readFileSync(resolve(templateDirectory, name), "utf8");
const covenant = readFileSync(resolve(root, "content/elixirs/covenant.md"), "utf8").trim();
const storySpecification = readFileSync(resolve(root, "docs/specs/story-elixir-authoring-and-chat-presentation.md"), "utf8");
const templateFiles = [
  "01-story-design-brief.md",
  "02-cartridge.md",
  "03-evaluation-fixtures.json.tmpl",
  "04-catalogue-candidate.json.tmpl",
  "05-release-candidate.json.tmpl",
  "06-artwork-provenance.md",
  "07-publication-validation.md",
];
const replaceSection = (source, heading, nextHeading, body) => nextHeading
  ? source.replace(
    new RegExp(`${heading}\\n[\\s\\S]*?\\n${nextHeading}`),
    `${heading}\n\n${body}\n\n${nextHeading}`,
  )
  : source.replace(new RegExp(`${heading}\\n[\\s\\S]*$`), `${heading}\n\n${body}\n`);

describe("authored Story template kit", () => {
  it("contains the complete documented per-story artifact set", () => {
    expect(readdirSync(templateDirectory).sort()).toEqual(["README.md", ...templateFiles].sort());
    const guide = read("README.md");
    for (const file of templateFiles) expect(guide).toContain(`\`${file}\``);
    for (const destination of [
      "content/elixirs/{{SLUG}}.md",
      "scripts/elixirs/story-evaluation-fixtures/{{SLUG}}.json",
      "content/catalogue/candidates/{{SLUG}}-entry.json",
      "content/catalogue/candidates/{{SLUG}}-release.json",
      "content/catalogue/provenance/{{SLUG}}-artwork.md",
      "docs/evaluations/{{SLUG}}-publication-validation.md",
    ]) expect(guide).toContain(destination);
  });

  it("uses only explicit upper-snake-case replacement tokens", () => {
    for (const file of templateFiles) {
      const source = read(file);
      const tokens = [...source.matchAll(/\{\{([^}]+)\}\}/g)].map((match) => match[1]);
      expect(tokens.length, `${file} should contain replacement tokens`).toBeGreaterThan(0);
      expect(tokens.every((token) => /^[A-Z][A-Z0-9_]*$/.test(token)), `${file} has an invalid token`).toBe(true);
    }
  });

  it("materializes each JSON template after typed tokens are replaced", () => {
    const numericTokens = new Set([
      "ARTWORK_BYTES", "ARTWORK_HEIGHT", "ARTWORK_WIDTH", "CARTRIDGE_BYTES",
      "EDITORIAL_ORDER", "ENDING_COUNT",
    ]);
    const jsonFragments = new Map([
      ["INTERACTION_MODE_JSON_ITEMS", '"speech"'],
      ["INTERACTION_MODE_ID_JSON_ITEMS", '"interaction-speech"'],
      ["INTERACTION_EQUIVALENCE_JSON_OBJECTS", '{"id":"spoken","mode":"speech"}'],
      ["INTERACTION_CASE_JSON_OBJECTS", '{"id":"spoken","mode":"speech"}'],
    ]);
    for (const file of templateFiles.filter((name) => name.endsWith(".json.tmpl"))) {
      const materialized = read(file).replace(/\{\{([^}]+)\}\}/g, (_match, token) =>
        numericTokens.has(token) ? "1"
          : jsonFragments.get(token) ?? `value-${token.toLowerCase().replaceAll("_", "-")}`);
      expect(() => JSON.parse(materialized), `${file} should materialize as JSON`).not.toThrow();
    }
  });

  it("preserves the strict cartridge section and presentation contract", () => {
    const cartridge = read("02-cartridge.md");
    const sections = [
      "Story identity and dramatic contract",
      "Player role and cast",
      "Interaction and chat presentation contract",
      "World truths and information schedule",
      "State ledger",
      "Beat map",
      "Branch and reconvergence rules",
      "Climax and ending families",
      "Recap and state repair",
      "Memento and release",
      "Performance direction",
      "Evaluation cases",
    ];
    const positions = sections.map((section) => cartridge.indexOf(`## ${section}`));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((left, right) => left - right));
    expect(cartridge.match(/```elixir-metadata/g)).toHaveLength(1);
    expect(cartridge.match(/```story-score/g)).toHaveLength(1);
    expect(cartridge.match(/\{\{EMBED_CURRENT_CONTENT_ELIXIRS_COVENANT_MD_EXACTLY_ONCE_HERE\}\}/g)).toHaveLength(1);
    for (const label of [
      "### Interaction moment:",
      "### State field:",
      "### Beat:",
      "### Ending family:",
      "### Evaluation case:",
      "**Narrator**",
      "**Your turn**",
      "**Possible approaches**",
    ]) expect(cartridge).toContain(label);
    expect(cartridge).toContain("at least 3 ordered beats, 2 routes");
    expect(cartridge).toContain("2 crisis variants, and 3 ending families");
    expect(cartridge).toMatch(/^> “\{\{SHORT_CHARACTER_LINE_OR_QUESTION\}\}”$/m);
    expect(cartridge).toContain("Every paragraph of character speech must use Markdown");
    expect(cartridge).toContain('"evaluationCaseIds": ["speech-blockquote"');
    expect(cartridge).toContain("### Evaluation case: speech-blockquote");
    expect(read("03-evaluation-fixtures.json.tmpl")).toContain('"id": "speech-blockquote"');
    expect(cartridge).toContain("lifecycle notices, and state repair remain outside");
    expect(read("03-evaluation-fixtures.json.tmpl")).toContain("quotation marks beneath its standalone speaker label");
    expect(storySpecification.match(/^ {3}> “/gm)).toHaveLength(2);
    expect(storySpecification).not.toMatch(/^ {3}“(?:Tell me plainly|If I asked you)/m);
  });

  it("materializes into a representative cartridge accepted by the real validator", () => {
    const metadata = {
      schemaVersion: "1.1.0",
      id: "the-guide.elixir.template-proof",
      slug: "template-proof",
      title: "The Template Proof",
      summary: "A bounded authored proof where two routes change one final decision.",
      playerPromise: "Speak, act, and decide which truth survives the final meeting.",
      publisher: { name: "The Guide" },
      version: "0.1.0",
      status: "experimental",
      estimatedMinutes: { min: 20, max: 30 },
      energy: "medium",
      movement: "none",
      requiredInputs: ["time", "hard_boundary", "free_text_choice"],
      gameplayCapability: "conversation_only",
      dataBehavior: {
        guideReceives: "none",
        providerProcessing: "user_chosen_harness",
        memory: "current_session_only",
        mementoStorage: "user_chosen_harness",
      },
      compatibility: { status: "untested", testedHarnessClasses: [] },
      covenantVersion: "1.0.0",
      artwork: {
        path: "assets/cartridges/template-proof.png",
        width: 1200,
        height: 900,
        altText: "Two luminous paths meet beside a sealed letter in an empty fictional room.",
        provenanceId: "art-template-proof",
      },
      story: {
        storyFormat: "feature",
        playerRole: "An adult fictional guest deciding how to handle one contested letter.",
        interactionModes: ["speech", "action", "decision"],
        choicePresentation: "hybrid",
        emotionalIntensity: "moderate",
        readingIntensity: "medium",
        beatProfile: { count: 3, acceptedTurns: { min: 3, max: 6 } },
        endingProfile: { familyCount: 3, description: "Three endings shaped by route evidence and the final decision." },
        replayProfile: { level: "high", promise: "Two routes reveal different evidence and later affordances." },
        sessionShape: "single_session",
        contentNotes: ["content-fiction-clear", "content-social-pressure"],
      },
    };
    const score = {
      schemaVersion: 1,
      beats: [
        { id: "opening", type: "required", purpose: "establish the letter and invite a stance", requiredFacts: ["sealed-letter"], acceptedModes: ["speech", "action", "decision"], intents: ["inspect", "wait"], reads: [], writes: ["current-beat"], next: ["route-scene"], interactionFocus: 1 },
        { id: "route-scene", type: "branch", purpose: "choose one witness and receive route evidence", requiredFacts: ["exclusive-witness"], acceptedModes: ["speech", "action", "decision"], intents: ["choose-first", "choose-second"], reads: ["current-beat"], writes: ["route-gift", "current-beat"], next: ["climax"], interactionFocus: 1 },
        { id: "climax", type: "climax", purpose: "use the earned evidence in one final decision", requiredFacts: ["earned-cost"], acceptedModes: ["speech", "action", "decision"], intents: ["reveal", "protect", "leave"], reads: ["current-beat", "route-gift"], writes: ["current-beat"], next: [], interactionFocus: 1 },
      ],
      stateFields: [
        { id: "current-beat", fallback: "Recover the last clearly completed event." },
        { id: "route-gift", fallback: "Recover the evidence from the selected witness." },
      ],
      routes: [
        { id: "first-witness", gift: "gift-one", exclusiveBeat: "route-scene", laterReadBeat: "climax", laterAffordance: "The first witness can verify the date." },
        { id: "second-witness", gift: "gift-two", exclusiveBeat: "route-scene", laterReadBeat: "climax", laterAffordance: "The second witness can verify the signature." },
      ],
      crisisVariants: [
        { id: "private", beat: "climax", allowedTruthHandling: ["protect"], allowedFinalCommitments: ["protect", "leave"] },
        { id: "public", beat: "climax", allowedTruthHandling: ["reveal"], allowedFinalCommitments: ["reveal", "leave"] },
      ],
      endings: [
        { id: "first-truth", priority: 1, requiredStateFields: ["current-beat", "route-gift"], callbackFields: ["current-beat", "route-gift"], eligibility: [{ field: "route-gift", values: ["gift-one"] }], cost: "The first account becomes public while the second remains unresolved.", closure: "The date is verified and the letter receives a bounded public meaning.", fallback: false },
        { id: "second-truth", priority: 2, requiredStateFields: ["current-beat", "route-gift"], callbackFields: ["current-beat", "route-gift"], eligibility: [{ field: "route-gift", values: ["gift-two"] }], cost: "The signature is settled while the date remains disputed.", closure: "The signature is verified and the witnesses retain separate motives.", fallback: false },
        { id: "open-question", priority: 3, requiredStateFields: ["current-beat", "route-gift"], callbackFields: ["current-beat", "route-gift"], eligibility: [], cost: "The letter remains unresolved tonight.", closure: "The player leaves without an invented answer or forced companion.", fallback: true },
      ],
      evaluationCaseIds: ["speech-blockquote", "input-equivalence"],
    };
    let source = read("02-cartridge.md")
      .replace(/^```elixir-metadata\n[\s\S]*?\n```$/m, `\`\`\`elixir-metadata\n${JSON.stringify(metadata, null, 2)}\n\`\`\``)
      .replace("{{EMBED_CURRENT_CONTENT_ELIXIRS_COVENANT_MD_EXACTLY_ONCE_HERE}}", covenant)
      .replace(/^```story-score\n[\s\S]*?\n```$/m, `\`\`\`story-score\n${JSON.stringify(score, null, 2)}\n\`\`\``);
    source = replaceSection(source, "## State ledger", "## Beat map", `### State field: current-beat\n\nWrite: opening, route-scene, climax.\n\nRead: route-scene, climax.\n\n### State field: route-gift\n\nWrite: route-scene.\n\nRead: climax.`);
    source = replaceSection(source, "## Beat map", "## Branch and reconvergence rules", `### Beat: opening\n\nType: required\nPurpose: establish the letter and invite a stance\nRequired facts: sealed-letter\nExit: route-scene.\n\n### Beat: route-scene\n\nType: branch\nPurpose: choose one witness and receive route evidence\nRequired facts: exclusive-witness\nExit: climax.\n\n### Beat: climax\n\nType: climax\nPurpose: use the earned evidence in one final decision\nRequired facts: earned-cost\nExit: end.`);
    source = replaceSection(source, "## Climax and ending families", "## Recap and state repair", `### Ending family: first-truth\n\nEligibility: route-gift=gift-one.\nCost: The first account becomes public while the second remains unresolved.\nRequired callbacks: current-beat, route-gift.\nClosure: The date is verified and the letter receives a bounded public meaning.\n\n### Ending family: second-truth\n\nEligibility: route-gift=gift-two.\nCost: The signature is settled while the date remains disputed.\nRequired callbacks: current-beat, route-gift.\nClosure: The signature is verified and the witnesses retain separate motives.\n\n### Ending family: open-question\n\nEligibility: fallback=true.\nCost: The letter remains unresolved tonight.\nRequired callbacks: current-beat, route-gift.\nClosure: The player leaves without an invented answer or forced companion.`);
    source = replaceSection(source, "## Evaluation cases", null, `### Evaluation case: speech-blockquote\n\nPass when every character-spoken paragraph begins with Markdown > block-quote syntax, remains in quotation marks beneath a standalone speaker label, and narration, player prompts, lifecycle notices, and state repair remain outside the block quote.\n\n### Evaluation case: input-equivalence\n\nPass when speech, action, and decision forms map to the same authored intent.`);
    expect(validateCartridgeDocument(source, covenant)).toMatchObject({
      id: "the-guide.elixir.template-proof",
      story: { beatProfile: { count: 3 }, endingProfile: { familyCount: 3 } },
    });
  });

  it("keeps the kit generic and fail-closed around publication", () => {
    const combined = templateFiles.map(read).join("\n");
    expect(combined).not.toMatch(/Regency Ball|Adrian|Celia|Rowan|final waltz/i);
    expect(read("05-release-candidate.json.tmpl")).toContain('"state": "prepared_not_publishable"');
    expect(read("05-release-candidate.json.tmpl")).toContain('"supersession": null');
    expect(read("05-release-candidate.json.tmpl")).not.toContain('"sourceRevision"');
    expect(read("07-publication-validation.md")).toContain("Publication does not promote compatibility");
    expect(read("02-cartridge.md")).toContain('"testedHarnessClasses": []');
    expect(read("02-cartridge.md").match(/\{\{INTERACTION_MODE_JSON_ITEMS\}\}/g)).toHaveLength(2);
    expect(read("04-catalogue-candidate.json.tmpl")).toContain("{{INTERACTION_MODE_ID_JSON_ITEMS}}");
    expect(read("03-evaluation-fixtures.json.tmpl")).toContain("{{INTERACTION_EQUIVALENCE_JSON_OBJECTS}}");
  });
});
