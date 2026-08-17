import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { StatusStrip } from '../components/layout/StatusStrip';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const canonicalOrigin = 'https://dietogetherguide.shop';
const isProduction = process.env.VERCEL_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(canonicalOrigin),
  title: {
    default: 'Last Pirates: Die Together Wiki & Guide',
    template: '%s | Die Together Guide',
  },
  description:
    'Source-checked Last Pirates: Die Together guides for monsters, maps, loot, co-op, Early Access updates and troubleshooting.',
  applicationName: 'Die Together Guide',
  alternates: { canonical: canonicalOrigin },
  openGraph: {
    type: 'website',
    url: canonicalOrigin,
    siteName: 'Die Together Guide',
    title: 'Last Pirates: Die Together Wiki & Guide',
    description:
      'Monsters. Maps. Loot. Get your crew home with a source-checked independent field guide.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Last Pirates: Die Together Wiki & Guide',
    description:
      'Source-checked guides for monsters, maps, loot, co-op, updates and troubleshooting.',
  },
  icons: {
    icon: '/brand/field-guide-mark.svg',
  },
  manifest: '/manifest.webmanifest',
  robots: isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#071014',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <StatusStrip />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
