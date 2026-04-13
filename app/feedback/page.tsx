"use client";

import { useState } from "react";
import Button from "@/components/Button";

export default function FeedbackPage() {
  const [loading, setLoading] = useState(false);
  const formsubmitId = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL_ID;
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL ?? "";

  return (
    <div className="flex h-[calc(100vh-60px)] items-center justify-center">
      <form
        onClick={(e) => e.stopPropagation()}
        action={`https://formsubmit.co/${formsubmitId}`}
        method="POST"
        onSubmit={() => setLoading(true)}
        className="relative -top-20 w-full max-w-[440px] px-8"
      >
        <h1 className="mb-12 text-3xl font-bold">Send us feedback.</h1>

        <div className="relative mb-6">
          <label className="absolute -top-3 left-3 bg-mcu-bg px-1 text-sm text-gray-400">
            Email (optional)
          </label>
          <input
            name="email"
            type="text"
            className="h-16 w-full rounded border border-gray-500 bg-transparent px-3 text-base font-bold leading-8"
          />
        </div>

        <div className="relative mb-6">
          <label className="absolute -top-3 left-3 bg-mcu-bg px-1 text-sm text-gray-400">
            Message
          </label>
          <textarea
            required
            name="feedback-message"
            className="h-32 w-full resize-none rounded border border-gray-500 bg-transparent px-3 text-base font-bold leading-8"
          />
        </div>

        <div className="mb-6">
          <Button
            buttonType="submit"
            text={loading ? "Sending..." : "Send"}
            textOnly
            disabled={loading}
          />
        </div>

        <input type="hidden" name="_subject" value="Message from TheMCU.FYI" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={`${clientUrl}/?submittedFeedback=true`} />
      </form>
    </div>
  );
}
