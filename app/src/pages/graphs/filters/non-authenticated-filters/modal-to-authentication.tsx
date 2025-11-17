import { memo, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export const ModalToAuthentication = memo(function ModalToAuthentication({
  onClose,
}: {
  onClose: () => void;
}) {
  const intl = useIntl();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleGoToLogin = useCallback(() => {
    navigate("/login");
    onClose();
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      const rect = dialogRef.current?.getBoundingClientRect();
      if (
        rect &&
        (e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom)
      ) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    dialogRef.current?.showModal();

    return () => {
      dialogRef.current?.close();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="relative m-auto bg-white text-center p-12 rounded-lg max-w-md backdrop:bg-black/50 shadow-lg"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-black cursor-pointer"
        aria-label={intl.formatMessage({
          defaultMessage: "Close modal",
          description: "Common",
        })}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <p className="my-6">
        <FormattedMessage
          defaultMessage="Want data from authenticated users only?"
          description="Authentication required dialog message"
        />
      </p>
      <p className="mb-6">
        <FormattedMessage
          defaultMessage="You need to be authenticated yourself!"
          description="Authentication required dialog message"
        />
      </p>
      <div className="flex justify-center">
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
  );
});
