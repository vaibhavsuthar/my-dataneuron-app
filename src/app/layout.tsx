
import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'DataNeuron Digital - Transforming Data into Intelligence',
  description: 'DataNeuron specializes in AI-powered solutions, digital marketing, and creative services to enhance your digital presence and data intelligence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        {/* Calendly widget styles */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-0Y8WKBT93C"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0Y8WKBT93C');
            `,
          }}
        />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        {/* Calendly widget script */}
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
      </body>
    </html>
  );
}
