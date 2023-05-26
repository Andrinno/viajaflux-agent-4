/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-daisyui'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import Footer from '../components/Footer'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

const NavBar = dynamic(() => import('../components/NavBar'), { ssr: false })

type Data = {
    form: { 
         //id                : number,
         //user_id           : number,
         //email             : string,
         fantasy_name        : string,
         theme               : string,
         action_buttons      : string,
         //number_contact    : string,
         head_line           : string,
         business_description: string,
         video_link?         : string,
         featured_product    : string,
         instagram_link?     : string,
         linkedin_link?      : string,
         facebook_link?      : string,
         address             : string,
         cnpj?               : string,
         logo                : string,
         main_image          : string,
         image_footer        : string,
         //subdomain         : string,
         main_products       : Array<string>,
         payment_methods     : Array<string>,
     }
 };
 
 export const getServerSideProps: GetServerSideProps<{ data: Data }> = async () => {
    if(process.env.NEXT_PUBLIC_API) {
        const res = await fetch(process.env.NEXT_PUBLIC_API);
        const data = await res.json();
        
        return { 
            props: { 
               data
            } 
       };
    } else {
        const data = null;
        return { 
            props: { 
                data
            },
            redirect: {
                destination: 'https://www.viajaflux.com.br',
                permanent: false,
            },
        };
    }
   
 };

const Home: NextPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
                <title>ViajaFlux</title>
                <meta
                    name={'description'}
                    content={
                        'ViajaFlux é a única plataforma com modelo de programa de ' +
                        'fidelidade próprio que você lucra sem vender passagens e ' +
                        'pacotes.'
                    }
                />
            </Head>
            <NavBar onColor={navbar} logo={data.form.logo} action_buttons={data.form.action_buttons}/>
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
                                {data.form.head_line}
                            </h1>
                        </div>

                        <p
                            className={
                                'text-base text-justify md:text-xl text-[#555555] normal-case transition-all duration-700 max-w-3xl ' +
                                (isContainerOne ? 'ml-0' : '-ml-[1500px]')
                            }
                        >
                            {data.form.business_description}
                        </p>

                        <Link
                            href={`${process.env.NEXT_PUBLIC_URL}/register`}
                            className={
                                'btn btn-sm btn-primary sm:btn-lg w-fit normal-case text-base-100 no-underline transition-all duration-1000 ' +
                                (isContainerOne ? 'ml-0' : '-ml-[1500px]')
                            }
                        >
                            {data.form.action_buttons}
                        </Link>
                    </div>
                    <div className="flex justify-center items-center bg-gray-500 rounded-xl">
                        <Image
                            src={data.form.main_image}
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
                    Conheça a {data.form.fantasy_name}
                </h2>
                <span className="text-black">
                    {data.form.business_description}
                </span>
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
                    className="btn btn-primary mt-10 text-base-100 normal-case w-64 no-underline"
                >
                    {data.form.action_buttons}
                </Link>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-20 max-w-7xl mx-auto px-8 py-24 bg-white">
                <div className="w-full sm:w-6/12">
                    <h2 className="text-4xl text-primary font-semibold mb-4">
                        Produtos selecionados pelo agente para aparecer na tela.
                    </h2>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="bg-gray-100 flex items-center justify-center py-8 px-4 rounded-xl border">
                            {data.form.main_products[0]}
                        </div>
                        <div className="bg-gray-100 flex items-center justify-center py-8 px-4 rounded-xl border">
                            {data.form.main_products[1]}
                        </div>
                        <div className="bg-gray-100 flex items-center justify-center py-8 px-4 rounded-xl border">
                            {data.form.main_products[2]}
                        </div>
                        <div className="bg-gray-100 flex items-center justify-center py-8 px-4 rounded-xl border">
                            {data.form.main_products[3]}
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-6/12">
                    <h3 className="text-2xl text-primary font-semibold my-4">
                        {data.form.featured_product}
                    </h3>
                </div>
            </div>

            <Footer 
                instagram_link={data.form.instagram_link}
                facebook_link={data.form.facebook_link}
                linkedin_link={data.form.linkedin_link}
                video_link={data.form.video_link}
                fantasy_name={data.form.fantasy_name}
                address={data.form.address}
                cnpj={data.form.cnpj}
                image_footer={data.form.image_footer}
                payment_methods={data.form.payment_methods}
            />
        </>
    )
}

export default Home
