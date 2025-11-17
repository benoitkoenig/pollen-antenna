import { memo } from "react";
import { FormattedMessage } from "react-intl";

export const AuthenticatedFilters = memo(function AuthenticatedFilters() {
  return (
    <div>
      <button className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700">
        <FormattedMessage
          defaultMessage="Edit filters (Coming soon)"
          description="Filters"
        />
      </button>
    </div>
  );
});
