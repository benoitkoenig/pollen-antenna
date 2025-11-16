import { OAuth2Client } from "google-auth-library";
import * as jwt from "jsonwebtoken";

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

export interface JwtArgs {
  provider: string;
  token: string;
}

export const authenticationResolvers = {
  Query: {
    jwt: async (_: unknown, { provider, token }: JwtArgs) => {
      const userId = await getUserId(provider, token);

      const jwtSecret = process.env["JWT_SECRET"];
      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not configured");
      }

      const jwtToken = jwt.sign({ userId }, jwtSecret, {
        expiresIn: "70m", // Must last a little longer than {@link expiresAt}
      });

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      return {
        token: jwtToken,
        expiresAt: expiresAt.toUTCString(),
      };
    },
  },
};
