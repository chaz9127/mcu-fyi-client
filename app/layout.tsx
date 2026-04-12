import type { Metadata } from 'next'
import Script from 'next/script'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/lib/auth-context'
import Nav from '@/components/Nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'TheMCU.FYI',
  description: 'Track your Marvel Cinematic Universe watchlist',
  icons: { icon: '/images/favicon.png' },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <Script
          src="https://kit.fontawesome.com/2dcc19b59d.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Pahawh+Hmong&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <Nav />
          {children}
        </AuthProvider>
        <ToastContainer theme="dark" />
      </body>
    </html>
  )
}
