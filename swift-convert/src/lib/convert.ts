import { execFile, execSync } from "node:child_process";
import { accessSync, constants } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import sharp from "sharp";

// heic-convert ships as CJS with no types
// eslint-disable-next-line @typescript-eslint/no-require-imports
const heicConvert = require("heic-convert");

export type ImageFormat = "png" | "jpg" | "webp";
export type TargetFormat = ImageFormat | "pdf";

export type SourceMime =
  | "image/heic"
  | "image/heif"
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const SHARP_FORMAT_MAP: Record<ImageFormat, string> = {
  png: "png",
  jpg: "jpeg",
  webp: "webp",
};

const CONTENT_TYPE_MAP: Record<TargetFormat, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  webp: "image/webp",
  pdf: "application/pdf",
};

export function contentTypeFor(format: TargetFormat): string {
  return CONTENT_TYPE_MAP[format];
}

export function isHeic(mime: string): boolean {
  return mime === "image/heic" || mime === "image/heif";
}

export function isImage(mime: string): boolean {
  return (
    mime === "image/jpeg" ||
    mime === "image/png" ||
    mime === "image/webp"
  );
}

export function isDoc(mime: string): boolean {
  return (
    mime === "application/msword" ||
    mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
}

export function validTarget(mime: string, target: string): target is TargetFormat {
  if (isHeic(mime) || isImage(mime)) {
    return target === "png" || target === "jpg" || target === "webp";
  }
  if (isDoc(mime)) {
    return target === "pdf";
  }
  return false;
}

// Convert HEIC/HEIF buffer to target image format
// Strategy: always decode to JPEG first (fastest path in heic-convert),
// then let sharp handle the final format conversion.
async function convertHeic(input: Buffer, target: ImageFormat): Promise<Buffer> {
  const raw = await heicConvert({
    buffer: input,
    format: "JPEG",
    quality: 1,
  });

  const buf = Buffer.from(raw);

  // sharp handles the final format (even jpg->jpg is near-instant)
  const fmt = SHARP_FORMAT_MAP[target];
  const opts: Record<string, unknown> = { quality: 100 };
  if (target === "png") opts.compressionLevel = 6;
  if (target === "webp") opts.lossless = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sharp(buf).toFormat(fmt as any, opts).toBuffer();
}

// Convert between standard image formats via sharp
async function convertImage(input: Buffer, target: ImageFormat): Promise<Buffer> {
  const fmt = SHARP_FORMAT_MAP[target];
  const opts: Record<string, unknown> = { quality: 100 };
  if (target === "webp") opts.lossless = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return sharp(input).toFormat(fmt as any, opts).toBuffer();
}

// Detect soffice binary path
export function findSoffice(): string | null {
  const candidates = [
    "/Applications/LibreOffice.app/Contents/MacOS/soffice",
    "/usr/bin/soffice",
    "/usr/local/bin/soffice",
    "/snap/bin/soffice",
  ];
  for (const p of candidates) {
    try {
      accessSync(p, constants.X_OK);
      return p;
    } catch {
      // not found
    }
  }
  // Try PATH
  try {
    const result = execSync("which soffice", { encoding: "utf8" }).trim();
    if (result) return result;
  } catch {
    // not in PATH
  }
  return null;
}

let _soffice: string | null | undefined;
export function getSofficePath(): string | null {
  if (_soffice === undefined) {
    _soffice = findSoffice();
  }
  return _soffice;
}

// Convert DOC/DOCX to PDF via LibreOffice headless
async function convertDoc(input: Buffer, originalName: string): Promise<Buffer> {
  const soffice = getSofficePath();
  if (!soffice) {
    throw new Error(
      "LibreOffice not found. Install it to enable DOC/DOCX conversion.\n" +
      "macOS: brew install --cask libreoffice\n" +
      "Linux: apt install libreoffice"
    );
  }

  const workDir = join(tmpdir(), `swiftconvert-${randomUUID()}`);
  await mkdir(workDir, { recursive: true });

  // Preserve original extension so LibreOffice detects format
  const ext = originalName.includes(".") ? originalName.split(".").pop() : "docx";
  const inputPath = join(workDir, `input.${ext}`);

  try {
    await writeFile(inputPath, input);

    await new Promise<void>((resolve, reject) => {
      const proc = execFile(
        soffice,
        [
          "--headless",
          "--convert-to",
          "pdf",
          "--outdir",
          workDir,
          inputPath,
        ],
        { timeout: 30000 },
        (error) => {
          if (error) {
            if (error.killed) {
              reject(new Error("LibreOffice conversion timed out (30s limit)"));
            } else {
              reject(new Error(`LibreOffice error: ${error.message}`));
            }
          } else {
            resolve();
          }
        }
      );

      // Kill on timeout (execFile timeout sends SIGTERM but we want to be sure)
      setTimeout(() => {
        try { proc.kill("SIGKILL"); } catch { /* already dead */ }
      }, 31000);
    });

    const pdfPath = join(workDir, "input.pdf");
    return await readFile(pdfPath);
  } finally {
    await rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

export interface ConvertResult {
  buffer: Buffer;
  contentType: string;
}

export async function convert(
  input: Buffer,
  sourceMime: string,
  target: TargetFormat,
  originalName: string
): Promise<ConvertResult> {
  let buffer: Buffer;

  if (isHeic(sourceMime)) {
    buffer = await convertHeic(input, target as ImageFormat);
  } else if (isImage(sourceMime)) {
    buffer = await convertImage(input, target as ImageFormat);
  } else if (isDoc(sourceMime)) {
    buffer = await convertDoc(input, originalName);
  } else {
    throw new Error(`Unsupported source format: ${sourceMime}`);
  }

  return { buffer, contentType: contentTypeFor(target) };
}
