import { useState, useEffect, memo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import {
  countryCodes,
  type CountryCode,
  importSubdivisions,
} from "@pollen-antenna/static-data";

export default memo(function Geolocation() {
  const navigate = useNavigate();
  const intl = useIntl();

  function onConfirm() {
    navigate("/graphs");
  }

  const [selectedCountry, setSelectedCountry] = useState<
    CountryCode | undefined
  >(undefined);
  const [subdivisions, setSubdivisions] = useState<
    { id: string; name: string }[] | null
  >(null);
  const [selectedSubdivision, setSelectedSubdivision] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    setSubdivisions(null);
    setSelectedSubdivision(undefined);

    if (!selectedCountry) {
      return;
    }

    let isCanceled = false;

    (async () => {
      const subdivisionsToSet = await importSubdivisions(selectedCountry);

      if (!isCanceled) {
        setSubdivisions(subdivisionsToSet);
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, [selectedCountry]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-8 text-center">
          <FormattedMessage
            defaultMessage="Where are you?"
            description="geolocation"
          />
        </h1>

        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <FormattedMessage
                defaultMessage="Country"
                description="geolocation"
              />
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) =>
                setSelectedCountry(e.target.value as CountryCode)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">
                {intl.formatMessage({
                  defaultMessage: "Select a country",
                  description: "geolocation",
                })}
              </option>
              {countryCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="subdivision"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <FormattedMessage
                defaultMessage="Region/State"
                description="geolocation"
              />
            </label>
            <select
              id="subdivision"
              value={selectedSubdivision}
              onChange={(e) => setSelectedSubdivision(e.target.value)}
              disabled={!subdivisions}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-base"
            >
              {subdivisions ? (
                <>
                  <option value="">
                    {intl.formatMessage({
                      defaultMessage: "Select a region",
                      description: "geolocation",
                    })}
                  </option>
                  {subdivisions?.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                  ))}
                </>
              ) : (
                <option value="">
                  {intl.formatMessage({
                    defaultMessage: "Loading…",
                    description: "geolocation",
                  })}
                </option>
              )}
            </select>
          </div>

          <button
            onClick={onConfirm}
            disabled={!selectedCountry || !selectedSubdivision}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <FormattedMessage
              defaultMessage="See the graphs"
              description="geolocation"
            />
          </button>
        </div>
      </div>
    </div>
  );
});
