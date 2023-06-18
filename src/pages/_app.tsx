import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Suspense } from 'react'
import ApiContext from '../../context/ApiContext'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApiContext>
                <Component {...pageProps} />
            </ApiContext>
        </Suspense>
    )
}

export default MyApp
