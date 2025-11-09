import { memo } from "react";
import { FormattedMessage } from "react-intl";

import { useGeolocation } from "../../global-providers/geolocation";

import { useAnswersByDate } from "./use-answers-by-date";

export const AnswersByDate = memo(function AnswersByDate() {
  const { geolocation } = useGeolocation();

  const { data, loading, error } = useAnswersByDate(
    geolocation?.countryCode ?? "",
    geolocation?.subdivision ?? "",
  );

  if (!geolocation) {
    return (
      <div className="w-full p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-center">
          <FormattedMessage
            defaultMessage="Please set your location first"
            description="graphs - no location"
          />
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-center">
          <FormattedMessage
            defaultMessage="Loading answers by date..."
            description="graphs - loading answers by date"
          />
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 text-center">
          <FormattedMessage
            defaultMessage="Error loading data: {error}"
            description="graphs - error loading answers by date"
            values={{ error: error.message }}
          />
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        <FormattedMessage
          defaultMessage="Answers by Date"
          description="graphs - answers by date title"
        />
      </h2>
      <pre className="text-xs overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
});
