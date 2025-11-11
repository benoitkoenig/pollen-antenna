import { useCallback, useState } from "react";

const COOKIE_NAME = "todaysAnswerId";

function getCookie(): string | null {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${COOKIE_NAME}=`));
  return cookie ? cookie.split("=")[1] : null;
}

function setCookie(id: string, date: string) {
  const expirationDate = new Date(date);
  expirationDate.setDate(expirationDate.getDate() + 1);
  expirationDate.setHours(4, 0, 0, 0);

  document.cookie = `${COOKIE_NAME}=${id}; expires=${expirationDate.toUTCString()}; path=/`;
}

export function useTodaysAnswerId() {
  const [todaysAnswerId, setTodaysAnswerIdState] = useState<string | null>(() =>
    getCookie(),
  );

  const setTodaysAnswerId = useCallback((id: string, date: string) => {
    setTodaysAnswerIdState(id);
    setCookie(id, date);
  }, []);

  return {
    todaysAnswerId,
    setTodaysAnswerId,
  };
}
