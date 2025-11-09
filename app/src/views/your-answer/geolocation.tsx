import { useState, useEffect, memo, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  countryCodes,
  type CountryCode,
  importSubdivisions,
} from "@pollen-antenna/static-data";

import type { GeolocationData } from "./types";

export default memo(function Geolocation({
  onSubmit,
}: {
  onSubmit: (answer: GeolocationData) => void;
}) {
  const intl = useIntl();

  const [selectedCountryCode, setSelectedCountryCode] = useState<
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

    if (!selectedCountryCode) {
      return;
    }

    let isCanceled = false;

    (async () => {
      const subdivisionsToSet = await importSubdivisions(selectedCountryCode);

      if (!isCanceled) {
        setSubdivisions(subdivisionsToSet);
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, [selectedCountryCode]);

  const onConfirm = useCallback(() => {
    if (!selectedCountryCode || !selectedSubdivision) {
      throw new Error("Need both countryCode and subdivision to submit");
    }

    onSubmit({
      countryCode: selectedCountryCode,
      subdivision: selectedSubdivision,
    });
  }, [selectedCountryCode, selectedSubdivision]);

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
              value={selectedCountryCode}
              onChange={(e) =>
                setSelectedCountryCode(e.target.value as CountryCode)
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
            disabled={!selectedCountryCode || !selectedSubdivision}
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
