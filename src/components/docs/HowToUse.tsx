const APP_VERSION = "1.0.0";

export function HowToUse() {
  return (
    <>
      {/* 서비스 헤더: 로고 + 제목 + 버전 */}
      <div className="flex flex-col items-center gap-2 pb-4 mb-4 border-b border-[var(--color-border)]">
        {/* SVG 로고 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-14 h-14"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
          <p className="text-base font-bold text-[var(--color-text)]">PDF 뷰어</p>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">
            버전 {APP_VERSION} &nbsp;·&nbsp; 브라우저 전용 · 서버 미전송
          </p>
        </div>
      </div>

      {/* 사용 방법 */}
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">1. PDF 파일 업로드</h3>
        <p>업로드 영역에 PDF 파일을 드래그 앤 드롭하거나, 영역을 클릭해 파일을 선택하세요. 최대 50MB, .pdf 형식만 지원합니다.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">2. 페이지 이동</h3>
        <p>뷰어 상단 툴바의 이전(‹) · 다음(›) 버튼으로 페이지를 이동할 수 있습니다. 현재 페이지와 전체 페이지 수가 함께 표시됩니다.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">3. 확대 / 축소</h3>
        <p>툴바의 + / − 버튼으로 PDF를 50%~300% 범위에서 확대·축소할 수 있습니다.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">4. 다크 모드</h3>
        <p>오른쪽 상단의 달 아이콘을 클릭하면 다크 모드로 전환됩니다. 시스템 설정에 따라 자동으로 적용되기도 합니다.</p>
      </section>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">5. 파일 닫기</h3>
        <p>뷰어 툴바 왼쪽 × 버튼을 누르면 업로드 화면으로 돌아갑니다. 파일은 즉시 메모리에서 해제됩니다.</p>
      </section>
    </>
  );
}
