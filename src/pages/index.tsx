import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-daisyui'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import Footer from '../components/Footer'
import { IData } from '../@types/api'
import { APIdata } from '../../context/ApiContext'
// import Footer from "../components/Footer";

const NavBar = dynamic(() => import('../components/NavBar'), { ssr: false })

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
    const { api, setApi } = useContext(APIdata)
    setApi(data)

    const [navbar, setNavbar] = useState(false)
    const [isContainerOne, setIsContainerOne] = useState(false)
    const [isContainerDiff, setIsContainerDiff] = useState(false)
    const [isContainerFornec, SetIsContainerFornec] = useState(false)
    const boxRef = useRef<HTMLDivElement | null>(null)
    const boxRefDiff = useRef<HTMLDivElement | null>(null)
    const boxRefFornec = useRef<HTMLDivElement | null>(null)

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

    const changeContainerDiff = async () => {
        const postHeight = boxRefDiff.current?.offsetTop
        if (postHeight !== undefined) {
            if (window.scrollY >= postHeight - 100) {
                setIsContainerDiff(true)
            }
        }
    }

    const changeContainerFornec = async () => {
        const postHeight = boxRefFornec.current?.offsetTop
        if (postHeight !== undefined) {
            if (window.scrollY >= postHeight + 100) {
                SetIsContainerFornec(true)
            }
        }
    }

    useEffect(() => {
        const EffectContainerOne = async () => {
            await new Promise((resolve) => setTimeout(resolve, 200))
            setIsContainerOne(true)
        }
        EffectContainerOne().then((r) => r)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', changeBackground, { passive: true })
        window.addEventListener('scroll', changeContainerDiff, {
            passive: true,
        })
        window.addEventListener('scroll', changeContainerFornec, {
            passive: true,
        })
    }, [])

    return (
        <>
            <Head>
                <title>{api.company} - ViajaFlux</title>
                <meta
                    name={'description'}
                    content={
                        'ViajaFlux é a única plataforma com modelo de programa de ' +
                        'fidelidade próprio que você lucra sem vender passagens e ' +
                        'pacotes.'
                    }
                />
            </Head>

            <NavBar onColor={navbar} logo={api.logo} action_buttons={api.cta} />

            <div id="home" className="bg-base-200">
                <div className="grid md:grid-cols-2 gap-12 place-items-center md:h-screen justify-between max-w-7xl mx-auto px-8 pt-28 pb-20">
                    <div ref={boxRef} className="flex flex-col gap-12 max-w-xl">
                        <div>
                            <h1
                                className={
                                    'font-semibold text-primary transition-all duration-300 sm:leading-tight text-2xl sm:text-5xl ' +
                                    (isContainerOne ? 'ml-0' : '-ml-[1500px]')
                                }
                            >
                                {api.headline}
                            </h1>
                        </div>

                        <p
                            className={
                                'text-base text-justify md:text-xl normal-case transition-all duration-700 max-w-3xl ' +
                                (isContainerOne ? 'ml-0' : '-ml-[1500px]')
                            }
                        >
                            {api.description}
                        </p>

                        <Link
                            href={`${process.env.NEXT_PUBLIC_URL}/register`}
                            className={
                                'btn btn-sm btn-primary sm:btn-lg w-fit normal-case no-underline transition-all duration-1000 ' +
                                (isContainerOne ? 'ml-0' : '-ml-[1500px]')
                            }
                        >
                            {api.cta}
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-gray-500 rounded-xl">
                        <Image
                            src={api.main_image}
                            quality={100}
                            width={600}
                            height={600}
                            alt="banner"
                            className="max-h-[600px] object-contain"
                        />
                    </div>
                </div>
            </div>
            <div
                id="como-funciona"
                className="flex py-14 px-8 flex-col text-center justify-center items-center bg-base-100"
            >
                <h2 className="text-4xl text-primary font-semibold mb-2">
                    Conheça a {api.company}
                </h2>
                <span>{api.description}</span>
                <div className="w-full flex justify-center mx-auto mt-10 px-4">
                    <div className="max-w-4xl w-full flex mx-auto">
                        <div className="w-full flex justify-center">
                            <div className="w-full h-auto relative flex">
                                <div className="relative w-full h-full rounded-xl overflow-hidden">
                                    <LiteYouTubeEmbed
                                        id="dWSNPFb1inY"
                                        title="Apresentação - ViajaFlux"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link
                    href="#"
                    target={'_blank'}
                    className="btn btn-primary mt-10 normal-case w-64 no-underline"
                >
                    {api.cta}
                </Link>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-20 max-w-7xl mx-auto px-8 py-24">
                <div className="w-full sm:w-6/12">
                    <h2 className="text-4xl text-primary font-semibold mb-4">
                        Produtos selecionados pelo agente para aparecer na tela.
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
                    <h3 className="text-2xl text-primary font-semibold my-4">
                        {api.featured}
                    </h3>
                    <p className="text-justify">
                        {api.title_of_featured_product}
                    </p>
                    <p className="text-justify">
                        {api.description_of_featured_product}
                    </p>
                    <div className="relative flex justify-center items-center bg-base-200 rounded-xl">
                        <Image
                            src={api.image_of_featured_product}
                            quality={100}
                            width={600}
                            height={600}
                            alt="Produto em destaque"
                            className="max-h-[300px] object-cover border-none"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Home
