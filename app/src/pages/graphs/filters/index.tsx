import { memo, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";

import { useAuthentication } from "global-providers/authentication";

import { ModalToAuthentication } from "./modal-to-authentication";

export const Filters = memo(function Filters() {
  const { isAuthenticated } = useAuthentication();
  const [showModalToAuthentication, setShowModalToAuthentication] =
    useState(false);

  const handleCheckboxClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (!isAuthenticated) {
        e.preventDefault();
        setShowModalToAuthentication(true);
      }
    },
    [isAuthenticated],
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
