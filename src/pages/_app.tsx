/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Theme } from 'react-daisyui'

import { useState, useEffect } from 'react';
import axios from 'axios';
import ThemeContext from '../../context/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(process.env.NEXT_PUBLIC_API);
            const data = response.data;
            setTheme(data.form.theme);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
    }, []);

    return (
        <ThemeContext.Provider value={theme}>
            <Theme dataTheme={theme}>
                <Component {...pageProps} />
            </Theme>
        </ThemeContext.Provider>
    )
}

export default MyApp
