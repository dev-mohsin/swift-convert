import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - SwiftConvert",
  description: "SwiftConvert terms of service.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 sm:py-16">
      <article className="w-full max-w-2xl prose prose-neutral">
        <Link href="/" className="text-sm text-[#012AFF] no-underline hover:underline mb-6 inline-block">&larr; Back to SwiftConvert</Link>

        <h1 className="text-2xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-neutral-400">Last updated: July 2026</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Service</h2>
        <p>SwiftConvert is a free online tool for converting, compressing, and editing image and document files. The service is provided &ldquo;as is&rdquo; without warranty of any kind.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Acceptable use</h2>
        <p>You may use SwiftConvert for lawful purposes only. You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Upload files that contain malware or malicious code</li>
          <li>Attempt to overload, disrupt, or exploit the service</li>
          <li>Use automated scripts to make bulk requests beyond reasonable personal use</li>
          <li>Upload content that violates applicable laws or third-party rights</li>
        </ul>

        <h2 className="text-lg font-semibold mt-8 mb-2">Your files</h2>
        <p>You retain all rights to files you upload. SwiftConvert does not claim ownership of your content. Files are processed in memory and never stored. We are not responsible for any data loss resulting from use of the service.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Limitation of liability</h2>
        <p>SwiftConvert is provided free of charge. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service, including but not limited to data loss, file corruption, or service interruption.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">File size limits</h2>
        <p>Individual files are limited to 50MB. We reserve the right to impose additional rate limits or usage restrictions to ensure fair access for all users.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Availability</h2>
        <p>We aim to keep SwiftConvert available 24/7 but do not guarantee uptime. The service may be temporarily unavailable for maintenance or updates.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Changes</h2>
        <p>We may update these terms at any time. Continued use of the service constitutes acceptance of updated terms.</p>

        <h2 className="text-lg font-semibold mt-8 mb-2">Contact</h2>
        <p>Questions? Reach us at <span className="font-mono text-sm">legal@swiftconvert.app</span></p>
      </article>
    </main>
  );
}
