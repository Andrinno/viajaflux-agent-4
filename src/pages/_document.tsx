import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="pt-BR">
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
                        rel="stylesheet"
                    />

                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#f3f4f6" />

                    <link rel="icon" type="image/png" href="/icon.png" />
                    <link rel="apple-touch-icon" href="/images/icon.png" />

                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/images/iPhone_14_Pro_Max_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/images/iPhone_14_Pro_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/images/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/images/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/images/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/images/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/iPhone_11__iPhone_XR_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        href="/images/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/12.9__iPad_Pro_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/10.9__iPad_Air_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/10.5__iPad_Air_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/10.2__iPad_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        href="/images/8.3__iPad_Mini_landscape.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/images/iPhone_14_Pro_Max_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/images/iPhone_14_Pro_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/images/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/images/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/images/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/images/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/iPhone_11__iPhone_XR_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        href="/images/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/12.9__iPad_Pro_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/10.9__iPad_Air_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/10.5__iPad_Air_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/10.2__iPad_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
                    />
                    <link
                        rel="apple-touch-startup-image"
                        media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        href="/images/8.3__iPad_Mini_portrait.png"
                    />

                    <link
                        rel="preconnect"
                        href="https://connect.facebook.net"
                    />

                    <Script id="facebook-pixel" strategy="afterInteractive">
                        {`
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                        `}
                    </Script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
