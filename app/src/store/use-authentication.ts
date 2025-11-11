import { useCallback, useState } from "react";

const COOKIE_NAME = "Authorization";

function checkIsAuthenticated(): boolean {
  const cookies = document.cookie.split("; ");
  const isAuthenticated = cookies.some((row) =>
    row.startsWith(`${COOKIE_NAME}=`),
  );

  return isAuthenticated;
}

function setCookie(token: string, expiresAt: string) {
  document.cookie = `${COOKIE_NAME}=Bearer ${token}; expires=${expiresAt}; path=/`;
}

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() =>
    checkIsAuthenticated(),
  );

  const setAuthenticationHeader = useCallback(
    (token: string, expiresAt: string) => {
      setIsAuthenticatedState(true);
      setCookie(token, expiresAt);
    },
    [],
  );

  return {
    isAuthenticated,
    setAuthenticationHeader,
  };
}
