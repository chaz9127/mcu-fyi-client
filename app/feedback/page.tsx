'use client'

import { useState } from 'react'
import Button from '@/components/Button'

export default function FeedbackPage() {
  const [loading, setLoading] = useState(false)
  const formsubmitId = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL_ID
  const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL ?? ''

  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)]">
      <form
        onClick={(e) => e.stopPropagation()}
        action={`https://formsubmit.co/${formsubmitId}`}
        method="POST"
        onSubmit={() => setLoading(true)}
        className="w-full max-w-[440px] text-white px-8 relative -top-20"
      >
        <h1 className="text-3xl font-bold mb-12">Send us feedback.</h1>

        <div className="relative mb-6">
          <label className="absolute -top-3 left-3 bg-mcu-bg px-1 text-gray-400 text-sm">
            Email (optional)
          </label>
          <input
            name="email"
            type="text"
            className="bg-transparent border border-gray-500 rounded text-base h-16 leading-8 font-bold text-white px-3 w-full"
          />
        </div>

        <div className="relative mb-6">
          <label className="absolute -top-3 left-3 bg-mcu-bg px-1 text-gray-400 text-sm">
            Message
          </label>
          <textarea
            required
            name="feedback-message"
            className="bg-transparent border border-gray-500 rounded text-base h-32 leading-8 font-bold text-white px-3 w-full resize-none"
          />
        </div>

        <div className="mb-6">
          <Button
            buttonType="submit"
            text={loading ? 'Sending...' : 'Send'}
            textOnly
            disabled={loading}
          />
        </div>

        <input type="hidden" name="_subject" value="Message from TheMCU.FYI" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={`${clientUrl}/?submittedFeedback=true`} />
      </form>
    </div>
  )
}
