import type { Metadata } from 'next';
import { Alegreya, Belleza } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  weight: ['400', '700'],
  display: 'swap',
});

const belleza = Belleza({
  subsets: ['latin'],
  variable: '--font-belleza',
  weight: '400',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Annadata Connect | Direct Farmer-to-Consumer Marketplace',
  description: 'Empowering Indian farmers by connecting them directly with consumers for fresh, local, and sustainable produce.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alegreya.variable} ${belleza.variable}`}>
      <body className="font-body antialiased bg-background text-foreground">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
