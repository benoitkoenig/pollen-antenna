import { useQuery } from "@apollo/client/react";

import { graphql } from "generated/gql";

const AnswersByDateDocument = graphql(/* GraphQL */ `
  query AnswersByDate($subdivision: String!) {
    answersByDate(subdivision: $subdivision) {
      date
      yesCount
      noCount
    }
  }
`);

export function useAnswersByDate(subdivision: string) {
  return useQuery(AnswersByDateDocument, {
    variables: {
      subdivision,
    },
    context: {
      fetchOptions: {
        credentials: "include",
      },
    },
  });
}
