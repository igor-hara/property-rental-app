import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Property Rental | Find Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, property, find property, find rental',
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
