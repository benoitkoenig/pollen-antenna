import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { memo, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Navigate } from "react-router-dom";

import { useAuthentication } from "global-providers/authentication";

import { useJwt } from "./use-jwt";

export default memo(function Login() {
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
    return <Navigate to="/" />;
  }

  return (
    <div className="w-2/3 mx-auto my-6 space-y-6 text-center">
      <h1>
        <FormattedMessage defaultMessage="Login" description="Login page" />
      </h1>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => {
          throw new Error("Error authenticating");
        }}
      />
    </div>
  );
});
