import {
  createContext,
  memo,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

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

function clearCookie() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

interface AuthenticationContextValue {
  isAuthenticated: boolean;
  setAuthenticationHeader: (token: string, expiresAt: string) => void;
  clearAuthentication: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextValue>({
  isAuthenticated: false,
  setAuthenticationHeader() {
    throw new Error("Cannot set authentication header: provider not found");
  },
  clearAuthentication() {
    throw new Error("Cannot clear authentication: provider not found");
  },
});

export const AuthenticationProvider = memo(function AuthenticationProvider({
  children,
}: {
  children: ReactNode;
}) {
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

  const clearAuthentication = useCallback(() => {
    setIsAuthenticatedState(false);
    clearCookie();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setAuthenticationHeader,
        clearAuthentication,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
});

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
