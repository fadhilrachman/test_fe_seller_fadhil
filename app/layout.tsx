// import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
// import '@uploadthing/react/styles.css';
// import type { Metadata } from 'next';
// import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { GeistSans } from 'geist/font/sans';
import moment from 'moment';
const inter = Inter({ subsets: ['latin'] });
import 'moment/locale/id';
import Provider from '@/lib/provider';

// export const metadata: Metadata = {
//   title: 'Next Shadcn',
//   description: 'Basic dashboard with Next.js and Shadcn'
// };

moment.locale('id');

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className}  `}
        suppressHydrationWarning={true}
      >
        {/* <NextTopLoader showSpinner={false} /> */}
        <Provider>
          {/* <Toaster /> */}
          {children}
        </Provider>
      </body>
    </html>
  );
}
