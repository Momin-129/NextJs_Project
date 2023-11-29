import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cycle',
  description: 'An app to track the cycle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dracula" style={{ height: "100%" }}>
      <body className={inter.className} style={{ height: "100%" }}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
