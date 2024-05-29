import Head from 'next/head'
import { Theme } from 'react-daisyui'
import Footer from '../components/Footer'
import CTA from '../components/CTA'
import Video from '../components/Player/Video'
import BlurImage from '../components/BlurImage'
import NavBar from '../components/NavBar'
import { InputMask } from '@react-input/mask'
import IData from '../@types/api'
import { useContext, useEffect, useRef, useState } from 'react'
import { APIdata } from '../../context/ApiContext'

interface MonacoProps {
    params: {
        api: IData
        loading: boolean
        handleSubmit: (event: any) => void
        handleInputChange: (event: any) => void
        setName: (value: string) => void
        setEmail: (value: string) => void
        email: string
        whatsapp: string
        name: string
    }
}
export default function Monaco(params: MonacoProps) {
    const {
        api,
        loading,
        handleSubmit,
        handleInputChange,
        setName,
        setEmail,
        email,
        whatsapp,
        name,
    } = params.params

    const [navbar, setNavbar] = useState(false)
    const [isContainerOne, setIsContainerOne] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [mainMedia, setMainMedia] = useState<any>([])
    const [featuredMedia, setFeaturedMedia] = useState<any>([])
    const boxRef = useRef<HTMLDivElement | null>(null)
    const { videoTime } = useContext(APIdata)

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
        if (
            !(
                (api && !api.vsl_mode) ||
                (api.vsl_mode && videoTime > api.vsl_time) ||
                (api.vsl_mode && !api.video)
            )
        ) {
            if (api.vsl_mode && api.video && videoTime < api.vsl_time) {
                setIsVisible(false)
            }
        } else {
            setIsVisible(true)
        }
    }, [videoTime])

    useEffect(() => {
        if (api?.media) {
            setMainMedia(
                api?.media.filter(
                    (media: any) => media.collection_name === 'main'
                )
            )
            setFeaturedMedia(
                api?.media.filter(
                    (media: any) => media.collection_name === 'featured'
                )
            )
        }
    }, [api])

    return (
        <Theme dataTheme={api.theme}>
            <Head>
                <title>{`${api.team.name ?? 'Agente'} - ViajaFlux`}</title>
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
                    logo={api.team.team_photo_url}
                    action_buttons={api.cta}
                    phone={`${api.country_code}${api.phone}`}
                    email={api.email}
                    enable_popup={api.enable_popup}
                />
            )}
            <div
                id="vsl_mode"
                className={`flex ${
                    !api.vsl_mode ? 'flex-col' : 'flex-col-reverse justify-end'
                } ${!isVisible && 'h-screen'}`}
            >
                {isVisible && (
                    <div id="home" className="bg-base-200">
                        <div className="container grid justify-between gap-12 px-8 py-12 mx-auto md:grid-cols-2 place-items-center md:py-32 max-w-7xl">
                            <div
                                ref={boxRef}
                                className="flex flex-col gap-6 md:gap-12"
                            >
                                <div>
                                    <h1
                                        style={{ color: api.bg_color }}
                                        className={
                                            `font-semibold transition-all duration-300 sm:leading-tight text-2xl sm:text-5xl ` +
                                            (isContainerOne
                                                ? 'ml-0'
                                                : '-ml-[1500px]')
                                        }
                                    >
                                        {api.head}
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
                                    phone={`${api.country_code}${api.phone}`}
                                    action_buttons={api.cta}
                                    popup={api.enable_popup}
                                    className={
                                        `btn btn-sm sm:btn-lg w-fit normal-case no-underline transition-all duration-1000 ` +
                                        (isContainerOne
                                            ? 'ml-0'
                                            : '-ml-[1500px]')
                                    }
                                />
                            </div>
                            <div className="flex justify-center items-center rounded-xl relative w-full h-full min-h-[300px]">
                                {mainMedia[0]?.original_url && (
                                    <BlurImage
                                        src={mainMedia[0].original_url}
                                        sizes="300px"
                                        fill
                                        alt="banner"
                                        className="object-contain object-top lg:object-cover rounded-xl"
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
                            isVisible ? 'pt-32 pb-12' : 'py-14'
                        } px-8 flex-col justify-center items-center bg-base-100`}
                    >
                        <h2
                            className="mb-8 text-4xl font-semibold text-center"
                            style={{ color: api.bg_color }}
                        >
                            {isVisible ? api.team.name : api.head}
                        </h2>

                        {/*<div className="relative w-full h-full overflow-hidden rounded-xl">*/}
                        <div className="max-w-4xl w-full aspect-video box-glow rounded-2xl">
                            <Video id={extractVideo(api.video)} />
                        </div>

                        {isVisible && (
                            <CTA
                                phone={`${api.country_code}${api.phone}`}
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
                    className="flex flex-col w-full gap-12 px-8 py-12 mx-auto sm:flex-row max-w-7xl"
                >
                    <div className="w-full sm:w-6/12">
                        <h2
                            className="mb-4 text-2xl font-semibold"
                            style={{ color: api.bg_color }}
                        >
                            Produtos que você encontrará na {api.team.name}
                        </h2>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            {api.products &&
                                api.products.map(
                                    (product: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-center px-4 py-8 bg-base-200 rounded-xl"
                                        >
                                            {product}
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                    <div className="w-full sm:w-6/12">
                        <h3
                            className="mb-8 text-2xl font-semibold"
                            style={{ color: api.bg_color }}
                        >
                            {api.featured}: {api.featured_title}
                        </h3>
                        <p className="text-justify">
                            {api.featured_description}
                        </p>
                        <div className="relative flex items-center justify-center w-full mt-4 h-72 rounded-xl">
                            {featuredMedia &&
                                featuredMedia[0]?.original_url && (
                                    <BlurImage
                                        src={featuredMedia[0].original_url}
                                        fill
                                        alt="Produto em destaque"
                                        className="object-contain object-top rounded-xl"
                                    />
                                )}
                        </div>
                    </div>
                </div>
            )}
            {isVisible && <Footer />}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="modal_lead" className="modal-toggle" />
            <label
                htmlFor="modal_lead"
                className="modal modal-bottom sm:modal-middle"
            >
                <label htmlFor="" className="relative modal-box box-glow">
                    <label
                        htmlFor="modal_lead"
                        className="absolute btn btn-ghost btn-circle right-3 top-3"
                    >
                        ✕
                    </label>
                    <h3 className="text-2xl font-bold">{api.cta}</h3>
                    <form
                        id="form"
                        className="grid gap-2 py-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome Completo"
                            className="w-full rounded-md input bg-base-200"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            className="w-full rounded-md input bg-base-200"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <InputMask
                            mask="(__) _____-____"
                            replacement={{ _: /\d/ }}
                            name="whatsapp"
                            value={whatsapp}
                            onChange={handleInputChange}
                            className="w-full rounded-md input bg-base-200"
                            placeholder="(XX) 9XXXX-XXXX"
                        />

                        <div className="flex justify-between modal-action">
                            <button
                                form="form"
                                type="submit"
                                className="border-none btn btn-block"
                                style={{
                                    backgroundColor: api.bg_color,
                                    color: api.color,
                                }}
                                disabled={loading}
                            >
                                {loading && (
                                    <svg
                                        className="w-5 h-5 mr-3 -ml-1 text-base-100 animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                )}
                                Continuar
                            </button>
                        </div>
                    </form>
                </label>
            </label>
        </Theme>
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
