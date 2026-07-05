import { NextRequest } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import { convert, validTarget, isHeic, isImage } from "@/lib/convert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

const SUPPORTED_MIMES = new Set([
  "image/heic",
  "image/heif",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(request: NextRequest) {
  try {
    // Check content-length early
    const cl = request.headers.get("content-length");
    if (cl && parseInt(cl, 10) > MAX_SIZE) {
      return new Response(
        JSON.stringify({ error: "File too large. Maximum size is 50MB." }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid multipart form data." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const file = formData.get("file");
    const target = formData.get("target");

    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: "No file provided. Send a 'file' field." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!target || typeof target !== "string") {
      return new Response(
        JSON.stringify({ error: "No target format. Send a 'target' field (png, jpg, webp, pdf)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const arrayBuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    if (buffer.length === 0) {
      return new Response(
        JSON.stringify({ error: "File is empty (0 bytes)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (buffer.length > MAX_SIZE) {
      return new Response(
        JSON.stringify({ error: "File too large. Maximum size is 50MB." }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      );
    }

    // Detect MIME by magic bytes
    const detected = await fileTypeFromBuffer(buffer);

    // DOC files (old binary format) may not be detected by file-type; fall back to extension
    let mime = detected?.mime as string | undefined;
    if (!mime) {
      const ext = file.name.toLowerCase().split(".").pop();
      if (ext === "doc") {
        mime = "application/msword";
      } else if (ext === "docx") {
        mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      } else if (ext === "svg") {
        mime = "image/svg+xml";
      }
    }

    // file-type returns 'application/x-cfb' for .doc files (Compound File Binary)
    if (mime === "application/x-cfb") {
      mime = "application/msword";
    }

    if (!mime || !SUPPORTED_MIMES.has(mime)) {
      return new Response(
        JSON.stringify({
          error: `Unsupported file type: ${mime || "unknown"}. Supported: HEIC, HEIF, JPG, PNG, WEBP, SVG, DOC, DOCX.`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!validTarget(mime, target)) {
      const targets = isHeic(mime) || isImage(mime) ? "png, jpg, webp" : "pdf";
      return new Response(
        JSON.stringify({
          error: `Cannot convert ${mime} to ${target}. Valid targets: ${targets}.`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await convert(buffer, mime, target, file.name);

    // Build output filename
    const baseName = file.name.replace(/\.[^.]+$/, "") || "converted";
    const outName = `${baseName}.${target}`;

    return new Response(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        "Content-Type": result.contentType,
        "Content-Disposition": `attachment; filename="${outName}"`,
        "Content-Length": result.buffer.length.toString(),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Conversion failed";
    console.error("Conversion error:", err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
