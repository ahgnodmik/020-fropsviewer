import { useState } from "react";
import { Modal } from "./Modal";
import { HowToUse } from "./docs/HowToUse";
import { PrivacyPolicy } from "./docs/PrivacyPolicy";
import { DataPolicy } from "./docs/DataPolicy";

type DocKey = "how-to-use" | "privacy" | "data-policy" | null;

const LINKS: { label: string; key: DocKey }[] = [
  { label: "사용 방법", key: "how-to-use" },
  { label: "개인정보 처리방침", key: "privacy" },
  { label: "자료 보관 정책", key: "data-policy" },
];

const DOC_TITLE: Record<NonNullable<DocKey>, string> = {
  "how-to-use": "사용 방법",
  privacy: "개인정보 처리방침",
  "data-policy": "자료 보관 정책",
};

function DocContent({ docKey }: { docKey: NonNullable<DocKey> }) {
  if (docKey === "how-to-use") return <HowToUse />;
  if (docKey === "privacy") return <PrivacyPolicy />;
  return <DataPolicy />;
}

export function Footer() {
  const [open, setOpen] = useState<DocKey>(null);

  return (
    <>
      <footer className="flex-shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {LINKS.map(({ label, key }) => (
            <button
              key={key}
              onClick={() => setOpen(key)}
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              {label}
            </button>
          ))}
          <span className="text-xs text-[var(--color-muted)]">
            © {new Date().getFullYear()} PDF 뷰어
          </span>
        </div>
      </footer>

      {open && (
        <Modal title={DOC_TITLE[open]} onClose={() => setOpen(null)}>
          <DocContent docKey={open} />
        </Modal>
      )}
    </>
  );
}
