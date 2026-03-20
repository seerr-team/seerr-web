import '../css/index.css';
import React from 'react';
import Layout from '@components/Layout';

export const metadata = {
  title: 'Seerr - Beautiful Media Discovery & Request Management',
  description:
    'Seerr is a free, open-source request management and media discovery tool for Jellyfin, Plex, and Emby. The unified evolution of Overseerr and Jellyseerr.',
  keywords: ['seerr', 'jellyfin', 'plex', 'emby', 'media requests', 'radarr', 'sonarr', 'overseerr', 'jellyseerr', 'media server'],
  openGraph: {
    siteName: 'Seerr',
    title: 'Seerr - Beautiful Media Discovery & Request Management',
    description:
      'The unified evolution of Overseerr and Jellyseerr. Request management for Jellyfin, Plex, and Emby.',
    images: ['/os_logo_filled.svg'],
    url: 'https://seerr.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seerr - Beautiful Media Discovery & Request Management',
    description: 'The unified evolution of Overseerr and Jellyseerr. Request management for Jellyfin, Plex, and Emby.',
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
