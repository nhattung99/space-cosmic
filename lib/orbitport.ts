import { OrbitportSDK } from "@spacecomputer-io/orbitport-sdk-ts";

let sdk: OrbitportSDK | null = null;

/**
 * Initializes and returns the Orbitport SDK instance.
 * Credentials are kept strictly server-side.
 */
export function getOrbitportSDK(): OrbitportSDK {
  if (!sdk) {
    const clientId = process.env.ORBITPORT_CLIENT_ID;
    const clientSecret = process.env.ORBITPORT_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing ORBITPORT_CLIENT_ID or ORBITPORT_CLIENT_SECRET in env variables.");
    }

    sdk = new OrbitportSDK({
      config: {
        clientId,
        clientSecret,
      },
      debug: true,
    });
  }
  return sdk;
}
