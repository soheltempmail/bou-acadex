"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";

interface PdfReaderProps {
  src: string;
  title: string;
}

type PdfJsModule = typeof import("pdfjs-dist");

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.2;

export function PdfReader({ src, title }: PdfReaderProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const documentRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [focusMode, setFocusMode] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    let loadingTask: PDFDocumentLoadingTask | null = null;

    async function load() {
      setStatus("loading");
      setError(null);
      setPageNum(1);
      setPageCount(0);
      setZoom(1);

      try {
        const pdfjs = (await import("pdfjs-dist/legacy/build/pdf.mjs")) as unknown as PdfJsModule;
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const response = await fetch(src, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`PDF ফাইল লোড করা যায়নি (${response.status})`);
        }

        const data = new Uint8Array(await response.arrayBuffer());
        if (cancelled) return;

        loadingTask = pdfjs.getDocument({
          data,
          cMapUrl: "/pdfjs/cmaps/",
          cMapPacked: true,
          standardFontDataUrl: "/pdfjs/standard_fonts/",
        });
        const pdfDocument = await loadingTask.promise;

        if (cancelled) {
          if (loadingTask) void loadingTask.destroy().catch(() => undefined);
          return;
        }

        documentRef.current = pdfDocument;
        setPageCount(pdfDocument.numPages);
        setStatus("ready");
      } catch (loadError) {
        if (!cancelled && (loadError as { name?: string }).name !== "AbortError") {
          setError(loadError instanceof Error ? loadError.message : "PDF লোড করা যায়নি");
          setStatus("error");
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
      controller.abort();
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;

      const pdfDocument = documentRef.current;
      documentRef.current = null;
      if (pdfDocument) void pdfDocument.cleanup().catch(() => undefined);
      if (loadingTask) void loadingTask.destroy().catch(() => undefined);
    };
  }, [src]);

  useEffect(() => {
    if (!focusMode) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [focusMode]);

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFocusMode(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    if (status !== "ready") return;

    const pdfDocument = documentRef.current;
    const canvas = canvasRef.current;
    const scroll = scrollRef.current;
    if (!pdfDocument || !canvas || !scroll) return;

    let cancelled = false;

    async function renderPage() {
      if (!pdfDocument || !canvas || !scroll) return;

      try {
        const page = await pdfDocument.getPage(pageNum);
        if (cancelled) return;

        const availableWidth = Math.max(240, scroll.clientWidth - 24);
        const baseViewport = page.getViewport({ scale: 1 });
        const fitScale = availableWidth / baseViewport.width;
        const viewport = page.getViewport({ scale: fitScale * zoom });
        const ratio = window.devicePixelRatio || 1;

        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const context = canvas.getContext("2d");
        if (!context) return;

        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        const task = page.render({ canvasContext: context, canvas, viewport });
        renderTaskRef.current = task;
        await task.promise;
        renderTaskRef.current = null;
      } catch (renderError) {
        if (!cancelled && (renderError as { name?: string }).name !== "RenderingCancelledException") {
          setError(renderError instanceof Error ? renderError.message : "পৃষ্ঠা রেন্ডার করা যায়নি");
        }
      }
    }

    void renderPage();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
    };
  }, [pageNum, zoom, focusMode, status]);

  const goToPage = (nextPage: number) => {
    setPageNum(nextPage);
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeZoom = (nextZoom: number) => {
    setZoom(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(nextZoom.toFixed(2)))));
  };

  const toggleFullscreen = async () => {
    const shell = shellRef.current;
    if (!shell) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      if (shell.requestFullscreen) {
        await shell.requestFullscreen();
        setFocusMode(true);
        return;
      }
    } catch {
      /* fall back to CSS focus mode below */
    }
    setFocusMode((current) => !current);
  };

  return (
    <div
      ref={shellRef}
      className={`pdf-reader${focusMode ? " pdf-reader-focus" : ""}`}
      id="pdfReaderShell"
    >
      <div className="pdf-reader-toolbar">
        <span className="pdf-reader-title" title={title}>
          {title}
        </span>

        {status === "ready" ? (
          <div className="pdf-reader-controls">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => goToPage(Math.max(1, pageNum - 1))}
              disabled={pageNum <= 1}
              aria-label="আগের পৃষ্ঠা"
            >
              ◀
            </button>
            <span className="pdf-reader-page-info">
              {pageNum} / {pageCount}
            </span>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => goToPage(Math.min(pageCount, pageNum + 1))}
              disabled={pageNum >= pageCount}
              aria-label="পরের পৃষ্ঠা"
            >
              ▶
            </button>

            <span className="pdf-reader-divider" aria-hidden="true" />

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => changeZoom(zoom - ZOOM_STEP)}
              disabled={zoom <= MIN_ZOOM}
              aria-label="জুম কমান"
            >
              −
            </button>
            <span className="pdf-reader-zoom">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => changeZoom(zoom + ZOOM_STEP)}
              disabled={zoom >= MAX_ZOOM}
              aria-label="জুম বাড়ান"
            >
              +
            </button>

            <span className="pdf-reader-divider" aria-hidden="true" />

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={toggleFullscreen}
              aria-label={focusMode ? "ফোকাস মোড বন্ধ করুন" : "সম্পূর্ণ স্ক্রিনে পড়ুন"}
              title={focusMode ? "ফোকাস মোড বন্ধ করুন" : "সম্পূর্ণ স্ক্রিনে পড়ুন"}
            >
              {focusMode ? "✕ বের হুন" : "⛶ সম্পূর্ণ স্ক্রিন"}
            </button>
          </div>
        ) : null}
      </div>

      {status === "loading" ? <div className="pdf-reader-state">PDF লোড হচ্ছে…</div> : null}
      {status === "error" ? (
        <div className="pdf-reader-state pdf-reader-error">PDF লোড করা যায়নি: {error}</div>
      ) : null}

      {status === "ready" ? (
        <div className="pdf-reader-scroll" ref={scrollRef}>
          <div className="pdf-reader-page">
            <canvas
              ref={canvasRef}
              className="pdf-reader-canvas"
              aria-label={`${title} — পৃষ্ঠা ${pageNum}`}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
