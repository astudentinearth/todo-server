import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ThemeHelper from '@/components/ThemeHelper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className=''>
      <body className={inter.className}>{children}</body>
      <ThemeHelper></ThemeHelper>
    </html>
  )
}
