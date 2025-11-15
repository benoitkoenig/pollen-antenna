import { useQuery } from "@apollo/client/react";

import type { CountryCode } from "@pollen-antenna/static-data";

import { graphql } from "generated/gql";

const SubdivisionsByCountryDocument = graphql(/* GraphQL */ `
  query SubdivisionsByCountry($countryCode: String!) {
    subdivisionsByCountry(countryCode: $countryCode) {
      id
    }
  }
`);

export function useSubdivisionsByCountry(countryCode: string | null) {
  const { data, loading, error } = useQuery(SubdivisionsByCountryDocument, {
    variables: {
      countryCode: countryCode as CountryCode, // Skipped when countryCode is null
    },
    skip: !countryCode,
  });

  return { subdivisions: data?.subdivisionsByCountry ?? null, loading, error };
}
