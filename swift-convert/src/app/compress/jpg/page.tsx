import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compress JPG Images - Free Online | SwiftConvert",
  description:
    "Compress JPG and JPEG images online for free. Reduce file size with adjustable quality. No signup, no watermarks.",
  keywords: [
    "compress JPG",
    "compress JPEG",
    "reduce JPG size",
    "image compressor",
    "free JPG compressor",
    "online image compression",
  ],
  openGraph: {
    title: "Compress JPG Images - Free Online",
    description:
      "Reduce JPG file sizes with adjustable quality. Free, no signup.",
    url: "https://swiftconvert.app/compress/jpg",
  },
  alternates: {
    canonical: "https://swiftconvert.app/compress/jpg",
  },
};

export default function CompressJpgPage() {
  return (
    <main className="flex-1">
      <section className="py-16 sm:py-24 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-[#012AFF] text-xs font-semibold rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#012AFF] rounded-full" />
            Free &middot; No signup
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Compress <span className="text-[#012AFF]">JPG Images</span> Online
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Reduce JPG file sizes with an adjustable quality slider. See the
            estimated size before compressing. Batch upload supported.
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
            Why Compress JPG Files?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Faster uploads",
                desc: "Smaller files upload faster to websites, email, and social media platforms.",
              },
              {
                title: "Save storage",
                desc: "Reduce photo library size without deleting images. Great for phones and cloud storage.",
              },
              {
                title: "Better web performance",
                desc: "Compressed images improve page load times and Core Web Vitals scores.",
              },
              {
                title: "Adjustable quality",
                desc: "Use the quality slider to find the perfect balance between file size and image quality.",
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
                q: "How much can I reduce the file size?",
                a: "Typically 50-80% reduction at quality 75. You can preview the estimated size before compressing.",
              },
              {
                q: "Will my images look blurry?",
                a: "At quality 70-80, the difference is barely noticeable. Lower quality settings will show more compression artifacts.",
              },
              {
                q: "Can I compress multiple images at once?",
                a: "Yes. Upload a batch, set your quality, and download all compressed files.",
              },
              {
                q: "What quality setting should I use?",
                a: "75 is a good default for most use cases. Use 85+ for high-quality photos and 60-70 for web thumbnails.",
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
          <h2 className="text-xl font-bold mb-3">Compress your JPG images</h2>
          <p className="text-neutral-400 text-sm mb-6">
            No signup. Adjust quality, preview size, download instantly.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white font-semibold rounded-xl hover:bg-[#0122DD] transition-colors"
          >
            Compress JPG Now
          </Link>
        </div>
      </section>
    </main>
  );
}
