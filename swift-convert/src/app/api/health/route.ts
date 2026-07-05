import sharp from "sharp";
import { getSofficePath } from "@/lib/convert";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const sharpAvailable = typeof sharp === "function";
  const sofficePath = getSofficePath();

  return Response.json({
    status: "ok",
    sharp: sharpAvailable,
    soffice: sofficePath ? { available: true, path: sofficePath } : { available: false },
  });
}
