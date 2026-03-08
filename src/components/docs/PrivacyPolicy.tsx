export function PrivacyPolicy() {
  const year = new Date().getFullYear();
  return (
    <>
      <p className="text-xs text-[var(--color-muted)]">시행일: {year}년 1월 1일</p>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">1. 수집하는 정보</h3>
        <p>본 서비스는 사용자가 업로드하는 PDF 파일을 포함하여 어떠한 개인정보도 수집·저장하지 않습니다. 업로드된 파일은 브라우저 메모리에서만 처리됩니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">2. 서버 전송 여부</h3>
        <p>업로드한 PDF 파일은 외부 서버로 전송되지 않습니다. 모든 처리는 사용자의 기기(브라우저) 내에서만 이루어집니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">3. 쿠키 및 추적</h3>
        <p>본 서비스는 필수 기능 목적으로 <code className="bg-[var(--drop-zone-bg)] px-1 rounded text-xs">sessionStorage</code>를 사용합니다(안내 팝업 표시 여부 기록). 광고 네트워크(Google AdSense) 운영 시 해당 사업자의 쿠키 정책이 추가로 적용될 수 있습니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">4. 제3자 제공</h3>
        <p>사용자 데이터를 제3자에게 판매하거나 제공하지 않습니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">5. 문의</h3>
        <p>개인정보 관련 문의는 GitHub 저장소 Issues를 통해 접수해 주세요.</p>
      </section>
    </>
  );
}
