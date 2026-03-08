import { useCallback, useState } from "react";

const MAX_SIZE_MB = 50;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;

type UploadZoneProps = {
  onFileSelect: (file: File) => void;
};

export function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((file: File): string | null => {
    if (file.type !== "application/pdf") {
      return "PDF 파일만 업로드할 수 있습니다.";
    }
    if (file.size > MAX_BYTES) {
      return `파일 크기는 ${MAX_SIZE_MB}MB 이하여야 합니다.`;
    }
    return null;
  }, []);

  const handleFile = useCallback(
    (file: File | null) => {
      setError(null);
      if (!file) return;
      const err = validate(file);
      if (err) {
        setError(err);
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect, validate]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      handleFile(file ?? null);
    },
    [handleFile]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      handleFile(file ?? null);
      e.target.value = "";
    },
    [handleFile]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`
          w-full max-w-xl rounded-2xl border-2 border-dashed transition-all duration-200
          flex flex-col items-center justify-center py-16 px-8 cursor-pointer
          bg-[var(--drop-zone-bg)] border-[var(--drop-zone-border)]
          hover:border-[var(--color-accent)] hover:bg-[var(--drop-zone-active)]
          ${isDragOver ? "border-[var(--color-accent)] bg-[var(--drop-zone-active)] scale-[1.02]" : ""}
        `}
        onClick={() => document.getElementById("pdf-file-input")?.click()}
      >
        <input
          id="pdf-file-input"
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={onInputChange}
        />
        <svg
          className="w-16 h-16 mb-4 text-[var(--color-muted)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-lg font-medium text-[var(--color-text)] mb-1">
          PDF를 여기에 놓거나 클릭하여 선택
        </p>
        <p className="text-sm text-[var(--color-muted)]">
          최대 {MAX_SIZE_MB}MB · .pdf만 지원
        </p>
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-500 font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
