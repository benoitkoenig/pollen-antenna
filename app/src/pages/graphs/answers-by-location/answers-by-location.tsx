import { memo } from "react";
import { FormattedMessage } from "react-intl";

import { useAnswersByLocation } from "./use-answers-by-location";

export const AnswersByLocation = memo(function AnswersByLocation() {
  const { data, loading, error } = useAnswersByLocation();

  if (loading) {
    return (
      <div className="w-full p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-center">
          <FormattedMessage
            defaultMessage="Loading answers by location..."
            description="graphs - loading answers by location"
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
            description="graphs - error loading answers by location"
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
          defaultMessage="Answers by Location"
          description="graphs - answers by location title"
        />
      </h2>
      <pre className="text-xs overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
});
