import type { ReactNode } from "react";
import { AdSlot } from "./AdSlot";
import { Footer } from "./Footer";

type AppLayoutProps = {
  children: ReactNode;
  /** 뷰어 화면일 때 true (툴바 아래 영역 전체 사용) */
  fullHeight?: boolean;
};

/**
 * PC: 좌우 사이드바(300×600) + 중앙 콘텐츠
 * 모바일: 콘텐츠 + 하단 고정 배너(320×100)
 * 뷰어 영역 내부에는 광고 없음(콘텐츠만 중앙)
 */
export function AppLayout({ children, fullHeight }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-bg)]">
      {/* PC: 좌 사이드바 (md 이상에서만) */}
      <aside className="hidden md:flex flex-shrink-0 w-[316px] justify-center py-6 px-2 border-r border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="sticky top-6">
          <AdSlot variant="sidebar" />
        </div>
      </aside>

      {/* 중앙: 툴바 + 콘텐츠 + 푸터. 모바일에서 하단 고정 광고 높이만큼 padding */}
      <main
        className={`flex-1 flex flex-col min-w-0 pb-[116px] md:pb-0 ${fullHeight ? "h-screen md:h-auto md:min-h-screen" : ""}`}
      >
        <div className="flex-1 flex flex-col">{children}</div>
        {!fullHeight && <Footer />}
      </main>

      {/* PC: 우 사이드바 */}
      <aside className="hidden md:flex flex-shrink-0 w-[316px] justify-center py-6 px-2 border-l border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="sticky top-6">
          <AdSlot variant="sidebar" />
        </div>
      </aside>

      {/* 모바일: 하단 고정 배너 (320×100) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 flex justify-center py-2 px-2 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <AdSlot variant="mobile-bottom" />
      </div>
    </div>
  );
}
