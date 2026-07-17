import { describe, expect, it } from "vitest";

import {
  ARCHIVE_KEY,
  clearArchive,
  deleteExpedition,
  latestReturnDetail,
  loadArchive,
  newArchive,
  saveArchive,
  saveExpedition,
  type StorageLike,
} from "./archive";
import { orchestrateTurn } from "./engine";
import { activeExpedition, INSTALLATION_ID } from "./test-helpers";

function memoryStorage(): StorageLike {
  const values = new Map<string, string>();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

function completedExpedition() {
  let state = activeExpedition();
  for (const text of ["a green leaf", "a repaired wooden edge", "Quiet Map"]) {
    state = orchestrateTurn({ state, kind: "done", text }, "2026-07-17T00:01:00.000Z");
  }
  return state;
}

describe("local archive", () => {
  it("round-trips a versioned archive", () => {
    const storage = memoryStorage();
    const archive = newArchive(INSTALLATION_ID);
    saveArchive(storage, archive);
    expect(storage.getItem(ARCHIVE_KEY)).toContain(INSTALLATION_ID);
    expect(loadArchive(storage)).toEqual(archive);
  });

  it("refuses an expedition from another installation", () => {
    const archive = newArchive("22222222-2222-4222-8222-222222222222");
    expect(() => saveExpedition(archive, activeExpedition())).toThrow(/does not belong/i);
  });

  it("restores active state and archives completed state", () => {
    let archive = saveExpedition(newArchive(INSTALLATION_ID), activeExpedition());
    expect(archive.activeExpedition?.status).toBe("active");
    archive = saveExpedition(archive, completedExpedition());
    expect(archive.activeExpedition).toBeUndefined();
    expect(archive.expeditions).toHaveLength(1);
    expect(latestReturnDetail(archive)).toBe("a green leaf");
  });

  it("deletes a completed expedition and its return detail", () => {
    const stored = saveExpedition(newArchive(INSTALLATION_ID), completedExpedition());
    const deleted = deleteExpedition(stored, "expedition-1");
    expect(deleted.expeditions).toHaveLength(0);
    expect(latestReturnDetail(deleted)).toBeUndefined();
  });

  it("clears all local data", () => {
    const storage = memoryStorage();
    saveArchive(storage, newArchive(INSTALLATION_ID));
    clearArchive(storage);
    expect(storage.getItem(ARCHIVE_KEY)).toBeNull();
  });

  it("fails closed when saved data is corrupt", () => {
    const storage = memoryStorage();
    storage.setItem(ARCHIVE_KEY, "not-json");
    expect(() => loadArchive(storage)).toThrow(/could not be restored safely/i);
  });
});
