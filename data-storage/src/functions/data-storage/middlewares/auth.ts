import type { HeaderMap } from "@apollo/server";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env["JWT_SECRET"];
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name && rest.length > 0) {
      cookies[name] = rest.join("=");
    }
  });

  return cookies;
}

export interface AuthContext {
  userId: string | null;
}

/**
 * Middleware that checks for the "Authorization" cookie and decodes the JWT token to get the userId
 */
export function getAuthContext(headers: HeaderMap): AuthContext {
  const cookieHeader = headers.get("cookie");

  if (!cookieHeader) {
    return { userId: null };
  }

  // Parse cookies from the Cookie header
  const cookies = parseCookies(cookieHeader);
  const authCookie = cookies["Authorization"];

  if (!authCookie) {
    return { userId: null };
  }

  if (!authCookie.startsWith("Bearer ")) {
    throw new Error("Authorization cookie is expected to start with 'Bearer '");
  }

  const authToken = authCookie.slice(7); // Remove "Bearer "

  const decoded = jwt.verify(authToken, JWT_SECRET) as jwt.JwtPayload;

  const { userId } = decoded;

  if (typeof userId !== "string") {
    throw new Error("Could not retrieve userId");
  }

  return { userId };
}
