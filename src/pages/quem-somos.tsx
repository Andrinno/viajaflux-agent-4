// import type { NextPage } from 'next'
// import dynamic from 'next/dynamic'
// import Head from 'next/head'
// import Image from 'next/image'
// import { useEffect, useRef, useState } from 'react'
// import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
// import PeopleImg from '../assets/images/people.webp'
// import Footer from '../components/Footer'

// const NavBar = dynamic(() => import('../components/NavBar'), { ssr: false })

const QuemSomos: () => void = () => {
    // const [navbar, setNavbar] = useState(false)
    // const [isContainerOne, setIsContainerOne] = useState(false)
    // const [isContainerDiff, setIsContainerDiff] = useState(false)
    // const [isContainerFornec, SetIsContainerFornec] = useState(false)
    // const boxRef = useRef<HTMLDivElement | null>(null)
    // const boxRefDiff = useRef<HTMLDivElement | null>(null)
    // const boxRefFornec = useRef<HTMLDivElement | null>(null)
    //
    // const changeBackground = () => {
    //     const posX = boxRef.current?.offsetTop ?? 0
    //     if (posX !== undefined) {
    //         if (window.scrollY >= posX - 100) {
    //             setNavbar(true)
    //         } else {
    //             setNavbar(false)
    //         }
    //     }
    // }
    //
    // const changeContainerDiff = async () => {
    //     const postHeight = boxRefDiff.current?.offsetTop
    //     if (postHeight !== undefined) {
    //         if (window.scrollY >= postHeight - 100) {
    //             setIsContainerDiff(true)
    //         }
    //     }
    // }
    //
    // const changeContainerFornec = async () => {
    //     const postHeight = boxRefFornec.current?.offsetTop
    //     if (postHeight !== undefined) {
    //         if (window.scrollY >= postHeight + 100) {
    //             SetIsContainerFornec(true)
    //         }
    //     }
    // }
    //
    // useEffect(() => {
    //     const EffectContainerOne = async () => {
    //         await new Promise((resolve) => setTimeout(resolve, 200))
    //         setIsContainerOne(true)
    //     }
    //     EffectContainerOne().then((r) => r)
    // }, [])
    //
    // useEffect(() => {
    //     window.addEventListener('scroll', changeBackground, { passive: true })
    //     window.addEventListener('scroll', changeContainerDiff, {
    //         passive: true,
    //     })
    //     window.addEventListener('scroll', changeContainerFornec, {
    //         passive: true,
    //     })
    // }, [])
    //
    // return (
    //     <>
    //         <Head>
    //             <title>Quem somos</title>
    //             <meta
    //                 name={'description'}
    //                 content={
    //                     'ViajaFlux é a única plataforma com modelo de programa de ' +
    //                     'fidelidade próprio que você lucra sem vender passagens e ' +
    //                     'pacotes.'
    //                 }
    //             />
    //         </Head>
    //         <NavBar
    //             onColor={navbar}
    //             logo={data.logo}
    //             action_buttons={data.cta}
    //         />
    //         <div id="home" className="bg-base-200">
    //             <div className="grid md:grid-cols-2 gap-12 place-items-center md:h-screen justify-between max-w-7xl mx-auto px-8 pt-28 pb-20">
    //                 <div className="flex justify-center items-center bg-gray-500 rounded-xl">
    //                     <Image
    //                         src={PeopleImg}
    //                         quality={100}
    //                         width={600}
    //                         height={600}
    //                         alt="banner"
    //                         className="max-h-[600px] object-contain"
    //                     />
    //                 </div>
    //                 <div ref={boxRef} className="flex flex-col gap-12 max-w-xl">
    //                     <div>
    //                         <h1
    //                             className={
    //                                 'font-semibold text-primary transition-all duration-300 sm:leading-tight text-2xl sm:text-5xl ' +
    //                                 (isContainerOne ? 'ml-0' : 'ml-[1500px]')
    //                             }
    //                         >
    //                             Headline: Lorem ipsum dolor sit amet, consnid
    //                             est laborum.
    //                         </h1>
    //                     </div>
    //
    //                     <p
    //                         className={
    //                             'text-base text-justify md:text-xl text-[#555555] normal-case transition-all duration-700 max-w-3xl ' +
    //                             (isContainerOne ? 'ml-0' : 'ml-[1500px]')
    //                         }
    //                     >
    //                         Espaço para descrição: Lorem ipsum dolor sit amet,
    //                         consectetur adipiscing elit, sed do eiusmod tempor
    //                         incididunt ut labore et dolore magna aliqua
    //                         sdffdbvfbs.
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //
    //         <Footer />
    //     </>
    // )
}

export default QuemSomos
