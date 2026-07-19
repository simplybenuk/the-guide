import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import {
  agentElixirArchiveName,
  agentElixirSkillFiles,
  createAgentElixirArchive,
  createDeterministicZip,
} from "./skill-archive.mjs";

const repositoryRoot = process.cwd();

describe("Agent Elixir skill archive", () => {
  it("packages only the reviewed generic skill files deterministically", () => {
    const first = createAgentElixirArchive({ repositoryRoot });
    const second = createAgentElixirArchive({ repositoryRoot });
    expect(agentElixirArchiveName).toBe("agent-elixir-0.1.0.zip");
    expect(agentElixirSkillFiles).toEqual([
      "agent-elixir/SKILL.md",
      "agent-elixir/agents/openai.yaml",
    ]);
    expect(first.equals(second)).toBe(true);
    expect(createHash("sha256").update(first).digest("hex")).toBe(createHash("sha256").update(second).digest("hex"));
    for (const path of agentElixirSkillFiles) expect(first.includes(readFileSync(resolve(repositoryRoot, "skills", path)))).toBe(true);
    expect(first.toString("utf8")).not.toMatch(/# The (?:Signal|Mystery|Story|Regency Ball)|https?:\/\/|\.(?:png|js|mjs)\b/);
  });

  it("rejects unsafe and duplicate archive paths", () => {
    expect(() => createDeterministicZip([{ name: "../SKILL.md", contents: "x" }])).toThrow(/Unsafe/);
    expect(() => createDeterministicZip([{ name: "agent-elixir/SKILL.md", contents: "x" }, { name: "agent-elixir/SKILL.md", contents: "y" }])).toThrow(/Duplicate/);
  });
});
