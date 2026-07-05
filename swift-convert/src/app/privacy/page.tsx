import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - SwiftConvert",
  description: "SwiftConvert privacy policy. Your files are processed locally and never stored on our servers.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 sm:py-16">
      <article className="w-full max-w-2xl prose prose-neutral">
        <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-neutral-400">Last updated: July 2026</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">What we collect</h2>
        <p>SwiftConvert does not collect, store, or transmit your personal data. We do not use cookies, tracking pixels, or third-party analytics.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">File processing</h2>
        <p>Files you upload are processed on our server in memory and immediately discarded after conversion. We do not store, log, or inspect your files. No copies are saved to disk beyond temporary processing buffers that are deleted the moment your download begins.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Image compression</h2>
        <p>Compression preview estimates are generated entirely in your browser using the Canvas API. The original file is only sent to the server when you click Compress.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Server logs</h2>
        <p>Our servers may log standard HTTP request metadata (IP address, timestamp, user agent) for operational purposes. These logs are rotated automatically and are not linked to any uploaded content.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Third parties</h2>
        <p>We do not share any data with third parties. SwiftConvert does not integrate with advertising networks, social media trackers, or data brokers.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Changes</h2>
        <p>We may update this policy. Changes will be reflected on this page with an updated date.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Contact</h2>
        <p>Questions? Reach us at <span className="font-mono text-sm">privacy@swiftconvert.app</span></p>
      </article>
    </main>
  );
}
