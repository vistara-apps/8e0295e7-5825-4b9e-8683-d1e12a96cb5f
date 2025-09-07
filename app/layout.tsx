import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

// Disable static generation
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Trellendar Arena - Unleash Your NFTs',
  description: 'Battle, Earn, and Collect in the ultimate NFT arena',
  openGraph: {
    title: 'Trellendar Arena',
    description: 'Unleash Your NFTs: Battle, Earn, and Collect',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
