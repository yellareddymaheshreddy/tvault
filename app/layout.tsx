import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'T-Vault - Temporary Text Storage',
  description: 'T-Vault is a secure, temporary text storage service that automatically deletes your content after 24 hours. Perfect for sharing sensitive information safely.',
  keywords: 'temporary text storage, secure text sharing, ephemeral messages, temporary vault, text vault',
  metadataBase: new URL('https://tvault.mahs.me'), 
  openGraph: {
    title: 'T-Vault - Secure Temporary Text Storage',
    description: 'Share sensitive text securely with 24-hour automatic deletion.',
    type: 'website',
    locale: 'en_US',
    siteName: 'T-Vault',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T-Vault - Secure Temporary Text Storage',
    description: 'Share sensitive text securely with 24-hour automatic deletion.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your Google Search Console verification code
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://tvault.mahs.me" /> {/* Replace with your actual domain */}
      </head>
      <body className={` antialiased`}>
        {children}
      </body>
    </html>
  );
}
