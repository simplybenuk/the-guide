import { archiveSchema, type Archive, type Buddy, type Expedition } from "./schemas";
import { createUuid } from "./ids";

export const ARCHIVE_KEY = "the-guide:archive:v1";

export type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function newArchive(installationId = createUuid()): Archive {
  return archiveSchema.parse({
    version: 1,
    installationId,
    expeditions: [],
  });
}

export function loadArchive(storage: StorageLike): Archive {
  const raw = storage.getItem(ARCHIVE_KEY);
  if (!raw) return newArchive();
  try {
    return archiveSchema.parse(JSON.parse(raw));
  } catch {
    throw new Error("Your saved expedition data could not be restored safely.");
  }
}

export function saveArchive(storage: StorageLike, archive: Archive): Archive {
  const checked = archiveSchema.parse(archive);
  storage.setItem(ARCHIVE_KEY, JSON.stringify(checked));
  return checked;
}

export function saveBuddy(archive: Archive, buddy: Buddy): Archive {
  return archiveSchema.parse({ ...archive, buddy });
}

export function saveExpedition(archive: Archive, expedition: Expedition): Archive {
  if (expedition.installationId !== archive.installationId) {
    throw new Error("Expedition does not belong to this local installation.");
  }
  if (expedition.status === "active" || expedition.status === "paused") {
    return archiveSchema.parse({ ...archive, activeExpedition: expedition });
  }
  const expeditions = [
    expedition,
    ...archive.expeditions.filter((item) => item.id !== expedition.id),
  ].slice(0, 50);
  return archiveSchema.parse({ ...archive, activeExpedition: undefined, expeditions });
}

export function deleteExpedition(archive: Archive, expeditionId: string): Archive {
  return archiveSchema.parse({
    ...archive,
    activeExpedition:
      archive.activeExpedition?.id === expeditionId ? undefined : archive.activeExpedition,
    expeditions: archive.expeditions.filter((item) => item.id !== expeditionId),
  });
}

export function latestReturnDetail(archive: Archive): string | undefined {
  return archive.expeditions.find((item) => item.status === "complete")?.memento
    ?.groundedDetail;
}

export function clearArchive(storage: StorageLike): Archive {
  storage.removeItem(ARCHIVE_KEY);
  return newArchive();
}
