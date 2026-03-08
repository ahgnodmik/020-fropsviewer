import { useCallback, useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "../lib/pdfWorker";

type PdfViewerProps = {
  file: File;
  onClose: () => void;
};

export function PdfViewer({ file, onClose }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const docRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const load = async () => {
      try {
        const buf = await file.arrayBuffer();
        const doc = await pdfjsLib.getDocument({ data: buf }).promise;
        if (cancelled) return;
        docRef.current = doc;
        setNumPages(doc.numPages);
        setCurrentPage(1);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "PDF 로드 실패");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
      docRef.current?.destroy();
      docRef.current = null;
    };
  }, [file]);

  const renderPage = useCallback(
    async (pageNum: number) => {
      const doc = docRef.current;
      const canvas = canvasRef.current;
      if (!doc || !canvas) return;
      try {
        const page = await doc.getPage(pageNum);
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        await page.render({
          canvasContext: ctx,
          canvas,
          viewport,
        }).promise;
      } catch {
        setError("페이지 렌더링 실패");
      }
    },
    [scale]
  );

  useEffect(() => {
    if (numPages === 0 || loading) return;
    renderPage(currentPage);
  }, [currentPage, numPages, loading, renderPage]);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(numPages, p + 1));
  const zoomIn = () => setScale((s) => Math.min(3, s + 0.25));
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.25));

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--color-bg)] min-h-[200px]">
        <div className="text-[var(--color-muted)]">PDF 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 bg-[var(--color-bg)] min-h-[200px]">
        <p className="text-red-500">{error}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium"
        >
          닫기
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-bg)]">
      {/* Toolbar */}
      <header className="flex-shrink-0 flex items-center justify-between gap-4 px-3 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] transition-colors"
            title="닫기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-sm font-medium text-[var(--color-muted)] truncate max-w-[180px] sm:max-w-xs" title={file.name}>
            {file.name}
          </span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={goPrev}
            disabled={currentPage <= 1}
            className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="이전 페이지"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm tabular-nums min-w-[4rem] text-center text-[var(--color-text)]">
            {currentPage} / {numPages}
          </span>
          <button
            onClick={goNext}
            disabled={currentPage >= numPages}
            className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
            title="다음 페이지"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="w-px h-6 bg-[var(--color-border)] hidden sm:block" />
          <button
            onClick={zoomOut}
            className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] transition-colors"
            title="축소"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="text-xs text-[var(--color-muted)] min-w-[2.5rem] text-center hidden sm:inline">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={zoomIn}
            className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] transition-colors"
            title="확대"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </header>
      {/* Canvas area (뷰어 영역 내 광고 없음) */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-auto flex items-start justify-center p-2 sm:p-4"
      >
        <canvas ref={canvasRef} className="shadow-lg" />
      </div>
    </div>
  );
}
