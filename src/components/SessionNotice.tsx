type SessionNoticeProps = {
  onDismiss: () => void;
};

export function SessionNotice({ onDismiss }: SessionNoticeProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-notice-title"
    >
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 id="session-notice-title" className="text-lg font-semibold text-[var(--color-text)] mb-3">
          Safe PDF Viewing
        </h2>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
          Your PDF is processed <strong className="text-[var(--color-text)]">entirely in this browser</strong> and never sent to any server. The file is automatically removed when you close the tab.
        </p>
        <button
          onClick={onDismiss}
          className="w-full py-3 rounded-xl bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
