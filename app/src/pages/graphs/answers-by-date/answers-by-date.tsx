import { memo } from "react";
import { FormattedMessage } from "react-intl";

import { useGeolocation } from "global-providers/geolocation";

import { AnswersByDateChart } from "./answers-by-date-chart";
import { useAnswersByDate } from "./use-answers-by-date";

export const AnswersByDate = memo(function AnswersByDate() {
  const { geolocation } = useGeolocation();

  const { data, loading, error } = useAnswersByDate(
    geolocation?.countryCode ?? "",
    geolocation?.subdivision ?? "",
  );

  if (!geolocation) {
    return (
      <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 text-center">
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
      <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 text-center">
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
      <div className="w-full p-4 bg-red-50 dark:bg-red-900 rounded-lg">
        <p className="text-red-600 dark:text-red-400 text-center">
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
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        <FormattedMessage
          defaultMessage="Answers by Date"
          description="graphs - answers by date title"
        />
      </h2>
      {data?.answersByDate && data.answersByDate.length > 0 ? (
        <AnswersByDateChart data={data.answersByDate} />
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          <FormattedMessage
            defaultMessage="No data available"
            description="graphs - no data"
          />
        </p>
      )}
    </div>
  );
});
