import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ImageFader from '../ImageFader';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="absolute inset-x-0 top-0 image-fader">
        <ImageFader
          isDarker
          backgroundImages={[
            '/images/mando.jpg',
            '/images/ww_bg.jpg',
            '/images/tenet.jpg',
            '/images/coco.jpg',
            '/images/avengers.jpg',
            '/images/moana.jpg',
          ]}
        />
      </div>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
