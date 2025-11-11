import { useMutation } from "@apollo/client/react";
import { useCallback } from "react";

import { useStore } from "store";

import { graphql } from "../../generated/gql";

const RegisterAnswerDocument = graphql(/* GraphQL */ `
  mutation RegisterAnswer(
    $hasSymptoms: String!
    $country: String!
    $subdivision: String!
    $authToken: String
    $date: String!
  ) {
    registerAnswer(
      hasSymptoms: $hasSymptoms
      country: $country
      subdivision: $subdivision
      authToken: $authToken
      date: $date
    ) {
      id
    }
  }
`);

export function useRegisterAnswer() {
  const [registerAnswerMutation] = useMutation(RegisterAnswerDocument);
  const authToken = useStore(({ authToken }) => authToken);

  const registerAnswer = useCallback(
    async (
      hasSymptoms: string,
      country: string,
      subdivision: string,
      date: string,
    ) => {
      const result = await registerAnswerMutation({
        variables: {
          hasSymptoms,
          country,
          subdivision,
          authToken: authToken
            ? `${authToken.provider}:${authToken.token}`
            : null,
          date,
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
    [authToken, registerAnswerMutation],
  );

  return registerAnswer;
}
