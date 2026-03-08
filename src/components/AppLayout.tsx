import type { ReactNode } from "react";
import { AdSlot } from "./AdSlot";
import { Footer } from "./Footer";

type AppLayoutProps = {
  children: ReactNode;
  /** 뷰어 화면일 때 true (툴바 아래 영역 전체 사용) */
  fullHeight?: boolean;
};

/**
 * PC: 좌우 사이드바(300×600) — position:fixed 오버레이, 스크롤과 무관하게 항상 고정
 * 모바일: 콘텐츠 + 하단 고정 배너(320×100)
 * 중앙 콘텐츠: md 이상에서 양쪽 316px 패딩으로 광고 영역 침범 없이 중앙 정렬
 */
export function AppLayout({ children, fullHeight }: AppLayoutProps) {
  return (
    <div className={`bg-[var(--color-bg)] ${fullHeight ? "h-screen overflow-hidden" : "min-h-screen"}`}>

      {/* PC: 좌 사이드바 — position:fixed, 스크롤 무관하게 항상 고정 */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[316px] z-20 justify-center items-start py-6 px-2 border-r border-[var(--color-border)] bg-[var(--color-surface)]">
        {/* slotId: AdSense 콘솔 > 광고 단위 > 디스플레이 광고 생성 후 ID 입력 */}
        <AdSlot variant="sidebar" slotId={undefined} />
      </aside>

      {/* PC: 우 사이드바 — position:fixed, 스크롤 무관하게 항상 고정 */}
      <aside className="hidden md:flex fixed top-0 right-0 h-screen w-[316px] z-20 justify-center items-start py-6 px-2 border-l border-[var(--color-border)] bg-[var(--color-surface)]">
        {/* slotId: AdSense 콘솔 > 광고 단위 > 디스플레이 광고 생성 후 ID 입력 */}
        <AdSlot variant="sidebar" slotId={undefined} />
      </aside>

      {/* 중앙: 툴바 + 콘텐츠 + 푸터 — md 이상에서 양쪽 316px 여백으로 광고 영역 회피 */}
      <main
        className={`flex flex-col min-w-0 md:ml-[316px] md:mr-[316px] ${fullHeight ? "h-screen overflow-hidden" : "min-h-screen pb-[116px] md:pb-0"}`}
      >
        <div className={`flex-1 flex flex-col ${fullHeight ? "min-h-0 overflow-hidden" : ""}`}>{children}</div>
        {!fullHeight && <Footer />}
      </main>

      {/* 모바일: 하단 고정 배너 — fixed이므로 항상 보임 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 flex justify-center py-2 px-2 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        {/* slotId: AdSense 콘솔 > 광고 단위 > 인피드 광고(가로형) 생성 후 ID 입력 */}
        <AdSlot variant="mobile-bottom" slotId={undefined} />
      </div>
    </div>
  );
}
