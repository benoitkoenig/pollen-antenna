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

interface AuthenticationContextValue {
  isAuthenticated: boolean;
  setAuthenticationHeader: (token: string, expiresAt: string) => void;
}

const AuthenticationContext = createContext<AuthenticationContextValue>({
  isAuthenticated: false,
  setAuthenticationHeader() {
    throw new Error("Cannot set authentication header: provider not found");
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

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setAuthenticationHeader,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
});

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
