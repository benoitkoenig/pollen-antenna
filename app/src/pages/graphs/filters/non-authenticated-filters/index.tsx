import { memo, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";

import { ModalToAuthentication } from "./modal-to-authentication";

export const NonAuthenticatedFilters = memo(function NonAuthenticatedFilters() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const handleCheckboxClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      setModalIsVisible(true);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalIsVisible(false);
  }, []);

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            onClick={handleCheckboxClick}
            className="mr-2"
          />
          <FormattedMessage
            defaultMessage="Only include data from authenticated users"
            description="Filters"
          />
        </label>
        <div className="text-sm text-gray-400 ml-6">
          <FormattedMessage
            defaultMessage="Data from authenticated users is more reliable and allows filtering per allergen"
            description="Filters"
          />
        </div>
      </div>

      {modalIsVisible ? <ModalToAuthentication onClose={closeModal} /> : null}
    </div>
  );
});
