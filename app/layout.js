import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'
import { SITE_URL } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tea-shirts',
    template: '%s — Tea-shirts',
  },
  description: 'Minimal t-shirts for tea lovers. Upload a photo of your tea and wear it.',
  openGraph: {
    type: 'website',
    siteName: 'Tea-shirts',
    title: 'Tea-shirts',
    description: 'Minimal t-shirts for tea lovers. Upload a photo of your tea and wear it.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tea-shirts',
    description: 'Minimal t-shirts for tea lovers. Upload a photo of your tea and wear it.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${playfair.variable}`}>
      <body>
        <MotionProvider>
          <Header playfairClass={playfair.className} />
          <main>{children}</main>
          <Footer playfairClass={playfair.className} />
        </MotionProvider>
      </body>
    </html>
  )
}
