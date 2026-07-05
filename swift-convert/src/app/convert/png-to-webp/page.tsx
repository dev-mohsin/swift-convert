import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PNG to WebP Converter - Free Online | SwiftConvert",
  description:
    "Convert PNG images to WebP format for smaller file sizes and faster web pages. Free, no signup required.",
  keywords: [
    "PNG to WebP",
    "convert PNG to WebP",
    "WebP converter",
    "image optimization",
    "reduce image size",
    "free PNG converter",
  ],
  openGraph: {
    title: "PNG to WebP Converter - Free Online",
    description:
      "Convert PNG to WebP for smaller files and faster pages. Free, no signup.",
    url: "https://swiftconvert.app/convert/png-to-webp",
  },
  alternates: {
    canonical: "https://swiftconvert.app/convert/png-to-webp",
  },
};

export default function PngToWebpPage() {
  return (
    <main className="flex-1">
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#012AFF] text-xs font-semibold rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#012AFF] rounded-full" />
            Free &middot; No signup
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Convert <span className="text-[#012AFF]">PNG to WebP</span> Online
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Reduce image sizes by up to 30% without visible quality loss.
            WebP delivers smaller files for faster websites. Batch upload supported.
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
            Why Convert PNG to WebP?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Smaller files",
                desc: "WebP produces files 25-35% smaller than PNG while maintaining the same visual quality.",
              },
              {
                title: "Faster websites",
                desc: "Smaller images mean faster page loads, better Core Web Vitals, and improved Google rankings.",
              },
              {
                title: "Transparency support",
                desc: "WebP supports alpha transparency just like PNG, so it works for logos and graphics too.",
              },
              {
                title: "Browser support",
                desc: "WebP is supported by all modern browsers including Chrome, Firefox, Safari, and Edge.",
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
                q: "What is WebP?",
                a: "WebP is a modern image format developed by Google. It provides superior lossless and lossy compression for images on the web.",
              },
              {
                q: "Does WebP support transparency?",
                a: "Yes. WebP supports alpha channel transparency, making it a direct replacement for PNG in most use cases.",
              },
              {
                q: "Will my images look different?",
                a: "No. The conversion preserves visual quality. The difference is only in file size.",
              },
              {
                q: "Can I convert multiple PNG files at once?",
                a: "Yes. Upload a batch and download all converted files individually or as a ZIP.",
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
          <h2 className="text-xl font-bold mb-3">Optimize your images</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Convert PNG to WebP and speed up your website today.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white font-semibold rounded-xl hover:bg-[#0122DD] transition-colors"
          >
            Convert PNG to WebP Now
          </Link>
        </div>
      </section>
    </main>
  );
}
