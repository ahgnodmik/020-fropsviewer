import { useCallback, useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "../lib/pdfWorker";

type ViewMode = "page" | "scroll";

type PdfViewerProps = {
  file: File;
  onClose: () => void;
};

/* ────────────────────────────────────────────
   페이지 모드: 한 번에 한 페이지
──────────────────────────────────────────── */
function PageModeViewer({
  doc,
  numPages,
  scale,
}: {
  doc: pdfjsLib.PDFDocumentProxy;
  numPages: number;
  scale: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTask = useRef<pdfjsLib.RenderTask | null>(null);

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      renderTask.current?.cancel();
      const canvas = canvasRef.current;
      if (!canvas) return;
      try {
        const page = await doc.getPage(currentPage);
        if (cancelled) return;
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx || cancelled) return;
        const task = page.render({ canvasContext: ctx, canvas, viewport });
        renderTask.current = task;
        await task.promise;
      } catch {
        // cancelled or render error — ignore
      }
    };
    render();
    return () => { cancelled = true; };
  }, [doc, currentPage, scale]);

  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(numPages, p + 1));

  return (
    <>
      {/* 페이지 컨트롤 */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={goPrev}
          disabled={currentPage <= 1}
          className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] disabled:opacity-40 disabled:pointer-events-none transition-colors"
          title="Previous page"
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
          title="Next page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 캔버스 */}
      <div className="flex-1 min-h-0 overflow-auto flex items-start justify-center p-2 sm:p-4">
        <canvas ref={canvasRef} className="shadow-lg" />
      </div>
    </>
  );
}

/* ────────────────────────────────────────────
   스크롤 모드: 전체 페이지 연속 + 드래그 스크롤
──────────────────────────────────────────── */
function ScrollModeViewer({
  doc,
  numPages,
  scale,
}: {
  doc: pdfjsLib.PDFDocumentProxy;
  numPages: number;
  scale: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 드래그 스크롤
  const drag = useRef({ active: false, startX: 0, startY: 0, scrollX: 0, scrollY: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startY: e.clientY, scrollX: el.scrollLeft, scrollY: el.scrollTop };
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.active) return;
    const el = containerRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.scrollX - (e.clientX - drag.current.startX);
    el.scrollTop  = drag.current.scrollY - (e.clientY - drag.current.startY);
  };
  const onMouseUp = () => {
    drag.current.active = false;
    const el = containerRef.current;
    if (!el) return;
    el.style.cursor = "grab";
    el.style.userSelect = "";
  };

  // 각 페이지 캔버스 렌더
  const renderCanvas = useCallback(
    async (canvas: HTMLCanvasElement, pageNum: number) => {
      try {
        const page = await doc.getPage(pageNum);
        const viewport = page.getViewport({ scale });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        await page.render({ canvasContext: ctx, canvas, viewport }).promise;
      } catch {
        // ignore
      }
    },
    [doc, scale]
  );

  // IntersectionObserver로 현재 페이지 감지
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const canvases = container.querySelectorAll<HTMLCanvasElement>("canvas[data-page]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const p = Number((visible[0].target as HTMLElement).dataset.page);
          setCurrentPage(p);
        }
      },
      { root: container, threshold: 0.3 }
    );
    canvases.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [numPages, scale]);

  return (
    <>
      {/* 현재 페이지 표시 */}
      <div className="flex items-center justify-center min-w-[4.5rem]">
        <span className="text-sm tabular-nums text-[var(--color-text)]">
          {currentPage} / {numPages}
        </span>
      </div>

      {/* 연속 스크롤 영역 */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-auto flex flex-col items-center gap-4 p-2 sm:p-4"
        style={{ cursor: "grab" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
          <canvas
            key={pageNum}
            data-page={pageNum}
            className="shadow-lg flex-shrink-0"
            ref={(el) => { if (el) renderCanvas(el, pageNum); }}
          />
        ))}
      </div>
    </>
  );
}

/* ────────────────────────────────────────────
   메인 PdfViewer
──────────────────────────────────────────── */
export function PdfViewer({ file, onClose }: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("page");
  const docRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const [doc, setDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const load = async () => {
      try {
        const buf = await file.arrayBuffer();
        const loaded = await pdfjsLib.getDocument({ data: buf }).promise;
        if (cancelled) { loaded.destroy(); return; }
        docRef.current = loaded;
        setDoc(loaded);
        setNumPages(loaded.numPages);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load PDF");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
      docRef.current?.destroy();
      docRef.current = null;
      setDoc(null);
    };
  }, [file]);

  const zoomIn  = () => setScale((s) => Math.min(3, s + 0.25));
  const zoomOut = () => setScale((s) => Math.max(0.5, s - 0.25));

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--color-bg)] min-h-[200px]">
        <div className="text-[var(--color-muted)]">Loading PDF...</div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4 bg-[var(--color-bg)] min-h-[200px]">
        <p className="text-red-500">{error ?? "Failed to load PDF"}</p>
        <button onClick={onClose} className="px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white font-medium">Close</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-bg)]">
      {/* Toolbar */}
      <header className="flex-shrink-0 flex items-center justify-between gap-2 px-3 py-2 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        {/* 왼쪽: Close + 파일명 */}
        <div className="flex items-center gap-2 min-w-0">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] transition-colors flex-shrink-0" title="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-sm font-medium text-[var(--color-muted)] truncate max-w-[130px] sm:max-w-xs" title={file.name}>
            {file.name}
          </span>
        </div>

        {/* 가운데: 뷰 모드에 따른 컨트롤 (페이지 번호 등) */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* 보기 모드 전환 토글 */}
          <div className="flex items-center rounded-lg border border-[var(--color-border)] overflow-hidden">
            <button
              onClick={() => setViewMode("page")}
              title="Page view"
              className={`p-2 transition-colors ${viewMode === "page" ? "bg-[var(--color-accent)] text-white" : "hover:bg-[var(--drop-zone-bg)] text-[var(--color-muted)]"}`}
            >
              {/* 페이지 아이콘 */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("scroll")}
              title="Scroll view"
              className={`p-2 transition-colors ${viewMode === "scroll" ? "bg-[var(--color-accent)] text-white" : "hover:bg-[var(--drop-zone-bg)] text-[var(--color-muted)]"}`}
            >
              {/* 스크롤 아이콘 */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="w-px h-6 bg-[var(--color-border)]" />

          {/* Zoom out / 배율 / Zoom in */}
          <button onClick={zoomOut} className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] transition-colors" title="Zoom out">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="text-xs text-[var(--color-muted)] min-w-[2.5rem] text-center hidden sm:inline">
            {Math.round(scale * 100)}%
          </span>
          <button onClick={zoomIn} className="p-2 rounded-lg hover:bg-[var(--drop-zone-bg)] transition-colors" title="Zoom in">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </header>

      {/* 뷰어 본문 */}
      <div className="flex-1 min-h-0 flex flex-col">
        {viewMode === "page" ? (
          <PageModeViewer key={`page-${scale}`} doc={doc} numPages={numPages} scale={scale} />
        ) : (
          <ScrollModeViewer key={`scroll-${scale}`} doc={doc} numPages={numPages} scale={scale} />
        )}
      </div>
    </div>
  );
}
