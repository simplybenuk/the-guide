import { NextResponse } from "next/server";

import { PRODUCT_BOUNDARIES } from "@/lib/product-boundaries";

export function GET() {
  return NextResponse.json({
    status: "ok",
    providerMode: PRODUCT_BOUNDARIES.providerMode,
  });
}
