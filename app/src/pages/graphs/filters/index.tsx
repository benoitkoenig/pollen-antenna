import { memo } from "react";

import { useAuthentication } from "global-providers/authentication";

import { AuthenticatedFilters } from "./authenticated-filters";
import { NonAuthenticatedFilters } from "./non-authenticated-filters";

export const Filters = memo(function Filters() {
  const { isAuthenticated } = useAuthentication();

  if (isAuthenticated) {
    return <AuthenticatedFilters />;
  }

  return <NonAuthenticatedFilters />;
});
