type PixelAssetKind =
  | "room"
  | "buddy"
  | "buddy-transformed"
  | "elixir"
  | "portal-dormant"
  | "portal-active"
  | "astrolabe"
  | "cabinet"
  | "ui";

type PixelAssetProps = {
  kind: PixelAssetKind;
  className?: string;
};

export function PixelAsset({ kind, className = "" }: PixelAssetProps) {
  const classes = ["pixel-asset", `pixel-asset--${kind}`, className].filter(Boolean).join(" ");

  return <span className={classes} aria-hidden="true" />;
}
