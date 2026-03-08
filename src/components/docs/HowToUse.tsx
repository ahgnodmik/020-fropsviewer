const APP_VERSION = "1.0.0";

export function HowToUse() {
  return (
    <>
      {/* Service header: logo + title + version */}
      <div className="flex flex-col items-center gap-2 pb-4 mb-4 border-b border-[var(--color-border)]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-14 h-14" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="6" width="88" height="88" rx="8" stroke="currentColor" strokeWidth="4.5" fill="var(--color-surface)" />
          <line x1="6" y1="24" x2="94" y2="24" stroke="currentColor" strokeWidth="4.5" />
          <circle cx="19" cy="15" r="3" fill="currentColor" />
          <circle cx="30" cy="15" r="3" fill="currentColor" />
          <circle cx="41" cy="15" r="3" fill="currentColor" />
          <path d="M34 35 L34 78 L66 78 L66 46 L55 35 Z" stroke="currentColor" strokeWidth="4" fill="var(--color-surface)" />
          <polyline points="55,35 55,46 66,46" stroke="currentColor" strokeWidth="4" fill="none" />
          <text x="50" y="68" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="14" fill="currentColor" stroke="none">PDF</text>
        </svg>
        <div className="text-center">
          <p className="text-base font-bold text-[var(--color-text)]">PDF Viewer Online</p>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">
            v{APP_VERSION} &nbsp;·&nbsp; Browser-only · No server upload
          </p>
        </div>
      </div>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">1. Upload a PDF</h3>
        <p>Drag and drop a PDF onto the upload area, or click it to browse your files. Supports up to 50 MB, .pdf format only.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">2. Navigate Pages</h3>
        <p>Use the previous (‹) and next (›) buttons in the toolbar to move between pages. The current page and total page count are always shown.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">3. Zoom In / Out</h3>
        <p>Use the + and − buttons in the toolbar to zoom between 50% and 300%.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">4. View Modes</h3>
        <p>Switch between <strong className="text-[var(--color-text)]">Page mode</strong> (one page at a time) and <strong className="text-[var(--color-text)]">Scroll mode</strong> (all pages continuously, drag to pan) using the toggle buttons in the toolbar.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">5. Dark Mode</h3>
        <p>Click the moon icon in the top-right corner to toggle dark mode. It also follows your system preference automatically.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">6. Close a File</h3>
        <p>Click the × button on the left side of the viewer toolbar to return to the upload screen. The file is immediately released from memory.</p>
      </section>
    </>
  );
}
