import { memo } from "react";
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
          Do you have hay-fever symptoms?
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={onClick}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Yes
          </button>

          <button
            onClick={onClick}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            No
          </button>

          <button
            onClick={onClick}
            className="w-full py-2 px-4 text-gray-600 text-sm hover:text-gray-800 transition-colors"
          >
            I prefer not to answer
          </button>
        </div>
      </div>
    </div>
  );
});
