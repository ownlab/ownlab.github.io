import { useEffect } from 'react';
import Router from 'next/router';
import { SWRConfig } from 'swr'
import { initGA, logPageView } from 'analytics';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';

import fetch from '../lib/fetchJson'
import { initSentry } from '../utils/sentry'

// Load Typeface Fonts
import 'typeface-dm-sans';
import 'typeface-bree-serif';
import 'typeface-roboto-slab';

// Load other package css file
import 'rc-drawer/assets/index.css';

initSentry()

export default function CustomApp({ Component, pageProps, err }) {
  useEffect(() => {
    initGA();
    logPageView();
    Router.events.on('routeChangeComplete', logPageView);
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider >
    </SWRConfig>
  );
}
