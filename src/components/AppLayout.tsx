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
    /* fullHeight(뷰어) 모드: 전체를 h-screen으로 고정 → 페이지 레벨 스크롤 없음 */
    <div className={`flex flex-col md:flex-row bg-[var(--color-bg)] ${fullHeight ? "h-screen overflow-hidden" : "min-h-screen"}`}>

      {/* PC: 좌 사이드바 — fullHeight 시 h-screen으로 고정되어 항상 보임 */}
      <aside className={`hidden md:flex flex-shrink-0 w-[316px] justify-center py-6 px-2 border-r border-[var(--color-border)] bg-[var(--color-surface)] ${fullHeight ? "h-screen overflow-hidden" : ""}`}>
        <div className="sticky top-6">
          {/* slotId: AdSense 콘솔 > 광고 단위 > 디스플레이 광고 생성 후 ID 입력 */}
          <AdSlot variant="sidebar" slotId={undefined} />
        </div>
      </aside>

      {/* 중앙: 툴바 + 콘텐츠 + 푸터 */}
      <main
        className={`flex-1 flex flex-col min-w-0 min-h-0 ${fullHeight ? "h-screen overflow-hidden" : "pb-[116px] md:pb-0"}`}
      >
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
        {!fullHeight && <Footer />}
      </main>

      {/* PC: 우 사이드바 */}
      <aside className={`hidden md:flex flex-shrink-0 w-[316px] justify-center py-6 px-2 border-l border-[var(--color-border)] bg-[var(--color-surface)] ${fullHeight ? "h-screen overflow-hidden" : ""}`}>
        <div className="sticky top-6">
          {/* slotId: AdSense 콘솔 > 광고 단위 > 디스플레이 광고 생성 후 ID 입력 */}
          <AdSlot variant="sidebar" slotId={undefined} />
        </div>
      </aside>

      {/* 모바일: 하단 고정 배너 — fixed이므로 항상 보임 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 flex justify-center py-2 px-2 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        {/* slotId: AdSense 콘솔 > 광고 단위 > 인피드 광고(가로형) 생성 후 ID 입력 */}
        <AdSlot variant="mobile-bottom" slotId={undefined} />
      </div>
    </div>
  );
}
