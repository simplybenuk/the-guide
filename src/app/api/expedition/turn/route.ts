import { NextResponse } from "next/server";

import { orchestrateTurn } from "@/domain/engine";
import { turnRequestSchema } from "@/domain/schemas";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const turn = turnRequestSchema.parse(body);
    return NextResponse.json({ state: orchestrateTurn(turn) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The expedition could not advance.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
