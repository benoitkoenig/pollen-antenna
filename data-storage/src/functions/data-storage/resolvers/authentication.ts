import * as jwt from "jsonwebtoken";

import getUserId from "../get-user-id";

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
