import { memo, useCallback } from "react";
import { FormattedMessage } from "react-intl";

export default memo(function Symptoms({
  onSubmit,
}: {
  onSubmit: (answer: string) => void;
}) {
  const answerYes = useCallback(() => onSubmit("yes"), []);
  const answerNo = useCallback(() => onSubmit("no"), []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-8 text-center">
          <FormattedMessage
            defaultMessage="Do you have hay-fever symptoms?"
            description="symptoms"
          />
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={answerYes}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FormattedMessage defaultMessage="Yes" description="symptoms" />
          </button>

          <button
            onClick={answerNo}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FormattedMessage defaultMessage="No" description="symptoms" />
          </button>
        </div>
      </div>
    </div>
  );
});
