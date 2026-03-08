const STORAGE_KEY = "fropsviewer-notice-seen";

export function useSessionNotice() {
  const seen = typeof sessionStorage !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1";
  const dismiss = () => sessionStorage.setItem(STORAGE_KEY, "1");
  return { seen, dismiss };
}
