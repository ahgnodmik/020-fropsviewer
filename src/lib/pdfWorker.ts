import { GlobalWorkerOptions } from "pdfjs-dist";

// Use Vite's BASE_URL so the path is correct in both dev (/) and production (/020-fropsviewer/)
GlobalWorkerOptions.workerSrc = `${import.meta.env.BASE_URL}pdf.worker.min.mjs`;
