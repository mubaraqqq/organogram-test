import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';

import { NextAuthProvider } from '@/components/next-auth-provider';
import { ReduxProvider } from '@/components/redux-provider';

import { authOptions } from '@/app/_lib/auth';
import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);


  return (
    <html>
      <body>
        <NextAuthProvider session={session}>
          <ReduxProvider>
            {children}
            <Toaster position='top-right' />
          </ReduxProvider>
        </NextAuthProvider></body>
    </html>
  );
}
