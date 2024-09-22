import './globals.css'
import type { Metadata } from 'next'
import { Providers } from '../components/Providers'

export const metadata: Metadata = {
  title: 'ITSTHELIST - Data Enrichment Tool',
  description: 'A tool for enriching company data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}