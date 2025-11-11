import { HeaderMap } from "@apollo/server";
import { InvocationContext } from "@azure/functions";

import { getAuthContext } from "./auth";

export type { ExtendedContext } from "./types";

export function getExtendedContext(
  context: InvocationContext,
  headers: HeaderMap,
) {
  const authContext = getAuthContext(headers);

  return {
    ...context,
    ...authContext,
  };
}
