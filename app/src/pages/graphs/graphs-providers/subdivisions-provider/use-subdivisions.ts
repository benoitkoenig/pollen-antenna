import { useQuery } from "@apollo/client/react";

import { graphql } from "generated/gql";

const SubdivisionsDocument = graphql(/* GraphQL */ `
  query Subdivisions($ids: [String!]!) {
    subdivisions(ids: $ids) {
      id
      answersByDate {
        date
        yesCount
        noCount
      }
    }
  }
`);

export default function useSubdivisions(ids: string[] | null) {
  const { data } = useQuery(SubdivisionsDocument, {
    variables: {
      ids: ids ?? [],
    },
    skip: !ids,
  });

  return data?.subdivisions;
}
