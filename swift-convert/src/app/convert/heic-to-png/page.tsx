import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HEIC to PNG Converter - Free Online | SwiftConvert",
  description:
    "Convert HEIC and HEIF files to PNG online for free. No signup, no watermarks, no file limits. Works on iPhone photos instantly.",
  keywords: [
    "HEIC to PNG",
    "HEIF to PNG",
    "convert HEIC to PNG",
    "iPhone photo converter",
    "free HEIC converter",
    "online HEIC to PNG",
  ],
  openGraph: {
    title: "HEIC to PNG Converter - Free Online",
    description:
      "Convert HEIC/HEIF photos to PNG instantly. No signup, no limits.",
    url: "https://swiftconvert.app/convert/heic-to-png",
  },
  alternates: {
    canonical: "https://swiftconvert.app/convert/heic-to-png",
  },
};

export default function HeicToPngPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#012AFF] text-xs font-semibold rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#012AFF] rounded-full" />
            Free &middot; No signup
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Convert <span className="text-[#012AFF]">HEIC to PNG</span> Online
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Drop your iPhone HEIC or HEIF photos and get high-quality PNG files
            instantly. Batch upload supported. Files are processed in memory and
            never stored.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white font-semibold rounded-xl hover:bg-[#0122DD] transition-colors shadow-sm shadow-[#012AFF]/20"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 10h16" />
              <path d="M17 4l6 6-6 6" />
              <path d="M27 22H11" />
              <path d="M15 16l-6 6 6 6" />
            </svg>
            Start Converting
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                step: "1",
                title: "Upload HEIC files",
                desc: "Drag and drop or click to select your .heic or .heif photos.",
              },
              {
                step: "2",
                title: "Choose PNG",
                desc: "Select PNG as the target format from the dropdown.",
              },
              {
                step: "3",
                title: "Download",
                desc: "Get your PNG files individually or as a ZIP archive.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 bg-[#012AFF] text-white font-bold rounded-xl flex items-center justify-center text-sm">
                  {item.step}
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why convert */}
      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-10">
            Why Convert HEIC to PNG?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Universal compatibility",
                desc: "PNG works everywhere. HEIC is only natively supported on Apple devices. Convert to PNG to share with anyone.",
              },
              {
                title: "Lossless quality",
                desc: "PNG preserves full image quality without compression artifacts, unlike JPG.",
              },
              {
                title: "Transparency support",
                desc: "PNG supports alpha transparency, making it ideal for graphics, logos, and overlays.",
              },
              {
                title: "Web ready",
                desc: "PNG is supported by every browser and platform. Upload to websites, social media, or documents without issues.",
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

      {/* FAQ */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "What is a HEIC file?",
                a: "HEIC (High Efficiency Image Container) is Apple's default photo format since iOS 11. It produces smaller files than JPG but isn't universally supported.",
              },
              {
                q: "Is the conversion free?",
                a: "Yes, completely free. No signup, no daily limits, no watermarks.",
              },
              {
                q: "Are my files safe?",
                a: "Files are processed in server memory and immediately discarded. Nothing is stored on disk or logged.",
              },
              {
                q: "Can I convert multiple HEIC files at once?",
                a: "Yes. Upload as many files as you need. They'll be processed sequentially and you can download them individually or as a ZIP.",
              },
              {
                q: "Does it work on Windows and Android?",
                a: "Yes. SwiftConvert runs in any modern browser on any device.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group bg-white border border-neutral-100 rounded-xl"
              >
                <summary className="px-5 py-4 cursor-pointer font-medium text-sm flex items-center justify-between list-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="shrink-0 ml-4 text-neutral-400 transition-transform group-open:rotate-180"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </summary>
                <p className="px-5 pb-4 text-sm text-neutral-500 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 px-4 text-center">
        <div className="max-w-xl mx-auto p-8 bg-neutral-900 rounded-2xl text-white">
          <h2 className="text-xl font-bold mb-3">
            Ready to convert your HEIC files?
          </h2>
          <p className="text-neutral-400 text-sm mb-6">
            No signup required. Just drop your files and download.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white font-semibold rounded-xl hover:bg-[#0122DD] transition-colors"
          >
            Convert HEIC to PNG Now
          </Link>
        </div>
      </section>
    </main>
  );
}
