"use client";

import { useEffect, useState, type ComponentPropsWithoutRef } from "react";

import { loadSoundPreference, saveSoundPreference, SOUND_PREFERENCE_EVENT } from "@/lib/audio";

type PixelGameShellProps = ComponentPropsWithoutRef<"main">;

export function PixelGameShell({ className = "", ...props }: PixelGameShellProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const classes = ["scene", "game-shell", className].filter(Boolean).join(" ");

  useEffect(() => {
    // Local storage is client-only; this effect is the intentional hydration boundary.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSoundEnabled(loadSoundPreference());
    const synchronizePreference = () => setSoundEnabled(loadSoundPreference());
    window.addEventListener(SOUND_PREFERENCE_EVENT, synchronizePreference);
    return () => window.removeEventListener(SOUND_PREFERENCE_EVENT, synchronizePreference);
  }, []);

  function toggleSound() {
    const next = !soundEnabled;
    saveSoundPreference(next);
    setSoundEnabled(next);
  }

  return (
    <main className={classes} {...props}>
      <button className="sound-toggle" type="button" aria-pressed={soundEnabled} onClick={toggleSound}>
        Sound {soundEnabled ? "on" : "off"}
      </button>
      {props.children}
    </main>
  );
}
