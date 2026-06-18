import { NextResponse } from "next/server";
import { getOrbitportSDK } from "@/lib/orbitport";
import { fetch as undiciFetch } from "undici";

// Override Next.js patched fetch with native undici fetch to completely bypass Next.js data cache for the Orbitport SDK
if (typeof globalThis !== 'undefined') {
  (globalThis as any).fetch = undiciFetch;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET() {
  const requestStartedAt = Date.now();

  try {
    const sdk = getOrbitportSDK();
    const result = await sdk.ctrng.random();

    if (!result || !result.data || !result.data.data) {
      throw new Error("Failed to receive valid randomness payload from Orbitport service.");
    }

    const randomHex = result.data.data;
    const provider = result.data.src || "SpaceComputer";
    const timestamp = result.data.timestamp
      ? new Date(result.data.timestamp).toISOString()
      : new Date().toISOString();
    const requestId = result.metadata?.request_id;

    console.info("[cTRNG] fresh entropy fetched", {
      requestId: requestId ?? "unknown",
      hexPrefix: randomHex.slice(0, 16),
      provider,
      latencyMs: Date.now() - requestStartedAt,
    });

    return NextResponse.json(
      {
        success: true,
        randomHex,
        timestamp,
        provider,
        requestId,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error("cTRNG Fetch Error:", error);
    const message = error instanceof Error ? error.message : "Failed to retrieve cosmic randomness.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
