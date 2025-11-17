import { memo, useCallback } from "react";
import { FormattedMessage } from "react-intl";

import { Modal } from "design-system/modal";
import { useFilters } from "pages/graphs/graphs-providers/filters-provider";

export const FiltersModal = memo(function FiltersModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const { authenticatedOnly, setAuthenticatedOnly } = useFilters();

  const toggleAuthenticatedOnly = useCallback(() => {
    setAuthenticatedOnly((a) => !a);
  }, []);

  return (
    <Modal onClose={onClose}>
      <label>
        <input
          checked={authenticatedOnly}
          type="checkbox"
          onChange={toggleAuthenticatedOnly}
          className="mr-2"
        />
        <FormattedMessage
          defaultMessage="Only include data from authenticated users"
          description="Filters"
        />
      </label>
    </Modal>
  );
});
