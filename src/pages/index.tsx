import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
// import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useContext, useEffect, useRef, useState } from 'react'
import { Theme } from 'react-daisyui'
import Footer from '../components/Footer'
import { IData } from '../@types/api'
import { APIdata } from '../../context/ApiContext'
import CTA from '../components/CTA'
import Video from '../components/Player/Video'
import BlurImage from '../components/BlurImage'
import NavBar from '../components/NavBar'
// import Footer from "../components/Footer";

// const NavBar = dynamic(() => import('../components/NavBar'), { ssr: false })

export const getServerSideProps: GetServerSideProps<{
    data: IData
}> = async () => {
    if (process.env.NEXT_PUBLIC_API) {
        const res = await fetch(process.env.NEXT_PUBLIC_API)
        const data = await res.json()
        return {
            props: {
                data: data.data,
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
    const { api, setApi, videoTime } = useContext(APIdata)
    setApi(data)

    const [navbar, setNavbar] = useState(false)
    const [isContainerOne, setIsContainerOne] = useState(false)
    const boxRef = useRef<HTMLDivElement | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    const changeBackground = () => {
        const posX = boxRef.current?.offsetTop ?? 0
        if (posX !== undefined) {
            if (window.scrollY >= posX - 100) {
                setNavbar(true)
            } else {
                setNavbar(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeBackground, { passive: true })
        const EffectContainerOne = async () => {
            await new Promise((resolve) => setTimeout(resolve, 200))
            setIsContainerOne(true)
        }
        EffectContainerOne().then((r) => r)
    }, [])

    useEffect(() => {
        if (api && !api.vsl_mode) {
            setIsVisible(true)
        }

        if (api.vsl_mode && videoTime > api.vsl_time) {
            setIsVisible(true)
        } else if (api.vsl_mode && videoTime < api.vsl_time) {
            setIsVisible(false)
        }
    }, [api, setIsVisible, videoTime])

    return (
        api.id && (
            <Theme dataTheme={api.theme}>
                <Head>
                    <title>{`${api.company ?? 'Agente'} - ViajaFlux`}</title>
                    <meta
                        name={'description'}
                        content={
                            api && api.description
                                ? api.description
                                : 'ViajaFlux é a única plataforma com modelo de programa de fidelidade próprio que você lucra sem vender passagens e pacotes.'
                        }
                    />
                </Head>
                {isVisible && (
                    <NavBar
                        onColor={navbar}
                        logo={api.logo}
                        action_buttons={api.cta}
                        phone={api.phone}
                        email={api.email}
                        enable_popup={api.enable_popup}
                    />
                )}
                <div
                    id="vsl_mode"
                    className={`flex ${
                        !api.vsl_mode ? 'flex-col' : 'flex-col-reverse'
                    }`}
                >
                    {isVisible && (
                        <div id="home" className="bg-base-200">
                            <div className="grid md:grid-cols-2 gap-12 place-items-center justify-between container mx-auto px-8 py-12 md:py-32 max-w-7xl">
                                <div
                                    ref={boxRef}
                                    className="flex flex-col gap-6 md:gap-12"
                                >
                                    <div>
                                        <h1
                                            className={
                                                'font-semibold text-primary transition-all duration-300 sm:leading-tight text-2xl sm:text-5xl ' +
                                                (isContainerOne
                                                    ? 'ml-0'
                                                    : '-ml-[1500px]')
                                            }
                                        >
                                            {api.headline}
                                        </h1>
                                    </div>

                                    <p
                                        className={
                                            'text-base text-justify md:text-xl normal-case transition-all duration-700 max-w-3xl ' +
                                            (isContainerOne
                                                ? 'ml-0'
                                                : '-ml-[1500px]')
                                        }
                                    >
                                        {api.description}
                                    </p>

                                    <CTA
                                        phone={api.phone}
                                        action_buttons={api.cta}
                                        popup={api.enable_popup}
                                        className={
                                            'btn btn-sm btn-primary sm:btn-lg w-fit normal-case no-underline transition-all duration-1000 ' +
                                            (isContainerOne
                                                ? 'ml-0'
                                                : '-ml-[1500px]')
                                        }
                                    />
                                </div>
                                <div className="flex justify-center items-center rounded-xl relative w-full h-full min-h-[300px]">
                                    {api.main_image && (
                                        <BlurImage
                                            src={api.main_image}
                                            fill
                                            alt="banner"
                                            className="object-cover rounded-xl"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {api.video && api.video.includes('youtube') && (
                        <div
                            id="quem-somos"
                            className={`container mx-auto flex ${
                                isVisible ? 'py-32' : 'py-14'
                            } px-8 flex-col justify-center items-center bg-base-100`}
                        >
                            <h2 className="text-4xl text-primary font-semibold mb-8 text-center">
                                {api.company}
                            </h2>

                            {/*<div className="relative w-full h-full rounded-xl overflow-hidden">*/}
                            <Video id={extractVideo(api.video)} />
                            {/*</div>*/}

                            {isVisible && (
                                <CTA
                                    phone={api.phone}
                                    action_buttons={api.cta}
                                    popup={api.enable_popup}
                                    className={'w-64 mt-10 no-underline'}
                                />
                            )}
                        </div>
                    )}
                </div>

                {isVisible && (
                    <div
                        id="produtos"
                        className="w-full flex flex-col sm:flex-row gap-12 max-w-7xl mx-auto px-8 py-12"
                    >
                        <div className="w-full sm:w-6/12">
                            <h2 className="text-2xl text-primary font-semibold mb-4">
                                Produtos que você encontrará na {api.company}
                            </h2>

                            <div className="grid grid-cols-2 gap-6 mt-8">
                                {api.category &&
                                    api.category.map(
                                        (product: string, index: number) => (
                                            <div
                                                key={index}
                                                className="bg-base-200 flex items-center justify-center py-8 px-4 rounded-xl"
                                            >
                                                {product}
                                            </div>
                                        )
                                    )}
                            </div>
                        </div>
                        <div className="w-full sm:w-6/12">
                            <h3 className="text-2xl text-primary font-semibold mb-8">
                                {api.featured}: {api.title_of_featured_product}
                            </h3>
                            <p className="text-justify">
                                {api.description_of_featured_product}
                            </p>
                            <div className="relative flex justify-center items-center w-full h-72 rounded-xl mt-4">
                                {api.image_of_featured_product && (
                                    <BlurImage
                                        src={api.image_of_featured_product}
                                        fill
                                        alt="Produto em destaque"
                                        className="object-cover border-none rounded-xl"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {isVisible && <Footer />}
            </Theme>
        )
    )
}

function extractVideo(video: string) {
    const video_id = video.includes('v=')
        ? video.split('v=')[1]
        : video.split('youtu.be/')[1]
    const ampersandPosition = video_id.indexOf('&')
    if (ampersandPosition != -1) {
        return video_id.substring(0, ampersandPosition)
    }
    return video_id
}

export default Home
