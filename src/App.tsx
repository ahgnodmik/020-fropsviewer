import { useState, useEffect } from "react";
import { UploadZone } from "./components/UploadZone";
import { PdfViewer } from "./components/PdfViewer";
import { AppLayout } from "./components/AppLayout";
import { SessionNotice } from "./components/SessionNotice";
import { useSessionNotice } from "./hooks/useSessionNotice";

function App() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const { seen, dismiss } = useSessionNotice();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      {!seen && <SessionNotice onDismiss={dismiss} />}
      <AppLayout fullHeight={!!pdfFile}>
        {pdfFile ? (
          <PdfViewer file={pdfFile} onClose={() => setPdfFile(null)} />
        ) : (
          <>
            <header className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <h1 className="text-lg font-semibold text-[var(--color-text)]">
                PDF Viewer
              </h1>
              <button
                onClick={() => setDark((d) => !d)}
                className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] transition-colors"
                title={dark ? "Light mode" : "Dark mode"}
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {dark ? (
                  <svg className="w-5 h-5 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </header>
            <main className="flex-1">
              <UploadZone onFileSelect={setPdfFile} />
            </main>
          </>
        )}
      </AppLayout>
    </>
  );
}

export default App;
