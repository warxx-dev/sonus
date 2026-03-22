import type { Metadata } from 'next'
import './globals.css'
import { Header } from 'components/header'
import { Footer } from 'components/footer'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Sonus - Premium Audio Equipment',
  description: 'High end headphones, earphones, speakers, and audio accessories',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-zinc-50 font-sans antialiased dark:bg-zinc-900">
        <Header />
        <main className="w-full flex-1 bg-white dark:bg-black">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
