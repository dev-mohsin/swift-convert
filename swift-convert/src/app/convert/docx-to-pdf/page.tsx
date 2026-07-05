import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DOCX to PDF Converter - Free Online | SwiftConvert",
  description:
    "Convert Word DOCX and DOC files to PDF online for free. No signup, no watermarks. Preserves formatting and layout.",
  keywords: [
    "DOCX to PDF",
    "DOC to PDF",
    "Word to PDF",
    "convert Word to PDF",
    "free DOCX converter",
    "online Word converter",
  ],
  openGraph: {
    title: "DOCX to PDF Converter - Free Online",
    description:
      "Convert Word documents to PDF instantly. Free, no signup.",
    url: "https://swiftconvert.app/convert/docx-to-pdf",
  },
  alternates: {
    canonical: "https://swiftconvert.app/convert/docx-to-pdf",
  },
};

export default function DocxToPdfPage() {
  return (
    <main className="flex-1">
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#012AFF] text-xs font-semibold rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#012AFF] rounded-full" />
            Free &middot; No signup
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Convert <span className="text-[#012AFF]">DOCX to PDF</span> Online
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Convert Word documents to PDF while preserving formatting, fonts,
            and layout. No software installation needed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white font-semibold rounded-xl hover:bg-[#0122DD] transition-colors shadow-sm shadow-[#012AFF]/20"
          >
            Start Converting
          </Link>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-10">
            Why Convert DOCX to PDF?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Universal format",
                desc: "PDF looks the same on every device, OS, and printer. No more formatting shifts between Word versions.",
              },
              {
                title: "Professional sharing",
                desc: "Send contracts, resumes, and reports as PDF to ensure recipients see exactly what you intended.",
              },
              {
                title: "Cannot be easily edited",
                desc: "PDF protects your document layout from accidental changes by recipients.",
              },
              {
                title: "Smaller file size",
                desc: "PDF files are often smaller than DOCX, especially for documents with embedded images.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 bg-white border border-neutral-100 rounded-xl"
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-10">FAQ</h2>
          <div className="space-y-3">
            {[
              {
                q: "Does it preserve formatting?",
                a: "Yes. The conversion uses LibreOffice under the hood, which accurately preserves fonts, tables, images, and layout.",
              },
              {
                q: "Can I convert DOC files too?",
                a: "Yes. Both legacy .doc and modern .docx formats are supported.",
              },
              {
                q: "Is my document safe?",
                a: "Files are processed in memory and immediately discarded. Nothing is stored on disk or logged.",
              },
              {
                q: "What is the file size limit?",
                a: "Individual files can be up to 50MB.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group bg-white border border-neutral-100 rounded-xl"
              >
                <summary className="px-5 py-4 cursor-pointer font-medium text-sm flex items-center justify-between list-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 ml-4 text-neutral-400 transition-transform group-open:rotate-180">
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 text-sm text-neutral-500 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 px-4 text-center">
        <div className="max-w-xl mx-auto p-8 bg-neutral-900 rounded-2xl text-white">
          <h2 className="text-xl font-bold mb-3">Convert your documents</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Drop your Word file and get a PDF in seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white font-semibold rounded-xl hover:bg-[#0122DD] transition-colors"
          >
            Convert DOCX to PDF Now
          </Link>
        </div>
      </section>
    </main>
  );
}
