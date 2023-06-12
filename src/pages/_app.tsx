import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Theme, useTheme } from 'react-daisyui'
import ApiContext, { APIdata } from '../../context/ApiContext'
import { useContext } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
    const { theme, setTheme } = useTheme('light')
    const { api } = useContext(APIdata)

    setTheme(api?.theme)

    return (
        <ApiContext>
            <Theme dataTheme={theme}>
                <Component {...pageProps} />
            </Theme>
        </ApiContext>
    )
}

export default MyApp
