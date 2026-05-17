import type { Metadata } from 'next'
import { Great_Vibes } from "next/font/google";


import {
  Cormorant_Garamond,
  Inter,
} from 'next/font/google'

import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: 'Aurelle Vows',
  description:
    'Luxury Wedding Experiences by Aurelle Vows',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
<body
  className={`
    ${cormorant.variable}
    ${inter.variable}
    ${greatVibes.variable}
    antialiased
  `}
>
        {children}
      </body>

    </html>
  )
}









