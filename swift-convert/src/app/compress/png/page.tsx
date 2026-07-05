import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compress PNG Images - Free Online | SwiftConvert",
  description:
    "Compress PNG images online for free. Reduce file size while keeping transparency. No signup, no watermarks.",
  keywords: [
    "compress PNG",
    "reduce PNG size",
    "PNG compressor",
    "optimize PNG",
    "free PNG compressor",
    "online PNG compression",
  ],
  openGraph: {
    title: "Compress PNG Images - Free Online",
    description:
      "Reduce PNG file sizes while preserving transparency. Free, no signup.",
    url: "https://swiftconvert.app/compress/png",
  },
  alternates: {
    canonical: "https://swiftconvert.app/compress/png",
  },
};

export default function CompressPngPage() {
  return (
    <main className="flex-1">
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#012AFF] text-xs font-semibold rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#012AFF] rounded-full" />
            Free &middot; No signup
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Compress <span className="text-[#012AFF]">PNG Images</span> Online
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Reduce PNG file sizes while preserving transparency and quality.
            Adjustable compression level. Batch upload supported.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white font-semibold rounded-xl hover:bg-[#0122DD] transition-colors shadow-sm shadow-[#012AFF]/20"
          >
            Start Compressing
          </Link>
        </div>
      </section>

      <section className="pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-10">
            Why Compress PNG Files?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Keep transparency",
                desc: "Unlike JPG, PNG compression preserves alpha channel transparency for logos, icons, and graphics.",
              },
              {
                title: "Faster page loads",
                desc: "Optimized PNGs load faster on websites, improving user experience and SEO rankings.",
              },
              {
                title: "Email friendly",
                desc: "Compressed PNGs stay under email attachment limits while maintaining visual quality.",
              },
              {
                title: "Adjustable level",
                desc: "Control the compression level to find the right balance for your needs.",
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
                q: "Will compression remove transparency?",
                a: "No. PNG compression preserves the alpha channel. Your transparent backgrounds stay transparent.",
              },
              {
                q: "How much smaller will my PNG be?",
                a: "Results vary by image content. Screenshots and graphics typically compress 40-60%. Photos compress less since PNG is already optimized for them.",
              },
              {
                q: "Is PNG compression lossless?",
                a: "PNG uses lossless compression by default. Our tool adjusts the compression effort level to find smaller representations without losing any pixel data.",
              },
              {
                q: "Should I use PNG or WebP?",
                a: "If you need maximum compatibility, use PNG. If you are optimizing for the web and browser support is not a concern, WebP produces even smaller files.",
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
          <h2 className="text-xl font-bold mb-3">Optimize your PNGs</h2>
          <p className="text-neutral-400 text-sm mb-6">
            Smaller files, same quality, same transparency.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white font-semibold rounded-xl hover:bg-[#0122DD] transition-colors"
          >
            Compress PNG Now
          </Link>
        </div>
      </section>
    </main>
  );
}
