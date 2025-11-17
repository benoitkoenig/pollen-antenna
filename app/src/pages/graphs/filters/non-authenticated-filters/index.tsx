import { memo, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";

import { ModalToAuthentication } from "./modal-to-authentication";

export const NonAuthenticatedFilters = memo(function NonAuthenticatedFilters() {
  const [showModalToAuthentication, setShowModalToAuthentication] =
    useState(false);

  const handleCheckboxClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      setShowModalToAuthentication(true);
    },
    [],
  );

  const onCloseModalToAuthentication = useCallback(() => {
    setShowModalToAuthentication(false);
  }, []);

  return (
    <div>
      <label>
        <input type="checkbox" onClick={handleCheckboxClick} className="mr-2" />
        <FormattedMessage
          defaultMessage="Exclude data from non-authenticated users"
          description="filters checkbox label"
        />
      </label>

      {showModalToAuthentication ? (
        <ModalToAuthentication onClose={onCloseModalToAuthentication} />
      ) : null}
    </div>
  );
});
