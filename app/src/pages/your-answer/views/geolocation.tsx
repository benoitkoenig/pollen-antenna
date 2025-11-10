import { useState, useEffect, memo, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
  countryCodes,
  type CountryCode,
  importSubdivisions,
} from "@pollen-antenna/static-data";

import { useGeolocation } from "global-providers/geolocation";

import type { GeolocationData } from "../types";

export default memo(function Geolocation({
  onSubmit,
}: {
  onSubmit: (answer: GeolocationData) => void;
}) {
  const intl = useIntl();

  const { geolocation: initialGeolocation } = useGeolocation();

  const [selectedCountryCode, setSelectedCountryCode] = useState<
    CountryCode | undefined
  >(initialGeolocation?.countryCode ?? undefined);
  const [subdivisions, setSubdivisions] = useState<string[] | null>(null);
  const [selectedSubdivision, setSelectedSubdivision] = useState<
    string | undefined
  >(initialGeolocation?.subdivision ?? undefined);

  useEffect(() => {
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
      setSubdivisions(null);
      setSelectedSubdivision(undefined);

      isCanceled = true;
    };
  }, [selectedCountryCode]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!selectedCountryCode || !selectedSubdivision) {
        throw new Error("Need both countryCode and subdivision to submit");
      }

      onSubmit({
        countryCode: selectedCountryCode,
        subdivision: selectedSubdivision,
      });
    },
    [selectedCountryCode, selectedSubdivision, onSubmit],
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-8 text-center">
          <FormattedMessage
            defaultMessage="Where are you?"
            description="geolocation"
          />
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
              name="country"
              value={selectedCountryCode ?? ""}
              onChange={(e) =>
                setSelectedCountryCode(e.target.value as CountryCode)
              }
              required
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
              name="subdivision"
              value={selectedSubdivision ?? ""}
              onChange={(e) => setSelectedSubdivision(e.target.value)}
              disabled={!subdivisions}
              required
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
                  {subdivisions.map((subdivision) => (
                    <option key={subdivision} value={subdivision}>
                      {subdivision}
                    </option>
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
            type="submit"
            disabled={!selectedCountryCode || !selectedSubdivision}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <FormattedMessage
              defaultMessage="See the graphs"
              description="geolocation"
            />
          </button>
        </form>
      </div>
    </div>
  );
});
