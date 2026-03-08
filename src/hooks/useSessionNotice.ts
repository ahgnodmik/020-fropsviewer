import { useState } from "react";

const STORAGE_KEY = "fropsviewer-notice-seen";

export function useSessionNotice() {
  const [seen, setSeen] = useState(
    () => typeof sessionStorage !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1"
  );
  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setSeen(true);
  };
  return { seen, dismiss };
}
