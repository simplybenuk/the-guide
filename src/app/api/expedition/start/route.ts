import { NextResponse } from "next/server";

import { createBuddyAdapter } from "@/adapters/buddy-adapter";
import { providerStartRequestSchema } from "@/domain/adapter";
import { startExpeditionWithAdapter } from "@/domain/live-orchestration";
import { loadProviderConfig } from "@/lib/provider-config";
import { RequestCapacityError, RequestIdentityConflictError, withRequestDeduplication } from "@/lib/request-dedupe";
import { requestFingerprint } from "@/lib/request-fingerprint";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = providerStartRequestSchema.parse(body);
    const config = loadProviderConfig();
    const run = () => startExpeditionWithAdapter(parsed, createBuddyAdapter(config));
    const fingerprint = requestFingerprint({
      buddy: parsed.buddy,
      timeBudgetMinutes: parsed.timeBudgetMinutes,
      energy: parsed.energy,
      boundaries: parsed.boundaries,
      transformed: parsed.transformed,
    });
    const result = await withRequestDeduplication(
      `start:${parsed.installationId}:${parsed.requestId}`,
      fingerprint,
      run,
    );
    return NextResponse.json({
      state: result.state,
      provider: { mode: config.mode, fallbackUsed: result.fallbackUsed },
    });
  } catch (error) {
    if (error instanceof RequestIdentityConflictError) {
      return NextResponse.json({ error: "That action identity was already used." }, { status: 409 });
    }
    if (error instanceof RequestCapacityError) {
      return NextResponse.json({ error: "The signal is busy. Try again shortly." }, { status: 503 });
    }
    return NextResponse.json(
      { error: "The expedition could not begin safely." },
      { status: 400 },
    );
  }
}
