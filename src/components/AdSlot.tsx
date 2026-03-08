/**
 * Google AdSense 광고 슬롯 (승인 전: 공백 플레이스홀더)
 * 승인 후: index.html 또는 이 컴포넌트에 스크립트 삽입으로 활성화
 *
 * - PC: 좌우 사이드바 300×600 (하프페이지 배너)
 * - 모바일: 하단 고정 320×100 (대형 모바일 배너)
 */

type AdSlotProps = {
  variant: "sidebar" | "mobile-bottom";
  className?: string;
};

const SIZES = {
  sidebar: { width: 300, height: 600 },
  "mobile-bottom": { width: 320, height: 100 },
} as const;

export function AdSlot({ variant, className = "" }: AdSlotProps) {
  const { width, height } = SIZES[variant];

  return (
    <div
      className={`bg-[var(--drop-zone-bg)] border border-[var(--color-border)] flex items-center justify-center ${className}`}
      style={{ width, height, minWidth: width, minHeight: height }}
      data-ad-slot={variant}
      data-ad-format={variant === "sidebar" ? "rectangle" : "horizontal"}
      aria-label="광고 영역"
    >
      <span className="text-xs text-[var(--color-muted)] select-none">광고</span>
    </div>
  );
}
