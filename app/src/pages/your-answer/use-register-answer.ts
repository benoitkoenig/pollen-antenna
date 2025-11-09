import { useMutation } from "@apollo/client/react";
import { useCallback } from "react";

import { graphql } from "../../generated/gql";

const RegisterAnswerDocument = graphql(/* GraphQL */ `
  mutation RegisterAnswer(
    $hasSymptoms: String!
    $country: String!
    $subdivision: String!
  ) {
    registerAnswer(
      hasSymptoms: $hasSymptoms
      country: $country
      subdivision: $subdivision
    ) {
      id
    }
  }
`);

export function useRegisterAnswer() {
  const [registerAnswerMutation] = useMutation(RegisterAnswerDocument);

  const registerAnswer = useCallback(
    async (hasSymptoms: string, country: string, subdivision: string) => {
      const result = await registerAnswerMutation({
        variables: {
          hasSymptoms,
          country,
          subdivision,
        },
      });

      const answerId = result.data?.registerAnswer?.id;

      if (!answerId) {
        throw new Error(
          "Expected registerAnswer mutation to return the answerId",
        );
      }

      return answerId;
    },
    [registerAnswerMutation],
  );

  return registerAnswer;
}
