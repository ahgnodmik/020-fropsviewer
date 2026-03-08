export function HowToUse() {
  return (
    <>
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
