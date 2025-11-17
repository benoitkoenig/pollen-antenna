import { useQuery } from "@apollo/client/react";

import { graphql } from "generated/gql";

import type { SubdivisionData } from "./types";

const NearbySubdivisionsDocument = graphql(/* GraphQL */ `
  query NearbySubdivisions($subdivisionId: String!) {
    nearbySubdivisions(subdivisionId: $subdivisionId) {
      id
      coordinates
    }
  }
`);

export default function useNearbySubdivisions(subdivisionId: string) {
  const { data } = useQuery(NearbySubdivisionsDocument, {
    variables: {
      subdivisionId,
    },
  });

  return (data?.nearbySubdivisions ?? undefined) as
    | Required<Pick<SubdivisionData, "id" | "coordinates">>[]
    | undefined;
}
