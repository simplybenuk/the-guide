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
  fallbackText?: string;
};

export function PixelAsset({ kind, className = "", fallbackText }: PixelAssetProps) {
  const classes = ["pixel-asset", `pixel-asset--${kind}`, className].filter(Boolean).join(" ");

  return (
    <span className={classes} aria-hidden="true">
      {fallbackText ? <span className="pixel-asset-fallback">{fallbackText}</span> : null}
    </span>
  );
}
