export function DataPolicy() {
  return (
    <>
      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">1. 파일 처리 방식</h3>
        <p>업로드된 PDF 파일은 브라우저의 메모리(RAM)에만 로드됩니다. 디스크, 서버, 클라우드 어디에도 저장되지 않습니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">2. 자동 삭제 시점</h3>
        <p>아래 상황에서 파일이 자동으로 메모리에서 삭제됩니다.</p>
        <ul className="list-disc list-inside space-y-1 mt-1">
          <li>탭 또는 브라우저 창을 닫을 때</li>
          <li>다른 페이지로 이동할 때</li>
          <li>뷰어에서 × 버튼으로 파일을 닫을 때</li>
          <li>새 파일을 업로드할 때 (기존 파일 교체)</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">3. 세션 스토리지</h3>
        <p><code className="bg-[var(--drop-zone-bg)] px-1 rounded text-xs">sessionStorage</code>에는 안내 팝업 확인 여부만 저장됩니다. 탭을 닫으면 이 정보도 함께 삭제됩니다. 파일 내용은 절대 저장되지 않습니다.</p>
      </section>

      <section>
        <h3 className="font-semibold text-[var(--color-text)] mb-1">4. 보안 권고</h3>
        <p>공용 PC나 공유 브라우저에서 민감한 PDF를 열람한 후에는 탭을 반드시 닫아 주세요. 본 서비스는 파일을 저장하지 않지만, 브라우저 캐시나 화면 캡처에 의한 노출은 사용자 책임입니다.</p>
      </section>
    </>
  );
}
