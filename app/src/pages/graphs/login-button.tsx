import { GoogleLogin } from "@react-oauth/google";
import { memo } from "react";

import { useAuthToken } from "global-providers/auth-token";

export default memo(function LoginButton() {
  const { authToken, setAuthToken } = useAuthToken();

  if (authToken) {
    return null;
  }

  return (
    <GoogleLogin
      onSuccess={({ credential }) =>
        setAuthToken(
          credential ? { provider: "google", token: credential } : null,
        )
      }
      onError={() => setAuthToken(null)}
    />
  );
});
