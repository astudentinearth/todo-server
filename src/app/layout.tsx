import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap-icons/font/bootstrap-icons.css'
import ThemeHelper from '@/components/ThemeHelper'
import Providers from '@/context/Providers'
import { ToastContainer } from '@/components/features/toasts'

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
        <body className={inter.className}>
          <Providers>
            {children}
            <ToastContainer></ToastContainer>
          </Providers>
        </body>
    </html>
  )
}
