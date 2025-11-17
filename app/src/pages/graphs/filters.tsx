import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

import { useAuthentication } from "global-providers/authentication";

export const Filters = memo(function Filters() {
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCheckboxClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (!isAuthenticated) {
        e.preventDefault();
        setShowDialog(true);
      }
    },
    [],
  );

  const handleGoToLogin = useCallback(() => {
    setShowDialog(false);
    navigate("/login");
  }, []);

  const handleGoBack = useCallback(() => {
    setShowDialog(false);
  }, []);

  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  return (
    <div>
      <label>
        <input type="checkbox" onClick={handleCheckboxClick} className="mr-2" />
        <FormattedMessage
          defaultMessage="Exclude data from non-authenticated users"
          description="filters checkbox label"
        />
      </label>

      {createPortal(
        <dialog
          ref={dialogRef}
          className="m-auto bg-white p-6 rounded-lg max-w-md backdrop:bg-black/50 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="mb-5">
            <FormattedMessage
              defaultMessage="You need to be authenticated yourself to filter out data from non-authenticated users"
              description="Authentication required dialog message"
            />
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleGoBack}
              className="px-4 py-2 border border-gray-300 rounded bg-white cursor-pointer hover:bg-gray-50"
            >
              <FormattedMessage
                defaultMessage="Go back"
                description="Dialog go back button"
              />
            </button>
            <button
              onClick={handleGoToLogin}
              className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
            >
              <FormattedMessage
                defaultMessage="Go to the login page"
                description="Dialog login button"
              />
            </button>
          </div>
        </dialog>,
        document.body,
      )}
    </div>
  );
});
