import { memo } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

export default memo(function Symptoms() {
  const navigate = useNavigate();

  function onClick() {
    navigate("/geolocation");
  }

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
            onClick={onClick}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FormattedMessage defaultMessage="Yes" description="symptoms" />
          </button>

          <button
            onClick={onClick}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <FormattedMessage defaultMessage="No" description="symptoms" />
          </button>

          <button
            onClick={onClick}
            className="w-full py-2 px-4 text-gray-600 text-sm hover:text-gray-800 transition-colors"
          >
            <FormattedMessage
              defaultMessage="I prefer not to answer"
              description="symptoms"
            />
          </button>
        </div>
      </div>
    </div>
  );
});
