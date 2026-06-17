import { NextResponse } from "next/server";
import { getOrbitportSDK } from "@/lib/orbitport";

// Ensure route is always evaluated dynamically and not statically optimized during build
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sdk = getOrbitportSDK();
    const result = await sdk.ctrng.random();

    if (!result || !result.data || !result.data.data) {
      throw new Error("Failed to receive valid randomness payload from Orbitport service.");
    }

    const randomHex = result.data.data;
    const provider = result.data.src || "SpaceComputer";
    const timestamp = new Date().toISOString();

    return NextResponse.json({
      success: true,
      randomHex,
      timestamp,
      provider,
    });
  } catch (error) {
    console.error("cTRNG Fetch Error:", error);
    const message = error instanceof Error ? error.message : "Failed to retrieve cosmic randomness.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
