import '../styles/globals.css';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
        refreshInterval: 0
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>)
}
