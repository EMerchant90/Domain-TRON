import BigNumber from 'bignumber.js'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React, { Fragment } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore, persistor } from 'state'
import { NextPage } from 'next'
import { Updaters } from '..'
import Providers from '../Providers'
import GlobalStyle from "../style/Global";
import {useSyncTLDs} from "../state/tlds/hooks";

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

function GlobalHooks() {
  useSyncTLDs()
  return null
}

function MyApp(props: AppProps) {
  const { pageProps } = props
  const store = useStore(pageProps['initialReduxState'])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta name="description" content="TNS as NFT" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="twitter:image" content="" />
        <meta name="twitter:description" content="TNS as NFT" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TNS" />
        <title>Tron Naming Service</title>
      </Head>
      <Providers store={store}>
        <GlobalHooks />
        <Updaters />
        <GlobalStyle />
        <PersistGate loading={null} persistor={persistor}>
          <App {...props} />
        </PersistGate>
      </Providers>
    </>
  )
}

type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
