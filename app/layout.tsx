import { Archivo } from 'next/font/google';
import './globals.css';
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});
import Provider from '@/lib/provider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Frontend Fadhil',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${archivo.className}  `}
        suppressHydrationWarning={true}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
