import { GoogleLogin } from "@react-oauth/google";
import { memo } from "react";

import { useStore } from "store";

export default memo(function LoginButton() {
  const authToken = useStore(({ authToken }) => authToken);
  const setAuthToken = useStore(({ setAuthToken }) => setAuthToken);

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
