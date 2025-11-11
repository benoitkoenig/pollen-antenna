import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client({
  client_id: process.env["GOOGLE_OAUTH_CLIENT_ID"],
});

export default async function getUserId(provider: string, token: string) {
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
