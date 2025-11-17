import { useQuery } from "@apollo/client/react";

import { graphql } from "generated/gql";

const SubdivisionsDocument = graphql(/* GraphQL */ `
  query Subdivisions($ids: [String!]!, $authenticatedOnly: Boolean!) {
    subdivisions(ids: $ids) {
      id
      answersByDate(authenticatedOnly: $authenticatedOnly) {
        date
        yesCount
        noCount
      }
    }
  }
`);

export default function useSubdivisions({
  ids,
  authenticatedOnly,
}: {
  ids: string[] | null;
  authenticatedOnly: boolean;
}) {
  const { data } = useQuery(SubdivisionsDocument, {
    variables: {
      ids: ids ?? [],
      authenticatedOnly,
    },
    skip: !ids,
  });

  return data?.subdivisions;
}
