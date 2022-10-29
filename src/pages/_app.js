import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import AuthProvider from '../providers/AuthProvider';
import FilterProvider from '../providers/FilterProvider';


const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await rget(queryKey[0]);
  return data;
};


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <FilterProvider>
            <CacheProvider value={emotionCache}>
              <Head>
                <title>Booking</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
              </Head>
              <Component {...pageProps} />
            </CacheProvider>
          </FilterProvider>
       </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
