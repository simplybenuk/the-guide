import { describe, expect, it } from "vitest";

import {
  clearSoundPreference,
  loadSoundPreference,
  saveSoundPreference,
  SOUND_PREFERENCE_KEY,
} from "./audio";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
}

describe("sound preference", () => {
  it("defaults to silent and persists only its own local preference", () => {
    const storage = memoryStorage();
    expect(loadSoundPreference(storage)).toBe(false);

    saveSoundPreference(true, storage);
    expect(storage.getItem(SOUND_PREFERENCE_KEY)).toBe("true");
    expect(loadSoundPreference(storage)).toBe(true);

    saveSoundPreference(false, storage);
    expect(loadSoundPreference(storage)).toBe(false);

    saveSoundPreference(true, storage);
    clearSoundPreference(storage);
    expect(storage.getItem(SOUND_PREFERENCE_KEY)).toBeNull();
    expect(loadSoundPreference(storage)).toBe(false);
  });
});
