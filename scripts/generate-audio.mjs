import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const sampleRate = 22050;
const outputRoot = resolve(process.cwd(), "public/assets/pixel");

function renderToneSequence(segments) {
  const sampleCount = segments.reduce(
    (sum, segment) => sum + Math.ceil(segment.duration * sampleRate),
    0,
  );
  const pcm = Buffer.alloc(sampleCount * 2);
  let offset = 0;
  for (const segment of segments) {
    const segmentSamples = Math.ceil(segment.duration * sampleRate);
    for (let index = 0; index < segmentSamples; index += 1) {
      const progress = index / segmentSamples;
      const envelope = Math.sin(Math.PI * Math.min(progress * 4, 1)) * (1 - progress);
      const harmonic = Math.sin(2 * Math.PI * segment.frequency * index / sampleRate);
      const overtone = Math.sin(2 * Math.PI * segment.frequency * 2 * index / sampleRate) * 0.18;
      const value = Math.max(-1, Math.min(1, (harmonic + overtone) * envelope * 0.22));
      pcm.writeInt16LE(Math.round(value * 32767), offset * 2);
      offset += 1;
    }
  }
  return pcm;
}

function wavBuffer(pcm) {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVEfmt ", 8);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

const effects = {
  "pickup.wav": [
    { frequency: 660, duration: 0.08 },
    { frequency: 990, duration: 0.12 },
  ],
  "elixir.wav": [
    { frequency: 440, duration: 0.1 },
    { frequency: 660, duration: 0.1 },
    { frequency: 880, duration: 0.16 },
  ],
  "departure.wav": [
    { frequency: 220, duration: 0.14 },
    { frequency: 440, duration: 0.14 },
    { frequency: 880, duration: 0.2 },
  ],
};

mkdirSync(outputRoot, { recursive: true });
for (const [filename, segments] of Object.entries(effects)) {
  const output = resolve(outputRoot, filename);
  if (dirname(output) !== outputRoot) throw new Error("Audio output escaped its asset directory.");
  writeFileSync(output, wavBuffer(renderToneSequence(segments)));
}
