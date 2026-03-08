/**
 * Google AdSense 광고 슬롯
 * publisher: ca-pub-8527804772343765
 *
 * - PC: 좌우 사이드바 300×600 (하프페이지 배너)
 * - 모바일: 하단 고정 320×100 (대형 모바일 배너)
 *
 * data-ad-slot: AdSense 콘솔에서 광고 단위 생성 후 슬롯 ID를 채워주세요.
 */

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdSlotProps = {
  /** 사이드바 슬롯 ID (AdSense 콘솔에서 확인) */
  slotId?: string;
  variant: "sidebar" | "mobile-bottom";
  className?: string;
};

const SIZES = {
  sidebar: { width: 300, height: 600, format: "auto" },
  "mobile-bottom": { width: 320, height: 100, format: "horizontal" },
} as const;

const AD_CLIENT = "ca-pub-8527804772343765";

export function AdSlot({ variant, slotId, className = "" }: AdSlotProps) {
  const { width, height, format } = SIZES[variant];
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense 아직 로드 안 된 경우 무시
    }
  }, []);

  if (!slotId) {
    // slotId 미설정 시 플레이스홀더 표시
    return (
      <div
        className={`bg-[var(--drop-zone-bg)] border border-[var(--color-border)] flex items-center justify-center ${className}`}
        style={{ width, height, minWidth: width, minHeight: height }}
        aria-label="광고 영역"
      >
        <span className="text-xs text-[var(--color-muted)] select-none">광고</span>
      </div>
    );
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={{ display: "block", width, height, minWidth: width, minHeight: height }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive="false"
      aria-label="광고 영역"
    />
  );
}
