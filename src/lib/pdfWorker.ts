import { GlobalWorkerOptions } from "pdfjs-dist";

// Worker from public folder so it's served as static asset
const origin =
  typeof window !== "undefined" ? window.location.origin : "";
GlobalWorkerOptions.workerSrc = `${origin}/pdf.worker.min.mjs`;
