import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React, { Suspense } from 'react'
import ApiContext from '../../context/ApiContext'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApiContext>
                <ToastContainer />
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <Component {...pageProps}></Component>
            </ApiContext>
        </Suspense>
    )
}

export default MyApp
