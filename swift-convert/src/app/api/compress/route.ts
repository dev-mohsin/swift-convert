import { NextRequest } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SIZE = 50 * 1024 * 1024;

const COMPRESSIBLE_MIMES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: NextRequest) {
  try {
    const cl = request.headers.get("content-length");
    if (cl && parseInt(cl, 10) > MAX_SIZE) {
      return Response.json(
        { error: "File too large. Maximum size is 50MB." },
        { status: 413 }
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return Response.json(
        { error: "Invalid multipart form data." },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    const qualityStr = formData.get("quality");

    if (!file || !(file instanceof File)) {
      return Response.json(
        { error: "No file provided." },
        { status: 400 }
      );
    }

    const quality = qualityStr ? parseInt(qualityStr as string, 10) : 80;
    if (quality < 1 || quality > 100 || isNaN(quality)) {
      return Response.json(
        { error: "Quality must be between 1 and 100." },
        { status: 400 }
      );
    }

    const arrayBuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    if (buffer.length === 0) {
      return Response.json({ error: "File is empty (0 bytes)." }, { status: 400 });
    }

    if (buffer.length > MAX_SIZE) {
      return Response.json(
        { error: "File too large. Maximum size is 50MB." },
        { status: 413 }
      );
    }

    const detected = await fileTypeFromBuffer(buffer);
    const mime = detected?.mime as string | undefined;

    if (!mime || !COMPRESSIBLE_MIMES[mime]) {
      return Response.json(
        { error: `Unsupported file type: ${mime || "unknown"}. Supported: JPG, PNG, WEBP.` },
        { status: 400 }
      );
    }

    const ext = COMPRESSIBLE_MIMES[mime];
    let output: Buffer;

    if (mime === "image/jpeg") {
      output = await sharp(buffer).jpeg({ quality, mozjpeg: true }).toBuffer();
    } else if (mime === "image/png") {
      // PNG is lossless, so quality slider controls color quantization
      // At quality < 100, reduce colors to shrink file size significantly
      if (quality < 100) {
        const colors = Math.max(2, Math.round((quality / 100) * 256));
        output = await sharp(buffer)
          .png({ compressionLevel: 9, effort: 10, palette: true, colours: colors })
          .toBuffer();
      } else {
        output = await sharp(buffer)
          .png({ compressionLevel: 9, effort: 10 })
          .toBuffer();
      }
    } else {
      output = await sharp(buffer).webp({ quality }).toBuffer();
    }

    const baseName = file.name.replace(/\.[^.]+$/, "") || "compressed";
    const outName = `${baseName}-compressed.${ext}`;

    return new Response(new Uint8Array(output), {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Content-Disposition": `attachment; filename="${outName}"`,
        "Content-Length": output.length.toString(),
        "X-Original-Size": buffer.length.toString(),
        "X-Compressed-Size": output.length.toString(),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Compression failed";
    console.error("Compression error:", err);
    return Response.json({ error: message }, { status: 500 });
  }
}
