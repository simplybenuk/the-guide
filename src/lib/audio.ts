export const SOUND_PREFERENCE_KEY = "the-guide:sound-enabled:v1";

export type SoundEffect = "pickup" | "elixir" | "departure";
type StorageReader = Pick<Storage, "getItem">;
type StorageWriter = Pick<Storage, "setItem">;
type StorageRemover = Pick<Storage, "removeItem">;

export const SOUND_PREFERENCE_EVENT = "the-guide:sound-preference-changed";

const sources: Record<SoundEffect, string> = {
  pickup: "/assets/pixel/pickup.wav",
  elixir: "/assets/pixel/elixir.wav",
  departure: "/assets/pixel/departure.wav",
};

export function loadSoundPreference(storage?: StorageReader): boolean {
  const target = storage ?? (typeof window === "undefined" ? undefined : window.localStorage);
  return target?.getItem(SOUND_PREFERENCE_KEY) === "true";
}

export function saveSoundPreference(enabled: boolean, storage?: StorageWriter): void {
  const target = storage ?? (typeof window === "undefined" ? undefined : window.localStorage);
  target?.setItem(SOUND_PREFERENCE_KEY, String(enabled));
}

export function clearSoundPreference(storage?: StorageRemover): void {
  const target = storage ?? (typeof window === "undefined" ? undefined : window.localStorage);
  target?.removeItem(SOUND_PREFERENCE_KEY);
  if (!storage && typeof window !== "undefined") window.dispatchEvent(new Event(SOUND_PREFERENCE_EVENT));
}

export async function playSound(effect: SoundEffect): Promise<void> {
  if (typeof window === "undefined" || !loadSoundPreference()) return;
  try {
    const audio = new Audio(sources[effect]);
    audio.volume = 0.35;
    await audio.play();
  } catch {
    // Atmosphere is optional; blocked or unavailable audio never interrupts play.
  }
}
