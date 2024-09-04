import './globals.css'
import { Inter, Open_Sans, Poppins } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const openSans = Open_Sans({ subsets: ['latin'] })
const poppins = Poppins({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Astrofinance',
  description: 'Your Stellar Financial Profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${openSans.className} ${poppins.className}`}>{children}</body>
    </html>
  )
}