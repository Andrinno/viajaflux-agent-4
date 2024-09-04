import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import IData from '../@types/api'
import { APIdata } from '../../context/ApiContext'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Monaco from './monaco'
import Maldivas from './maldivas'
import fb from '../utils/fb'
import Head from 'next/head'
import Script from 'next/script'

export const getServerSideProps: GetServerSideProps<{
    data: IData
}> = async () => {
    if (process.env.NEXT_PUBLIC_API) {
        const res = await fetch(process.env.NEXT_PUBLIC_API, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
        })
        const data = await res.json()
        return {
            props: {
                data: data,
            },
        }
    } else {
        const data = null
        return {
            props: {
                data,
            },
            redirect: {
                destination: 'https://www.viajaflux.com.br',
                permanent: false,
            },
        }
    }
}

const Home = ({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [loading, setLoading] = useState(false)

    const {
        api,
        setApi,
        eventId,
        tags,
        funnel,
        setFunnel,
        price,
        setPrice,
        setTags,
    } = useContext(APIdata)

    useEffect(() => {
        setApi(data)
        setTags(data.tags)
        setPrice(data.ticket)
        setFunnel(data.board_id)
    }, [data, setApi])

    const [utmObj, setUtmObj] = useState({
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: '',
    })

    useEffect(() => {
        if (eventId) {
            if (process.env.NODE_ENV === 'production') {
                fb(
                    api.pixel_id,
                    api.token,
                    'PageView',
                    'PageView' + eventId
                ).then((r) => r)
            }
        }

        const urlParams = new URLSearchParams(window.location.search)
        setUtmObj({
            utm_source: urlParams.get('utm_source') || '',
            utm_medium: urlParams.get('utm_medium') || '',
            utm_campaign: urlParams.get('utm_campaign') || '',
            utm_term: urlParams.get('utm_term') || '',
            utm_content: urlParams.get('utm_content') || '',
        })
    }, [eventId])

    const schema = yup.object().shape({
        name: yup.string().required('Por favor, informe o seu nome.'),
        email: yup
            .string()
            .email('Por favor, informe um e-mail válido.')
            .required('Por favor, informe o seu e-mail.'),
        whatsapp: yup
            .string()
            .required('Por favor, informe o seu número de telefone.')
            .matches(
                /^\(\d{2}\) \d{5}-\d{4}$/,
                'Por favor, informe um número de telefone válido (exemplo: (99) 99999-9999).'
            ),
    })

    function handleInputChange(event: {
        target: { value: SetStateAction<string> }
    }) {
        setWhatsapp(event.target.value)
    }

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        setLoading(true)

        try {
            await schema
                .validate({ name, email, whatsapp }, { abortEarly: false })
                .then(async () => {
                    if (process.env.NEXT_PUBLIC_API) {
                        console.log(process.env.NEXT_PUBLIC_API)
                        await fetch(process.env.NEXT_PUBLIC_API, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
                            },
                            body: JSON.stringify({
                                name,
                                email,
                                whatsapp,
                                tags,
                                price,
                                funnel,
                            }),
                        })
                        if (process.env.NODE_ENV === 'production') {
                            fb(
                                api.pixel_id,
                                api.token,
                                'Lead',
                                'Lead' + eventId,
                                name,
                                email,
                                whatsapp
                            ).then((r) => r)
                        }

                        setLoading(false)
                    }
                    window.location.href = `https://wa.me/${api.country_code}${api.phone}`
                })
        } catch (error) {
            console.log(error)
            if (error instanceof yup.ValidationError) {
                const validationErrors = error.inner.map(
                    (error) => error.message
                )
                validationErrors.forEach((message) => {
                    toast.error(message)
                })
                setLoading(false)
            } else {
                setLoading(false)
                window.location.href = `https://wa.me/${api.country_code}${api.phone}`
            }
        }
    }

    const params = {
        ...{
            api,
            loading,
            handleSubmit,
            handleInputChange,
            setName,
            setEmail,
            setWhatsapp,
            name,
            email,
            whatsapp,
        },
    }

    const isMaldivasTheme = api.template === 'maldivas'

    return (
        <>
            <Head>
                {api.google && api.gtm && (
                    <Script id="google-gtm">
                        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer',${api.gtm});
                    `}
                    </Script>
                )}

                {api.google && api.analytics && (
                    <Script id="google-analytics">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', '${api.analytics}');
                        `}
                    </Script>
                )}
            </Head>
            {isMaldivasTheme
                ? api?.id && <Maldivas params={params} />
                : api?.id && <Monaco params={params} />}
        </>
    )
}

export default Home
