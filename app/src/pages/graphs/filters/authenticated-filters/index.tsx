import { memo, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";

import { useFilters } from "pages/graphs/graphs-providers/filters-provider";

import { FiltersModal } from "./filters-modal";

export const AuthenticatedFilters = memo(function AuthenticatedFilters() {
  const { allergen } = useFilters();

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const openModal = useCallback(() => {
    setModalIsVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalIsVisible(false);
  }, []);

  return (
    <div>
      <div>
        {allergen ? (
          <span className="me-2">
            <FormattedMessage
              defaultMessage="Filtered by {allergen}"
              description="Filters"
              values={{ allergen }}
            />
          </span>
        ) : null}
        <button
          onClick={openModal}
          className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
        >
          {allergen ? (
            <FormattedMessage defaultMessage="Change" description="Filters" />
          ) : (
            <FormattedMessage
              defaultMessage="Edit filters"
              description="Filters"
            />
          )}
        </button>
      </div>
      {modalIsVisible ? <FiltersModal onClose={closeModal} /> : null}
    </div>
  );
});
