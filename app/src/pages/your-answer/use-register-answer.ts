import { useMutation } from "@apollo/client/react";
import { useCallback } from "react";

import { graphql } from "../../generated/gql";

const RegisterAnswerDocument = graphql(/* GraphQL */ `
  mutation RegisterAnswer(
    $hasSymptoms: String!
    $subdivision: String!
    $date: String!
  ) {
    registerAnswer(
      hasSymptoms: $hasSymptoms
      subdivision: $subdivision
      date: $date
    ) {
      id
    }
  }
`);

export function useRegisterAnswer() {
  const [registerAnswerMutation] = useMutation(RegisterAnswerDocument);

  const registerAnswer = useCallback(
    async (hasSymptoms: string, subdivision: string, date: string) => {
      const result = await registerAnswerMutation({
        variables: {
          hasSymptoms,
          subdivision,
          date,
        },
        context: {
          fetchOptions: {
            credentials: "include",
          },
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
