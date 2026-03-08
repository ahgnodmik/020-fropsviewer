const LINKS = [
  { label: "사용 방법", href: "#how-to-use" },
  { label: "개인정보 처리방침", href: "#privacy" },
  { label: "자료 보관 정책", href: "#data-policy" },
];

export function Footer() {
  return (
    <footer className="flex-shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        {LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            {label}
          </a>
        ))}
        <span className="text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} PDF 뷰어
        </span>
      </div>
    </footer>
  );
}
