import type { ComponentPropsWithoutRef } from "react";

type PixelGameShellProps = ComponentPropsWithoutRef<"main">;

export function PixelGameShell({ className = "", ...props }: PixelGameShellProps) {
  const classes = ["scene", "game-shell", className].filter(Boolean).join(" ");

  return <main className={classes} {...props} />;
}
