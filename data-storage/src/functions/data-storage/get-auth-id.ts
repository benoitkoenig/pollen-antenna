import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client({
  client_id:
    process.env[
      "952779456087-s4nam55a7kq8v9hs5rmvci0bb0vnpjf6.apps.googleusercontent.com"
    ],
});

export default async function getAuthId(authToken: string) {
  const [provider, token] = authToken.split(":");

  if (provider !== "google") {
    throw new Error("Unsupported authentication provider");
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error("Invalid token: no payload");
    }

    return `google:${payload.sub}`;
  } catch (error) {
    throw new Error(
      `Token validation failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
