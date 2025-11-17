import { memo, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";

import { FiltersModal } from "./filters-modal";

export const AuthenticatedFilters = memo(function AuthenticatedFilters() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const openModal = useCallback(() => {
    setModalIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsVisible(false);
  }, []);

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
      >
        <FormattedMessage defaultMessage="Edit filters" description="Filters" />
      </button>
      {modalIsVisible ? <FiltersModal onClose={closeModal} /> : null}
    </div>
  );
});
