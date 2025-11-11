import { useLazyQuery } from "@apollo/client/react";
import { useCallback } from "react";

import { graphql } from "../../../generated/gql";

const GetJwtDocument = graphql(/* GraphQL */ `
  query GetJwt($provider: String!, $token: String!) {
    jwt(provider: $provider, token: $token) {
      token
    }
  }
`);

export function useJwt() {
  const [fetch] = useLazyQuery(GetJwtDocument);

  const getJwt = useCallback(async (provider: string, token: string) => {
    const response = await fetch({
      variables: {
        provider,
        token,
      },
    });

    return response.data?.jwt.token ?? null;
  }, []);

  return getJwt;
}
