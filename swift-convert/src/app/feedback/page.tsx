"use client";

import { useState } from "react";
import Link from "next/link";

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  if (submitted) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-4">
          <circle cx="24" cy="24" r="22" fill="#16a34a" />
          <path d="M15 24l6 6 12-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Thank you!</h1>
        <p className="text-neutral-500 mb-8">Your feedback has been sent. We appreciate it.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#012AFF] text-white text-sm font-semibold rounded-lg hover:bg-[#0022cc] transition-colors"
        >
          Back to SwiftConvert
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Send Feedback</h1>
        <p className="text-neutral-500 text-sm mb-8">Bug report, feature request, or just say hi.</p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setSending(true);
            setError("");
            try {
              const form = e.currentTarget;
              const data = new FormData(form);
              const res = await fetch("https://formsubmit.co/ajax/mohsin.flutter.dev@gmail.com", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data,
              });
              if (res.ok) {
                setSubmitted(true);
              } else {
                setError("Failed to send. Please try again.");
              }
            } catch {
              setError("Network error. Please try again.");
            } finally {
              setSending(false);
            }
          }}
        >
          {/* FormSubmit config */}
          <input type="hidden" name="_subject" value="SwiftConvert Feedback" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} />

          <div className="space-y-5">
            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-semibold mb-1.5">Type</label>
              <select
                id="type"
                name="type"
                required
                className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#012AFF] focus:border-transparent"
              >
                <option value="">Select...</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="General Feedback">General Feedback</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Email (optional) */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1.5">
                Email <span className="text-neutral-400 font-normal">(optional, if you want a reply)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#012AFF] focus:border-transparent"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-1.5">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us what happened or what you'd like to see..."
                className="w-full border border-neutral-200 rounded-lg px-4 py-2.5 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#012AFF] focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 bg-[#012AFF] text-white text-sm font-semibold rounded-lg hover:bg-[#0022cc] transition-colors focus:outline-none focus:ring-2 focus:ring-[#012AFF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Sending..." : "Send Feedback"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
