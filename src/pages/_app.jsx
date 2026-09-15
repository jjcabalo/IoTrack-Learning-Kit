import Head from 'next/head'
import '../styles/globals.css'
import { ScoreProvider } from '../context/ScoreContext'

export default function App({ Component, pageProps }) {
  return (
    <ScoreProvider>
      <Head>
        <title>IoTrack Learning Kit</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </ScoreProvider>
  )
}
