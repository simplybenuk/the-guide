import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const agentElixirSkillVersion = "0.1.0";
export const agentElixirArchiveName = `agent-elixir-${agentElixirSkillVersion}.zip`;
export const agentElixirSkillFiles = [
  "agent-elixir/SKILL.md",
  "agent-elixir/agents/openai.yaml",
];

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value;
  for (let bit = 0; bit < 8; bit += 1) crc = (crc & 1) ? (0xedb88320 ^ (crc >>> 1)) : (crc >>> 1);
  return crc >>> 0;
});

const crc32 = (buffer) => {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};

const localHeader = ({ name, contents }) => {
  const nameBytes = Buffer.from(name, "utf8");
  const header = Buffer.alloc(30);
  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0x0800, 6);
  header.writeUInt16LE(0, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(33, 12);
  header.writeUInt32LE(crc32(contents), 14);
  header.writeUInt32LE(contents.length, 18);
  header.writeUInt32LE(contents.length, 22);
  header.writeUInt16LE(nameBytes.length, 26);
  return Buffer.concat([header, nameBytes, contents]);
};

const centralHeader = ({ name, contents, offset }) => {
  const nameBytes = Buffer.from(name, "utf8");
  const header = Buffer.alloc(46);
  header.writeUInt32LE(0x02014b50, 0);
  header.writeUInt16LE(0x0314, 4);
  header.writeUInt16LE(20, 6);
  header.writeUInt16LE(0x0800, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(0, 12);
  header.writeUInt16LE(33, 14);
  header.writeUInt32LE(crc32(contents), 16);
  header.writeUInt32LE(contents.length, 20);
  header.writeUInt32LE(contents.length, 24);
  header.writeUInt16LE(nameBytes.length, 28);
  header.writeUInt32LE((0o100644 << 16) >>> 0, 38);
  header.writeUInt32LE(offset, 42);
  return Buffer.concat([header, nameBytes]);
};

export const createDeterministicZip = (entries) => {
  if (!Array.isArray(entries) || entries.length === 0) throw new Error("Skill archive requires at least one file");
  const normalized = entries.map(({ name, contents }) => {
    if (!/^[A-Za-z0-9][A-Za-z0-9./_-]*$/.test(name) || name.includes("..") || name.startsWith("/")) {
      throw new Error(`Unsafe skill archive path: ${name}`);
    }
    return { name, contents: Buffer.isBuffer(contents) ? contents : Buffer.from(contents, "utf8") };
  }).sort((left, right) => left.name.localeCompare(right.name));
  if (new Set(normalized.map(({ name }) => name)).size !== normalized.length) throw new Error("Duplicate skill archive path");

  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const entry of normalized) {
    const local = localHeader(entry);
    localParts.push(local);
    centralParts.push(centralHeader({ ...entry, offset }));
    offset += local.length;
  }
  const central = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(normalized.length, 8);
  end.writeUInt16LE(normalized.length, 10);
  end.writeUInt32LE(central.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...localParts, central, end]);
};

export const createAgentElixirArchive = ({ repositoryRoot }) => createDeterministicZip(
  agentElixirSkillFiles.map((archivePath) => {
    const contents = readFileSync(resolve(repositoryRoot, "skills", archivePath));
    const text = contents.toString("utf8");
    if (/https?:\/\/|^#!|# The (?:Signal|Mystery|Story|Regency Ball)|\bTODO\b/m.test(text)) {
      throw new Error(`Agent Elixir skill contains prohibited bundled or remote content: ${archivePath}`);
    }
    if (archivePath.endsWith("SKILL.md") && !/^---\nname: agent-elixir\ndescription: [^\n]+\n---\n/.test(text)) {
      throw new Error("Agent Elixir SKILL.md metadata is invalid");
    }
    return { name: archivePath, contents };
  }),
);
