import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Suspense } from 'react'
import ApiContext from '../../context/ApiContext'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApiContext>
                <ToastContainer />
                <Component {...pageProps} />
            </ApiContext>
        </Suspense>
    )
}

export default MyApp
