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
          안전한 PDF 보기
        </h2>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
          업로드한 PDF는 <strong className="text-[var(--color-text)]">이 기기 메모리에서만</strong> 처리되며,
          서버에 저장되지 않습니다. 탭이나 브라우저를 닫으면 파일은 자동으로 삭제됩니다.
        </p>
        <button
          onClick={onDismiss}
          className="w-full py-3 rounded-xl bg-[var(--color-accent)] text-white font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}
