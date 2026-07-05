"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import JSZip from "jszip";

// -- Types --

type FileStatus = "ready" | "converting" | "done" | "failed";
type TabId = "convert" | "compress";

interface QueueItem {
  id: string;
  file: File;
  target: string;
  status: FileStatus;
  error?: string;
  resultBlob?: Blob;
}

interface CompressItem {
  id: string;
  file: File;
  quality: number;
  status: FileStatus;
  error?: string;
  originalSize?: number;
  compressedSize?: number;
  resultBlob?: Blob;
}


// -- Helpers --

const DOC_EXTENSIONS = new Set(["doc", "docx"]);
const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

function ext(name: string): string {
  return name.split(".").pop()?.toLowerCase() || "";
}

function isDoc(f: File): boolean {
  return DOC_EXTENSIONS.has(ext(f.name));
}

function isCompressible(f: File): boolean {
  return IMAGE_EXTENSIONS.has(ext(f.name));
}

function defaultTarget(f: File): string {
  if (isDoc(f)) return "pdf";
  return "png";
}

function targetOpts(f: File): string[] {
  if (isDoc(f)) return ["pdf"];
  return ["png", "jpg", "webp"];
}

function fmtSize(bytes: number): string {
  if (bytes === 0) return "0 KB";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

function pctSaved(orig: number, comp: number): string {
  return `${((1 - comp / orig) * 100).toFixed(1)}% smaller`;
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// -- Icons --

function UploadIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#012AFF]">
      <rect x="8" y="8" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" />
      <path d="M24 28V18m0 0l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 30h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-neutral-400">
      <rect x="6" y="8" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 24l6-5 4 3 6-5 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#012AFF]">
      <path d="M12 6h8l8 8v16a2 2 0 01-2 2H12a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.06" />
      <path d="M20 6v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 20h8M14 24h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 4l9 5-9 5V4z" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v8m0 0L4 6m3 3l3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RetryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 9a6 6 0 0111.2-3M15 9a6 6 0 01-11.2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 3v3h-3M4 15v-3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// -- Main --

export default function Home() {
  const [tab, setTab] = useState<TabId>("convert");

  // Convert state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const convertingRef = useRef(false);

  // Compress state
  const [compressQueue, setCompressQueue] = useState<CompressItem[]>([]);
  const compressingRef = useRef(false);

  // -- Convert --

  const addConvertFiles = useCallback((files: FileList) => {
    setQueue((prev) => [
      ...prev,
      ...Array.from(files).map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        target: defaultTarget(f),
        status: "ready" as FileStatus,
      })),
    ]);
  }, []);

  const updateQ = useCallback((id: string, patch: Partial<QueueItem>) => {
    setQueue((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const removeQ = useCallback((id: string) => {
    setQueue((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const convertOne = useCallback(
    async (item: QueueItem) => {
      updateQ(item.id, { status: "converting", error: undefined });
      const form = new FormData();
      form.append("file", item.file);
      form.append("target", item.target);
      try {
        const res = await fetch("/api/convert", { method: "POST", body: form });
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
          updateQ(item.id, { status: "failed", error: body.error || `HTTP ${res.status}` });
          return;
        }
        const blob = await res.blob();
        updateQ(item.id, { status: "done", resultBlob: blob });
      } catch (err) {
        updateQ(item.id, { status: "failed", error: err instanceof Error ? err.message : "Network error" });
      }
    },
    [updateQ]
  );

  const convertAll = useCallback(async () => {
    if (convertingRef.current) return;
    convertingRef.current = true;
    const ready = queue.filter((i) => i.status === "ready");
    for (const item of ready) await convertOne(item);
    convertingRef.current = false;
  }, [queue, convertOne]);

  // -- Compress --

  const addCompressFiles = useCallback((files: FileList) => {
    const items = Array.from(files)
      .filter(isCompressible)
      .map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        quality: 80,
        status: "ready" as FileStatus,
      }));
    if (items.length) setCompressQueue((prev) => [...prev, ...items]);
  }, []);

  const updateC = useCallback((id: string, patch: Partial<CompressItem>) => {
    setCompressQueue((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const removeC = useCallback((id: string) => {
    setCompressQueue((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const compressOne = useCallback(
    async (item: CompressItem) => {
      updateC(item.id, { status: "converting", error: undefined });
      const form = new FormData();
      form.append("file", item.file);
      form.append("quality", item.quality.toString());
      try {
        const res = await fetch("/api/compress", { method: "POST", body: form });
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
          updateC(item.id, { status: "failed", error: body.error || `HTTP ${res.status}` });
          return;
        }
        const origSize = parseInt(res.headers.get("X-Original-Size") || "0", 10);
        const compSize = parseInt(res.headers.get("X-Compressed-Size") || "0", 10);
        const blob = await res.blob();
        updateC(item.id, { status: "done", originalSize: origSize, compressedSize: compSize, resultBlob: blob });
      } catch (err) {
        updateC(item.id, { status: "failed", error: err instanceof Error ? err.message : "Network error" });
      }
    },
    [updateC]
  );

  const compressAll = useCallback(async () => {
    if (compressingRef.current) return;
    compressingRef.current = true;
    const ready = compressQueue.filter((i) => i.status === "ready");
    for (const item of ready) await compressOne(item);
    compressingRef.current = false;
  }, [compressQueue, compressOne]);

  // -- Render --

  const hasConvertReady = queue.some((i) => i.status === "ready");
  const hasCompressReady = compressQueue.some((i) => i.status === "ready");
  const doneConverts = queue.filter((i) => i.status === "done" && i.resultBlob);
  const doneCompresses = compressQueue.filter((i) => i.status === "done" && i.resultBlob);

  // ponytail: zip in chunks of 20 to avoid OOM on large batches (80 PNGs = 300MB+).
  // STORE compression since PNGs/JPGs are already compressed.
  const CHUNK_SIZE = 20;

  const zipAndDownload = useCallback(
    async (items: { blob: Blob; name: string }[], zipName: string) => {
      if (items.length === 1) {
        triggerDownload(items[0].blob, items[0].name);
        return;
      }

      const chunks: { blob: Blob; name: string }[][] = [];
      for (let i = 0; i < items.length; i += CHUNK_SIZE) {
        chunks.push(items.slice(i, i + CHUNK_SIZE));
      }

      for (let ci = 0; ci < chunks.length; ci++) {
        const zip = new JSZip();
        for (const item of chunks[ci]) {
          const buf = await item.blob.arrayBuffer();
          zip.file(item.name, buf, { compression: "STORE" });
        }
        const blob = await zip.generateAsync({ type: "blob", compression: "STORE" });
        const name = chunks.length === 1
          ? zipName
          : zipName.replace(".zip", `-part${ci + 1}.zip`);
        triggerDownload(blob, name);
        // Small delay between downloads so browser doesn't block multiple saves
        if (ci < chunks.length - 1) await new Promise((r) => setTimeout(r, 500));
      }
    },
    []
  );

  const downloadAllConverted = useCallback(async () => {
    const items = doneConverts.map((item) => {
      const baseName = item.file.name.replace(/\.[^.]+$/, "") || "converted";
      return { blob: item.resultBlob!, name: `${baseName}.${item.target}` };
    });
    await zipAndDownload(items, "swiftconvert-files.zip");
  }, [doneConverts, zipAndDownload]);

  const downloadAllCompressed = useCallback(async () => {
    const items = doneCompresses.map((item) => {
      const baseName = item.file.name.replace(/\.[^.]+$/, "") || "compressed";
      return { blob: item.resultBlob!, name: `${baseName}-compressed.${ext(item.file.name)}` };
    });
    await zipAndDownload(items, "swiftconvert-compressed.zip");
  }, [doneCompresses, zipAndDownload]);

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <h1 className="text-3xl font-bold tracking-tight mb-1">Swift<span className="text-[#012AFF]">Convert</span></h1>
        <p className="text-neutral-500 mb-8">
          Batch process images and documents with high-performance engines.
        </p>

        {/* Tabs */}
        <div className="inline-flex bg-neutral-100 rounded-xl p-1 mb-8">
          {(["convert", "compress"] as TabId[]).map((t) => {
            const labels: Record<TabId, { icon: React.ReactNode; label: string }> = {
              convert: {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8h12"/><path d="M12 4l4 4-4 4"/>
                    <path d="M20 16H8"/><path d="M12 12l-4 4 4 4"/>
                  </svg>
                ),
                label: "Convert",
              },
              compress: {
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v4m0 14v-4M3 12h4m14 0h-4"/>
                    <rect x="8" y="8" width="8" height="8" rx="1"/>
                  </svg>
                ),
                label: "Compress",
              },
            };
            const { icon, label } = labels[t];
            return (
              <button
                key={t}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF] focus-visible:ring-offset-2 ${
                  tab === t
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
                onClick={() => setTab(t)}
              >
                {icon}
                {label}
              </button>
            );
          })}
        </div>

        {/* CONVERT TAB */}
        {tab === "convert" && (
          <>
            <DropZone
              onFiles={addConvertFiles}
              accept="image/*,.heic,.heif,.doc,.docx"
              hint="Supports HEIC, JPG, PNG, WEBP, DOCX (Max 50MB/file)"
            />

            {queue.length > 0 && (
              <div className="mt-10">
                {/* Queue header */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Conversion Queue ({queue.length})
                  </h2>
                  <div className="flex gap-2">
                    <button
                      className="text-xs font-semibold uppercase tracking-wide px-4 py-2 border border-neutral-300 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]"
                      onClick={() => { convertingRef.current = false; setQueue([]); }}
                    >
                      Clear all
                    </button>
                    {doneConverts.length > 0 && (
                      <button
                        className="text-xs font-semibold uppercase tracking-wide px-4 py-2 border border-[#012AFF] text-[#012AFF] rounded-lg hover:bg-[#012AFF]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF] flex items-center gap-1.5"
                        onClick={downloadAllConverted}
                      >
                        <DownloadIcon />
                        Download all
                      </button>
                    )}
                    {hasConvertReady && (
                      <button
                        className="text-xs font-semibold uppercase tracking-wide px-4 py-2 bg-[#012AFF] text-white rounded-lg hover:bg-[#0022cc] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF] focus-visible:ring-offset-2"
                        onClick={convertAll}
                      >
                        Convert all
                      </button>
                    )}
                  </div>
                </div>

                {/* File rows */}
                <div className="space-y-2">
                  {queue.map((item) => {
                    const isDocFile = isDoc(item.file);
                    const rowBorder =
                      item.status === "converting"
                        ? "border-[#012AFF] bg-[#012AFF]/[0.02]"
                        : item.status === "failed"
                        ? "border-red-200 bg-red-50/50"
                        : item.status === "done"
                        ? "border-neutral-200"
                        : "border-neutral-200";

                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-4 border rounded-xl px-5 py-4 transition-colors ${rowBorder}`}
                      >
                        {/* File icon */}
                        <div className="shrink-0">
                          {isDocFile ? <DocIcon /> : <ImageIcon />}
                        </div>

                        {/* File info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm font-medium truncate" title={item.file.name}>
                            {item.file.name}
                          </div>
                          <div className="font-mono text-xs text-neutral-400 mt-0.5">
                            {fmtSize(item.file.size)}
                          </div>
                        </div>

                        {/* Target format / label */}
                        <div className="shrink-0 w-32">
                          {item.status === "done" ? (
                            <span className="text-sm text-neutral-400">
                              Converted to {item.target.toUpperCase()}
                            </span>
                          ) : (
                            <select
                              className="w-full text-sm border border-neutral-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]"
                              value={item.target}
                              disabled={item.status !== "ready"}
                              onChange={(e) => updateQ(item.id, { target: e.target.value })}
                              aria-label={`Target format for ${item.file.name}`}
                            >
                              {targetOpts(item.file).map((o) => (
                                <option key={o} value={o}>to {o.toUpperCase()}</option>
                              ))}
                            </select>
                          )}
                        </div>

                        {/* Status badge */}
                        <div className="shrink-0 w-36">
                          {item.status === "ready" && (
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500">
                              <span className="w-2 h-2 rounded-full bg-neutral-400" />
                              READY
                            </span>
                          )}
                          {item.status === "converting" && (
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#012AFF]">
                              <Spinner />
                              CONVERTING
                            </span>
                          )}
                          {item.status === "done" && (
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="7" fill="#16a34a" />
                                <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              DONE
                            </span>
                          )}
                          {item.status === "failed" && (
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600" title={item.error}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <circle cx="8" cy="8" r="7" fill="#dc2626" />
                                <path d="M8 5v3M8 10.5v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                              {item.error && item.error.length > 12 ? "FAILED" : (item.error?.toUpperCase() || "FAILED")}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="shrink-0 flex items-center gap-1">
                          {item.status === "ready" && (
                            <>
                              <button
                                onClick={() => convertOne(item)}
                                className="p-2 text-[#012AFF] hover:bg-[#012AFF]/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]"
                                aria-label="Convert"
                                title="Convert"
                              >
                                <PlayIcon />
                              </button>
                              <button
                                onClick={() => removeQ(item.id)}
                                className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]"
                                aria-label="Remove"
                                title="Remove"
                              >
                                <XIcon />
                              </button>
                            </>
                          )}
                          {item.status === "done" && item.resultBlob && (
                            <button
                              onClick={() => {
                                const baseName = item.file.name.replace(/\.[^.]+$/, "") || "converted";
                                triggerDownload(item.resultBlob!, `${baseName}.${item.target}`);
                              }}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-[#012AFF] text-[#012AFF] rounded-lg hover:bg-[#012AFF]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]"
                            >
                              <DownloadIcon />
                              DOWNLOAD
                            </button>
                          )}
                          {item.status === "failed" && (
                            <>
                              <button
                                onClick={() => convertOne({ ...item, status: "ready" })}
                                className="p-2 text-neutral-400 hover:text-[#012AFF] hover:bg-[#012AFF]/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]"
                                aria-label="Retry"
                                title="Retry"
                              >
                                <RetryIcon />
                              </button>
                              <button
                                onClick={() => removeQ(item.id)}
                                className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]"
                                aria-label="Remove"
                                title="Remove"
                              >
                                <XIcon />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* COMPRESS TAB */}
        {tab === "compress" && (
          <>
            <DropZone
              onFiles={addCompressFiles}
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              hint="Supports JPG, PNG, WEBP (Max 50MB/file)"
            />

            {compressQueue.length > 0 && (
              <div className="mt-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Compression Queue ({compressQueue.length})
                  </h2>
                  <div className="flex gap-2">
                    <button
                      className="text-xs font-semibold uppercase tracking-wide px-4 py-2 border border-neutral-300 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]"
                      onClick={() => { compressingRef.current = false; setCompressQueue([]); }}
                    >
                      Clear all
                    </button>
                    {doneCompresses.length > 0 && (
                      <button
                        className="text-xs font-semibold uppercase tracking-wide px-4 py-2 border border-[#012AFF] text-[#012AFF] rounded-lg hover:bg-[#012AFF]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF] flex items-center gap-1.5"
                        onClick={downloadAllCompressed}
                      >
                        <DownloadIcon />
                        Download all
                      </button>
                    )}
                    {hasCompressReady && (
                      <button
                        className="text-xs font-semibold uppercase tracking-wide px-4 py-2 bg-[#012AFF] text-white rounded-lg hover:bg-[#0022cc] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF] focus-visible:ring-offset-2"
                        onClick={compressAll}
                      >
                        Compress all
                      </button>
                    )}
                  </div>
                </div>

                {/* Global quality slider */}
                {hasCompressReady && compressQueue.length > 1 && (
                  <GlobalQualitySlider
                    onApply={(q) => {
                      setCompressQueue((prev) =>
                        prev.map((i) => i.status === "ready" ? { ...i, quality: q } : i)
                      );
                    }}
                  />
                )}

                <div className="space-y-3">
                  {compressQueue.map((item) => (
                    <CompressCard
                      key={item.id}
                      item={item}
                      onQualityChange={(q) => updateC(item.id, { quality: q })}
                      onCompress={() => compressOne(item)}
                      onRetry={() => compressOne({ ...item, status: "ready" })}
                      onRemove={() => removeC(item.id)}
                      onDownload={() => {
                        if (!item.resultBlob) return;
                        const baseName = item.file.name.replace(/\.[^.]+$/, "") || "compressed";
                        triggerDownload(item.resultBlob!, `${baseName}-compressed.${ext(item.file.name)}`);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>

      {/* Features */}
      <section id="features" className="w-full max-w-3xl mt-20">
        <h2 className="text-xl font-bold tracking-tight mb-6">What you can do</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "Convert",
              desc: "HEIC, JPG, PNG, WEBP, DOC, DOCX. Batch convert with format selection per file.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#012AFF]">
                  <path d="M4 12h12m0 0l-4-4m4 4l-4 4M20 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
            },
            {
              title: "Compress",
              desc: "Reduce file size with live preview. Adjust quality per file or globally.",
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#012AFF]">
                  <path d="M9 4v16M15 4v16M4 9h16M4 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
            },
          ].map((f) => (
            <div key={f.title} className="border border-neutral-200 rounded-xl p-5 bg-white">
              <div className="mb-3">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-3xl mt-16">
        <h2 className="text-xl font-bold tracking-tight mb-6">How it works</h2>
        <div className="flex flex-col sm:flex-row gap-6">
          {[
            { step: "1", title: "Upload", desc: "Drop files or click to browse. Supports batch upload." },
            { step: "2", title: "Configure", desc: "Pick target format or adjust compression quality." },
            { step: "3", title: "Download", desc: "Get your files instantly. Batch download as ZIP." },
          ].map((s) => (
            <div key={s.step} className="flex-1 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#012AFF] text-white text-sm font-bold flex items-center justify-center shrink-0">
                {s.step}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{s.title}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full max-w-3xl mt-16 mb-8">
        <h2 className="text-xl font-bold tracking-tight mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "Is SwiftConvert really free?",
              a: "Yes, 100% free with no limits. No signup, no watermarks, no daily caps. Convert as many files as you want.",
            },
            {
              q: "Are my files safe?",
              a: "Your files are processed in server memory and immediately discarded. Nothing is stored, logged, or shared. Check our Privacy Policy for details.",
            },
            {
              q: "What file formats are supported?",
              a: "Convert: HEIC, HEIF, JPG, PNG, WEBP, DOC, DOCX. Compress: JPG, PNG, WEBP. Maximum file size is 50MB per file.",
            },
            {
              q: "Can I process multiple files at once?",
              a: "Yes. Upload as many files as you need. They process sequentially and you can download them individually or all at once as a ZIP file.",
            },
            {
              q: "Why is the converted PNG larger than my HEIC?",
              a: "HEIC uses lossy compression (like JPEG) while PNG is lossless. The quality is preserved perfectly, but lossless formats produce larger files. Try WEBP for a good balance of quality and size.",
            },
          ].map((item) => (
            <details key={item.q} className="border border-neutral-200 rounded-xl bg-white group">
              <summary className="px-5 py-4 text-sm font-semibold cursor-pointer list-none flex items-center justify-between hover:text-[#012AFF] transition-colors">
                {item.q}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-neutral-400 group-open:rotate-180 transition-transform">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-neutral-500 leading-relaxed">{item.a}</div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

// -- Compress card with live preview --

function CompressCard({
  item,
  onQualityChange,
  onCompress,
  onRetry,
  onRemove,
  onDownload,
}: {
  item: CompressItem;
  onQualityChange: (q: number) => void;
  onCompress: () => void;
  onRetry: () => void;
  onRemove: () => void;
  onDownload: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [estimatedSize, setEstimatedSize] = useState<number | null>(null);
  const [originalUrl] = useState(() => URL.createObjectURL(item.file));

  // Single effect: load image, estimate on quality change
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    let cancelled = false;

    img.onload = () => {
      if (cancelled) return;

      // Use full resolution for accurate size estimate
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      // PNG quality slider doesn't do much natively -- estimate as JPEG
      // since that reflects actual compression savings the server achieves
      const isPng = item.file.type === "image/png";
      const outputMime = isPng ? "image/jpeg" : (item.file.type === "image/webp" ? "image/webp" : "image/jpeg");

      canvas.toBlob(
        (blob) => {
          if (cancelled || !blob) return;
          setEstimatedSize(blob.size);

          // For visual preview, use a smaller canvas
          const previewCanvas = document.createElement("canvas");
          const pScale = Math.min(1, 400 / img.naturalWidth);
          previewCanvas.width = img.naturalWidth * pScale;
          previewCanvas.height = img.naturalHeight * pScale;
          const pCtx = previewCanvas.getContext("2d");
          if (!pCtx) return;
          pCtx.drawImage(img, 0, 0, previewCanvas.width, previewCanvas.height);

          previewCanvas.toBlob(
            (pBlob) => {
              if (cancelled || !pBlob) return;
              const url = URL.createObjectURL(pBlob);
              setPreviewUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return url;
              });
            },
            outputMime,
            item.quality / 100
          );
        },
        outputMime,
        item.quality / 100
      );
    };
    img.src = originalUrl;

    return () => { cancelled = true; };
  }, [originalUrl, item.quality, item.file.type]);

  const rowBorder =
    item.status === "converting"
      ? "border-[#012AFF] bg-[#012AFF]/[0.02]"
      : item.status === "failed"
      ? "border-red-200 bg-red-50/50"
      : "border-neutral-200";

  const showPreview = item.status === "ready" && (previewUrl || originalUrl);

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${rowBorder}`}>
      {/* Top row: file info + controls */}
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="shrink-0"><ImageIcon /></div>

        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-medium truncate" title={item.file.name}>
            {item.file.name}
          </div>
          <div className="font-mono text-xs text-neutral-400 mt-0.5">
            {fmtSize(item.file.size)}
            {item.status === "done" && item.compressedSize !== undefined && item.originalSize !== undefined && (
              <span className="text-green-600 ml-2">
                {fmtSize(item.compressedSize)} ({pctSaved(item.originalSize, item.compressedSize)})
              </span>
            )}
          </div>
        </div>

        {/* Quality slider */}
        <div className="shrink-0 flex items-center gap-2 w-36">
          {item.status === "done" ? (
            <span className="text-sm text-neutral-400">Quality {item.quality}%</span>
          ) : (
            <>
              <span className="text-xs font-mono text-neutral-500 w-8 text-right">{item.quality}%</span>
              <input
                type="range"
                min="1"
                max="100"
                value={item.quality}
                disabled={item.status !== "ready"}
                onChange={(e) => onQualityChange(parseInt(e.target.value, 10))}
                className="w-20 accent-[#012AFF]"
                aria-label={`Quality for ${item.file.name}`}
              />
            </>
          )}
        </div>

        {/* Status */}
        <div className="shrink-0 w-36">
          {item.status === "ready" && estimatedSize !== null && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500">
              ~{fmtSize(estimatedSize)}
            </span>
          )}
          {item.status === "converting" && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#012AFF]">
              <Spinner /> COMPRESSING
            </span>
          )}
          {item.status === "done" && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#16a34a" />
                <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              DONE
            </span>
          )}
          {item.status === "failed" && (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600" title={item.error}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#dc2626" />
                <path d="M8 5v3M8 10.5v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              FAILED
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="shrink-0 flex items-center gap-1">
          {item.status === "ready" && (
            <>
              <button onClick={onCompress} className="p-2 text-[#012AFF] hover:bg-[#012AFF]/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]" aria-label="Compress" title="Compress">
                <PlayIcon />
              </button>
              <button onClick={onRemove} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]" aria-label="Remove" title="Remove">
                <XIcon />
              </button>
            </>
          )}
          {item.status === "done" && item.resultBlob && (
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-[#012AFF] text-[#012AFF] rounded-lg hover:bg-[#012AFF]/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]"
            >
              <DownloadIcon />
              DOWNLOAD
            </button>
          )}
          {item.status === "failed" && (
            <>
              <button onClick={onRetry} className="p-2 text-neutral-400 hover:text-[#012AFF] hover:bg-[#012AFF]/10 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]" aria-label="Retry" title="Retry">
                <RetryIcon />
              </button>
              <button onClick={onRemove} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#012AFF]" aria-label="Remove" title="Remove">
                <XIcon />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Preview panel */}
      {showPreview && (
        <div className="border-t border-neutral-100 bg-neutral-50/50 px-5 py-4">
          <div className="flex gap-4 items-start">
            {/* Original */}
            <div className="flex-1 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">Original</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Original"
                className="max-h-40 mx-auto rounded border border-neutral-200 object-contain"
              />
              <div className="font-mono text-xs text-neutral-500 mt-1.5">{fmtSize(item.file.size)}</div>
            </div>

            {/* Arrow */}
            <div className="shrink-0 self-center text-neutral-300 pt-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Preview */}
            <div className="flex-1 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">Preview at {item.quality}%</div>
              {previewUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-40 mx-auto rounded border border-neutral-200 object-contain"
                />
              )}
              <div className="font-mono text-xs mt-1.5">
                {estimatedSize !== null && (
                  <>
                    <span className="text-neutral-500">~{fmtSize(estimatedSize)}</span>
                    {estimatedSize < item.file.size && (
                      <span className="text-green-600 ml-1.5">({pctSaved(item.file.size, estimatedSize)})</span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// -- Drop zone component --

function DropZone({
  onFiles,
  accept,
  hint,
}: {
  onFiles: (files: FileList) => void;
  accept: string;
  hint: string;
}) {
  const [dragOver, setDragOver] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  return (
    <div
      className={`relative w-full border-2 border-dashed rounded-2xl py-16 px-8 text-center transition-colors cursor-pointer focus-within:ring-2 focus-within:ring-[#012AFF] focus-within:ring-offset-2 ${
        dragOver
          ? "border-[#012AFF] bg-[#012AFF]/5"
          : "border-neutral-300 hover:border-neutral-400 bg-neutral-50/50"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
      }}
    >
      <div className="flex flex-col items-center gap-4 pointer-events-none">
        <UploadIcon />
        <div>
          <span className="text-neutral-700 font-medium">Drop files here or </span>
          <span className="text-[#012AFF] font-semibold">click to browse</span>
        </div>
        <div className="font-mono text-xs text-neutral-400">{hint}</div>
      </div>
      <input
        key={inputKey}
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        multiple
        accept={accept}
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files);
          setInputKey((k) => k + 1);
        }}
      />
    </div>
  );
}

function GlobalQualitySlider({ onApply }: { onApply: (q: number) => void }) {
  const [value, setValue] = useState(80);

  return (
    <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-3 mb-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 shrink-0">
        Set all quality
      </span>
      <input
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={(e) => {
          const q = parseInt(e.target.value, 10);
          setValue(q);
          onApply(q);
        }}
        className="flex-1 accent-[#012AFF]"
        aria-label="Set quality for all files"
      />
      <span className="font-mono text-sm text-neutral-600 w-10 text-right">{value}%</span>
    </div>
  );
}
