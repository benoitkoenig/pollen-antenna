import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { memo, useCallback } from "react";

import { useAuthentication } from "store/use-authentication";

import { useJwt } from "./use-jwt";

export default memo(function LoginButton() {
  const { isAuthenticated, setAuthenticationHeader } = useAuthentication();
  const getJwt = useJwt();

  const onSuccess = useCallback(async ({ credential }: CredentialResponse) => {
    if (!credential) {
      return;
    }

    const { token: jwtToken, expiresAt } = await getJwt("google", credential);

    setAuthenticationHeader(jwtToken, expiresAt);
  }, []);

  if (isAuthenticated) {
    return null;
  }

  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={() => {
        throw new Error("Error authenticating");
      }}
    />
  );
});
