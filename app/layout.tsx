import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './navbar'
import TanstackProvider from '@/providers/TanstackProvider'
import Provider from './Provider'
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
        <TanstackProvider>
          <Provider>
            <Navbar />
            {children}
          </Provider>
        </TanstackProvider>
      </body>
    </html>
  )
}
