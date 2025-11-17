import {
  memo,
  useCallback,
  useEffect,
  useRef,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";
import { useIntl } from "react-intl";

export const Modal = memo(function Modal({
  onClose,
  children,
}: PropsWithChildren<{ onClose: () => void }>) {
  const intl = useIntl();
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    const dialogElement = dialogRef.current;

    if (!dialogElement) {
      throw new Error("dialogElement needs to be defined");
    }

    dialogElement.showModal();

    dialogElement.onclose = onClose;

    return () => {
      dialogElement.close();
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
      {children}
    </dialog>,
    document.body,
  );
});
