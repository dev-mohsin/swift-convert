import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SwiftConvert - Free Online File Converter",
    template: "%s | SwiftConvert",
  },
  description:
    "Convert HEIC to PNG/JPG, compress images, and convert DOCX to PDF. Free, fast, no signup required. Files are never stored.",
  keywords: [
    "HEIC to PNG",
    "HEIC to JPG",
    "image converter",
    "image compressor",
    "DOCX to PDF",
    "free file converter",
    "online converter",
    "batch image converter",
  ],
  authors: [{ name: "SwiftConvert" }],
  metadataBase: new URL("https://swiftconvert.app"),
  openGraph: {
    title: "SwiftConvert - Free Online File Converter",
    description:
      "Convert and compress images. HEIC, JPG, PNG, WEBP, DOCX supported. 100% free, no signup.",
    url: "https://swiftconvert.app",
    siteName: "SwiftConvert",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SwiftConvert" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwiftConvert - Free Online File Converter",
    description:
      "Convert and compress images. 100% free, no signup.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-neutral-900 font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/70 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-[#012AFF] rounded-xl flex items-center justify-center shadow-sm shadow-[#012AFF]/20 group-hover:shadow-md group-hover:shadow-[#012AFF]/30 transition-shadow">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <g stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 10h16"/><path d="M17 4l6 6-6 6"/>
                    <path d="M27 22H11"/><path d="M15 16l-6 6 6 6"/>
                  </g>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="group-hover:text-[#012AFF] transition-colors">Swift</span><span className="text-[#012AFF]">Convert</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2">
              <a href="#features" className="px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors hidden sm:block">Features</a>
              <a href="#faq" className="px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors hidden sm:block">FAQ</a>
              <Link href="/privacy" className="px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors hidden sm:block">Privacy</Link>
              <Link href="/terms" className="px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors hidden sm:block">Terms</Link>
              <div className="w-px h-5 bg-neutral-200 mx-1 hidden sm:block" />
              <a
                href="https://github.com/dev-mohsin/swift-convert"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </nav>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="mt-auto bg-neutral-900 text-neutral-400">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 bg-[#012AFF] rounded-lg flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                      <g stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 10h16"/><path d="M17 4l6 6-6 6"/>
                        <path d="M27 22H11"/><path d="M15 16l-6 6 6 6"/>
                      </g>
                    </svg>
                  </div>
                  <span className="text-white font-bold tracking-tight">Swift<span className="text-[#4D6FFF]">Convert</span></span>
                </div>
                <p className="text-sm leading-relaxed">
                  Free online file converter. Convert and compress images and documents instantly. No signup, no limits.
                </p>
              </div>

              {/* Product */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">Product</h3>
                <ul className="space-y-2.5 text-sm">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                  <li>
                    <a href="https://github.com/dev-mohsin/swift-convert" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">Legal</h3>
                <ul className="space-y-2.5 text-sm">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-neutral-500">
                &copy; {new Date().getFullYear()} SwiftConvert. All rights reserved.
              </p>
              <p className="text-xs text-neutral-600 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 4V3a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Files processed in memory and never stored
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
