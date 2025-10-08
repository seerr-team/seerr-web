import '../css/index.css';
import React from 'react';
import Layout from '@components/Layout';

export const metadata = {
  title: 'Seerr',
  description:
    'Request management and media discovery tool for the Plex/Jellyfin ecosystem.',
  openGraph: {
    siteName: 'Seerr',
    title: 'Seerr',
    description:
      'Request management and media discovery tool for the Plex/Jellyfin ecosystem.',
    images: ['/os_logo_filled.svg'],
    url: 'https://seerr.dev',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
