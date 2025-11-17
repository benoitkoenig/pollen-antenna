import { memo, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

import { Modal } from "design-system/modal";

export const ModalToAuthentication = memo(function ModalToAuthentication({
  onClose,
}: {
  onClose: () => void;
}) {
  const navigate = useNavigate();

  const handleGoToLogin = useCallback(() => {
    navigate("/login");
    onClose();
  }, []);

  return (
    <Modal onClose={onClose}>
      <p className="mb-6">
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
    </Modal>
  );
});
