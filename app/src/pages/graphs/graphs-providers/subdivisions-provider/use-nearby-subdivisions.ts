import { useQuery } from "@apollo/client/react";

import { graphql } from "generated/gql";

const NearbySubdivisionsDocument = graphql(/* GraphQL */ `
  query NearbySubdivisions(
    $subdivisionId: String!
    $authenticatedOnly: Boolean!
  ) {
    nearbySubdivisions(subdivisionId: $subdivisionId) {
      subdivisions {
        id
        answersByDate(authenticatedOnly: $authenticatedOnly) {
          date
          yesCount
          noCount
        }
      }
      boundingBox {
        north
        east
        west
        south
      }
    }
  }
`);

export default function useNearbySubdivisions({
  subdivisionId,
  authenticatedOnly,
}: {
  subdivisionId: string;
  authenticatedOnly: boolean;
}) {
  const { data } = useQuery(NearbySubdivisionsDocument, {
    variables: {
      subdivisionId,
      authenticatedOnly,
    },
  });

  return data?.nearbySubdivisions ?? undefined;
}
