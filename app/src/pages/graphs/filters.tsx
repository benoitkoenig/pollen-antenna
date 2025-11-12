import { memo } from "react";
import { FormattedMessage } from "react-intl";

import { useAuthentication } from "global-providers/authentication";

export const Filters = memo(function Filters() {
  const { isAuthenticated } = useAuthentication();

  return (
    <div>
      <label>
        <input
          type="checkbox"
          disabled={!isAuthenticated}
          style={{ marginRight: "8px" }}
        />
        <FormattedMessage
          defaultMessage="Exclude data from non-authenticated users"
          description="filters checkbox label"
        />
      </label>
      {!isAuthenticated && (
        <div style={{ marginTop: "8px", fontSize: "0.9em", color: "#666" }}>
          <FormattedMessage
            defaultMessage="You need to be authenticated to filter-out data from non-authenticated users"
            description="filters authentication requirement message"
          />
        </div>
      )}
    </div>
  );
});
