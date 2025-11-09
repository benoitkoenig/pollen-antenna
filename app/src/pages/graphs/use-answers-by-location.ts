import { useQuery } from "@apollo/client/react";

import { graphql } from "../../generated/gql";

const AnswersByLocationDocument = graphql(/* GraphQL */ `
  query AnswersByLocation {
    answersByLocation {
      country
      subdivision
      yesCount
      noCount
    }
  }
`);

export function useAnswersByLocation() {
  return useQuery(AnswersByLocationDocument);
}
