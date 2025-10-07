import '../css/index.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@components/Layout';

const CoreApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Head>
        <title>Seerr</title>
        <meta
          name="description"
          content="Request management and media discovery tool for the Plex/Jellyfin ecosystem."
        />
        <meta property="og:site_name" content="Seerr" data-rh="true"></meta>
        <meta property="og:title" content="Seerr" data-rh="true"></meta>
        <meta
          property="og:description"
          content="Request management and media discovery tool for the Plex/Jellyfin ecosystem."
          data-rh="true"
        ></meta>
        <meta
          property="og:image"
          content="/os_logo_filled.svg"
          data-rh="true"
        ></meta>
        <meta
          property="og:url"
          content="https://seerr.dev"
          data-rh="true"
        ></meta>
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
};

export default CoreApp;
