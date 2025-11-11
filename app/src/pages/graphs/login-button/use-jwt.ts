import { useLazyQuery } from "@apollo/client/react";
import { useCallback } from "react";

import { graphql } from "../../../generated/gql";

const GetJwtDocument = graphql(/* GraphQL */ `
  query GetJwt($provider: String!, $token: String!) {
    jwt(provider: $provider, token: $token) {
      token
      expiresAt
    }
  }
`);

export function useJwt() {
  const [fetch] = useLazyQuery(GetJwtDocument);

  const getJwt = useCallback(
    async (provider: string, providerToken: string) => {
      const response = await fetch({
        variables: {
          provider,
          token: providerToken,
        },
      });

      if (!response.data) {
        throw new Error("Expected jwt to not return undefined");
      }

      const {
        jwt: { token, expiresAt },
      } = response.data;

      return {
        token,
        expiresAt,
      };
    },
    [],
  );

  return getJwt;
}
