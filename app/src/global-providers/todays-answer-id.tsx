import {
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const COOKIE_NAME = "todaysAnswerId";

function setAnswerIdCookie(answerId: string): void {
  const now = new Date();
  const expiration = new Date();

  // Set to 4AM today
  expiration.setHours(4, 0, 0, 0);

  if (now >= expiration) {
    // If it's already past 4AM, set to 4AM tomorrow
    expiration.setDate(expiration.getDate() + 1);
  }

  const expires = expiration.toUTCString();

  document.cookie = `${COOKIE_NAME}=${answerId}; expires=${expires}; path=/; SameSite=Strict`;
}

function getAnswerIdFromCookie(): string | null {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");

    if (name === COOKIE_NAME) {
      return value;
    }
  }

  return null;
}

interface TodaysAnswerIdContextValue {
  todaysAnswerId: string | null;
  setTodaysAnswerId: (id: string) => void;
}

const TodaysAnswerIdContext = createContext<TodaysAnswerIdContextValue>({
  todaysAnswerId: null,
  setTodaysAnswerId: () => {
    throw new Error("Cannot set today's answerId: context provider not found");
  },
});

/** {@link todaysAnswerId} is persisted until the user refreshes, even after the cookie expires */
export const TodaysAnswerIdProvider = memo(function TodaysAnswerIdProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [todaysAnswerId, setTodaysAnswerIdState] = useState<string | null>(() =>
    getAnswerIdFromCookie(),
  );
  const location = useLocation();
  const navigate = useNavigate();

  const setTodaysAnswerId = (id: string) => {
    setAnswerIdCookie(id);
    setTodaysAnswerIdState(id);
  };

  useEffect(() => {
    if (todaysAnswerId && location.pathname === "/") {
      navigate("/graphs");
    } else if (!todaysAnswerId && location.pathname === "/graphs") {
      navigate("/");
    }
  }, [todaysAnswerId, location.pathname, navigate]);

  const value: TodaysAnswerIdContextValue = {
    todaysAnswerId,
    setTodaysAnswerId,
  };

  return (
    <TodaysAnswerIdContext.Provider value={value}>
      {children}
    </TodaysAnswerIdContext.Provider>
  );
});

export function useTodaysAnswerId() {
  return useContext(TodaysAnswerIdContext);
}
