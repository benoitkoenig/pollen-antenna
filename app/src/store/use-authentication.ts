import { useCallback, useState } from "react";

const COOKIE_NAME = "Authorization";

function checkIsAuthenticated(): boolean {
  const cookies = document.cookie.split("; ");
  const isAuthenticated = cookies.some((row) =>
    row.startsWith(`${COOKIE_NAME}=`),
  );

  return isAuthenticated;
}

function setCookie(token: string) {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 1, 0, 0); // TODO

  document.cookie = `${COOKIE_NAME}=Bearer ${token}; expires=${expirationDate.toUTCString()}; path=/`;
}

export function useAuthentication() {
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() =>
    checkIsAuthenticated(),
  );

  const setAuthenticationHeader = useCallback((token: string) => {
    setIsAuthenticatedState(true);
    setCookie(token);
  }, []);

  return {
    isAuthenticated,
    setAuthenticationHeader,
  };
}
