import {
  createContext,
  memo,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface AuthToken {
  provider: "google";
  token: string;
}

interface AuthContextValue {
  authToken: AuthToken | null;
  setAuthToken: (token: AuthToken | null) => void;
}

const AuthContext = createContext<AuthContextValue>({
  authToken: null,
  setAuthToken: () => {
    throw new Error("Cannot set authToken: context provider not found");
  },
});

export const AuthTokenProvider = memo(function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authToken, setAuthToken] = useState<AuthToken | null>(null);

  const value: AuthContextValue = {
    authToken,
    setAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export function useAuthToken() {
  return useContext(AuthContext);
}
