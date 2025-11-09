import { useQuery } from "@apollo/client/react";

import { graphql } from "../../generated/gql";

const AnswersByDateDocument = graphql(/* GraphQL */ `
  query AnswersByDate($country: String!, $subdivision: String!) {
    answersByDate(country: $country, subdivision: $subdivision) {
      date
      yesCount
      noCount
    }
  }
`);

export function useAnswersByDate(country: string, subdivision: string) {
  return useQuery(AnswersByDateDocument, {
    variables: {
      country,
      subdivision,
    },
  });
}
