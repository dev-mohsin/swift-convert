# SwiftConvert

File conversion web app. HEIC/JPG/PNG/WEBP images and DOC/DOCX documents.

## Supported conversions

| Source         | Target formats     |
|----------------|--------------------|
| HEIC / HEIF    | PNG, JPG, WEBP     |
| JPG / PNG / WEBP | PNG, JPG, WEBP   |
| DOC / DOCX     | PDF                |

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### LibreOffice (required for DOC/DOCX to PDF)

Image conversions work without LibreOffice. For document conversion:

- **macOS:** `brew install --cask libreoffice`
- **Ubuntu/Debian:** `apt install libreoffice`

Check `/api/health` to verify detection.

## API

### POST /api/convert

Multipart form with `file` and `target` fields.

```bash
curl -o output.jpg \
  -F "file=@photo.heic" \
  -F "target=jpg" \
  http://localhost:3000/api/convert
```

- Max file size: 50MB (returns 413)
- File type validated by magic bytes, not extension
- Returns the converted file with correct Content-Type and Content-Disposition

### GET /api/health

Reports availability of sharp and LibreOffice.

```json
{
  "status": "ok",
  "sharp": true,
  "soffice": { "available": true, "path": "/usr/bin/soffice" }
}
```

## Stack

- Next.js 15+ (App Router, TypeScript)
- Tailwind CSS
- sharp (image conversion)
- heic-convert (HEIC/HEIF decoding)
- LibreOffice headless (DOC/DOCX to PDF)
- file-type (magic byte detection)
