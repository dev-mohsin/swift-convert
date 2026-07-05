import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HEIC to JPG Converter - Free Online | SwiftConvert",
  description:
    "Convert HEIC and HEIF files to JPG online for free. No signup, no watermarks. Perfect for sharing iPhone photos anywhere.",
  keywords: [
    "HEIC to JPG",
    "HEIF to JPG",
    "convert HEIC to JPEG",
    "iPhone photo to JPG",
    "free HEIC converter",
    "online HEIC to JPG",
  ],
  openGraph: {
    title: "HEIC to JPG Converter - Free Online",
    description:
      "Convert HEIC/HEIF photos to JPG instantly. No signup, no limits.",
    url: "https://swiftconvert.app/convert/heic-to-jpg",
  },
  alternates: {
    canonical: "https://swiftconvert.app/convert/heic-to-jpg",
  },
};

export default function HeicToJpgPage() {
  return (
    <main className="flex-1">
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#012AFF] text-xs font-semibold rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#012AFF] rounded-full" />
            Free &middot; No signup
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Convert <span className="text-[#012AFF]">HEIC to JPG</span> Online
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Turn your iPhone HEIC photos into universally compatible JPG files.
            Batch upload supported. Files processed in memory, never stored.
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
            Why Convert HEIC to JPG?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Works everywhere",
                desc: "JPG is the most widely supported image format. Share photos on any device, app, or website without compatibility issues.",
              },
              {
                title: "Smaller file size",
                desc: "JPG files are typically smaller than PNG, making them faster to upload, email, and share.",
              },
              {
                title: "Social media ready",
                desc: "Every social media platform accepts JPG. Upload directly to Instagram, Facebook, Twitter, or LinkedIn.",
              },
              {
                title: "Print compatible",
                desc: "JPG is the standard format for photo printing services and professional labs.",
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
                q: "What is the difference between HEIC and JPG?",
                a: "HEIC is Apple's format that offers better compression, but JPG is universally compatible across all platforms and devices.",
              },
              {
                q: "Will I lose quality converting HEIC to JPG?",
                a: "JPG uses lossy compression, so there is minimal quality reduction. For most use cases the difference is imperceptible.",
              },
              {
                q: "Can I batch convert multiple files?",
                a: "Yes. Upload as many HEIC files as you need and download them all as a ZIP archive.",
              },
              {
                q: "Is it really free?",
                a: "Yes. No signup, no daily limits, no watermarks. Completely free.",
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
          <h2 className="text-xl font-bold mb-3">Ready to convert?</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Drop your HEIC files and get JPG downloads instantly.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white font-semibold rounded-xl hover:bg-[#0122DD] transition-colors"
          >
            Convert HEIC to JPG Now
          </Link>
        </div>
      </section>
    </main>
  );
}
