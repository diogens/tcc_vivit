import Head from 'next/head'

import GlobalSyles from '../styles/global'

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Eplenario - Boilerplate</title>
        <link rel="shortcut icon" href="/img/favicon.ico" />
        <link rel="apple-touch-icon" href="/img/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="description...."
        />
      </Head>
      <GlobalSyles />
      <Component {...pageProps} />
    </>
  )
}

export default App