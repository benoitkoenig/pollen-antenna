import { memo, useCallback } from "react";
import { FormattedMessage } from "react-intl";

import { allergensByType } from "@pollen-antenna/static-data";

import { Modal } from "design-system/modal";
import { useFilters } from "pages/graphs/graphs-providers/filters-provider";

export const FiltersModal = memo(function FiltersModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const { authenticatedOnly, setAuthenticatedOnly, allergen, setAllergen } =
    useFilters();

  const toggleAuthenticatedOnly = useCallback(() => {
    setAuthenticatedOnly(!authenticatedOnly);
  }, [authenticatedOnly, setAuthenticatedOnly]);

  const handleAllergenChange = useCallback(
    (selectedAllergen: string) => {
      setAllergen(allergen === selectedAllergen ? null : selectedAllergen);
    },
    [allergen, setAllergen],
  );

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        <div>
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
            <span className="text-gray-400 ml-1">
              <FormattedMessage
                defaultMessage="(Necessary to filter per allergen)"
                description="Filters"
              />
            </span>
          </label>
        </div>

        {allergensByType.map(({ type, allergens }) => (
          <div key={type}>
            <h3 className="font-semibold capitalize mb-2">{type}</h3>
            <div className="grid grid-cols-2 space-y-1">
              {allergens.map((allergenName) => (
                <label key={allergenName}>
                  <input
                    checked={allergen === allergenName}
                    type="checkbox"
                    onChange={() => handleAllergenChange(allergenName)}
                    className="mr-2"
                  />
                  {allergenName}
                  <FormattedMessage
                    defaultMessage="(Coming soon)"
                    description="Filters"
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
});
