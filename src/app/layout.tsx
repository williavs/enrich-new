import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Enrichment Tool',
  description: 'A tool for enriching company data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}