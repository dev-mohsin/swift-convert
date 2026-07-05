import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="mb-6">
        <svg width="64" height="64" viewBox="0 0 32 32" fill="none" className="mx-auto opacity-15">
          <g stroke="#012AFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 10h16"/><path d="M17 4l6 6-6 6"/>
            <path d="M27 22H11"/><path d="M15 16l-6 6 6 6"/>
          </g>
        </svg>
      </div>
      <div className="text-7xl font-bold text-[#012AFF]/10 mb-4">404</div>
      <h1 className="text-2xl font-bold tracking-tight mb-2">Page not found</h1>
      <p className="text-neutral-500 mb-8">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white text-sm font-semibold rounded-lg hover:bg-[#0022cc] transition-colors"
      >
        Go to SwiftConvert
      </Link>
    </main>
  );
}
