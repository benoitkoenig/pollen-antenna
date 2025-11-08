import { memo } from "react";
import { FormattedMessage } from "react-intl";

export default memo(function Graphs() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <p className="text-xl text-center text-gray-700">
          <FormattedMessage
            defaultMessage="WIP - Show the graphs"
            description="graphs"
          />
        </p>
      </div>
    </div>
  );
});
