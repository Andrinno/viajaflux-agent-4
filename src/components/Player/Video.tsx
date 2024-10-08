import React, { useContext, useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import ProgressBar from './ProgressBar'
import BlurImage from '../BlurImage'
import { APIdata } from '../../../context/ApiContext'

export default function Video(props: {
    id: string
    cover?: string
    autoPlay?: boolean
}) {
    const [videoStarted, setVideoStarted] = useState(false)
    const [videoPaused, setVideoPaused] = useState(false)
    const [videoPlayer, setVideoPlayer] = useState<YT.Player>()
    const playerRef = useRef<YouTube>(null)

    const { api } = useContext(APIdata)

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Inicia o vídeo no mobile
    useEffect(() => {
        if (isMobile) {
            handleStartVideo()
            setVideoPaused(true)
        }
    }, [isMobile])
    // Inicia o vídeo no mobile

    const onReady = (event: YT.PlayerEvent) => {
        setVideoPlayer(event.target)
    }

    const handleStartVideo = () => {
        setVideoStarted(true)
    }

    const toggleVideoPause = () => {
        document.getElementById('loading')?.classList.add('hidden')

        const player = playerRef.current?.getInternalPlayer()
        if (videoPaused) {
            player.playVideo()
            setVideoPaused(false)
        } else {
            player.pauseVideo()
            setVideoPaused(true)
        }
    }

    const opts = {
        playerVars: {
            autoplay: 1,
            playsInline: 1,
            rel: 0,
            controls: 0,
            loop: 1,
        },
    }

    const mutedOpts = {
        playerVars: {
            autoplay: 1,
            rel: 0,
            controls: 0,
            loop: 1,
            mute: isMobile ? 0 : 1,
        },
    }

    useEffect(() => {
        if (props.autoPlay) {
            handleStartVideo()
        }
    }, [props.autoPlay])

    return (
        <div className="w-full h-auto relative flex">
            <div
                className={`absolute top-0 left-0 w-full h-full bg-black rounded-xl grid place-content-center ${
                    videoStarted ? 'block' : 'hidden'
                }`}
            >
                <div id="loading" className={`btn loading`}>
                    Carregando
                </div>
            </div>
            <div
                className={`absolute top-0 left-0 w-full h-full ${
                    !videoStarted ? 'block' : 'hidden'
                }`}
            >
                {/* Imagem Inicial */}
                {/* play */}

                <div
                    className={`transition-all delay-[2s] w-full aspect-video rounded-xl overflow-hidden box-glow`}
                >
                    <div className={'player'}>
                        <YouTube
                            videoId={props.id}
                            opts={mutedOpts}
                            onEnd={() => setVideoStarted(false)}
                            ref={playerRef}
                            onReady={onReady}
                            className={`absolute top-0 left-0 w-full h-full aspect-video transition opacity-0 ${
                                videoPaused
                                    ? 'opacity-0'
                                    : 'opacity-100 duration-1000'
                            }`}
                        />
                    </div>
                </div>

                <div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 cursor-pointer"
                    onClick={handleStartVideo}
                >
                    <div
                        style={{ backgroundColor: `${api.bg_color}` }}
                        className={`relative w-48 h-32 sm:w-96 sm:h-52 text-xs sm:text-lg rounded-xl border-2 border-white flex items-center justify-between flex-col gap-2 p-4 text-center`}
                    >
                        <span className="text-white font-semibold">
                            Clique aqui
                        </span>
                        <div className={'relative w-full h-24'}>
                            <BlurImage
                                fill
                                src={'/muted.svg'}
                                alt={'Muted'}
                                className={'animate-ping'}
                            />
                            <BlurImage
                                fill
                                src={'/muted.svg'}
                                alt={'Muted'}
                                className={'opacity-20'}
                            />
                        </div>
                        <span className="text-white font-semibold">
                            para ativar o som
                        </span>
                    </div>
                </div>
                {/* Imagem do vídeo */}
                <div className="top-0 absolute w-full h-full -z-10">
                    <BlurImage
                        fill
                        src={
                            props.cover
                                ? props.cover
                                : `https://i.ytimg.com/vi/${props.id}/maxresdefault.jpg`
                        }
                        alt="Video"
                        priority
                        onClick={handleStartVideo}
                        className="cursor-pointer object-cover rounded-xl"
                    />
                </div>
            </div>
            <div
                className={`opacity-0 ${
                    videoStarted && 'opacity-100 transition-all delay-[2s]'
                } w-full aspect-video rounded-xl overflow-hidden box-glow`}
            >
                {videoStarted ? (
                    <div className={'player'}>
                        <div
                            className="absolute w-full h-full z-10 cursor-pointer"
                            onClick={toggleVideoPause}
                        >
                            <div
                                className={`z-50 absolute top-0 left-0 w-full h-full transition ${
                                    videoPaused
                                        ? 'opacity-100'
                                        : 'opacity-100 duration-1000'
                                }`}
                            >
                                {/* Imagem do vídeo pausado */}

                                {videoPaused && (
                                    <>
                                        <div
                                            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 cursor-pointer"
                                            onClick={handleStartVideo}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor: `${api.bg_color}`,
                                                }}
                                                className="relative w-48 h-32 sm:w-96 sm:h-52 text-xs sm:text-lg rounded-xl border-2 border-white flex items-center justify-between flex-col gap-2 p-4 text-center"
                                            >
                                                <span className="text-white font-semibold">
                                                    Clique aqui
                                                </span>
                                                <div
                                                    className={
                                                        'relative w-full h-24'
                                                    }
                                                >
                                                    <BlurImage
                                                        fill
                                                        src={'/muted.svg'}
                                                        alt={'Muted'}
                                                        className={
                                                            'animate-ping'
                                                        }
                                                    />
                                                    <BlurImage
                                                        fill
                                                        src={'/muted.svg'}
                                                        alt={'Muted'}
                                                        className={'opacity-20'}
                                                    />
                                                </div>
                                                <span className="text-white font-semibold">
                                                    para continuar assistindo
                                                </span>
                                            </div>
                                        </div>

                                        <div className="relative w-full h-full">
                                            <BlurImage
                                                src={
                                                    props.cover
                                                        ? props.cover
                                                        : `https://i.ytimg.com/vi/${props.id}/maxresdefault.jpg`
                                                }
                                                fill
                                                priority
                                                alt="Video"
                                                className="object-cover rounded-xl"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <YouTube
                            videoId={props.id}
                            opts={opts}
                            onEnd={() => setVideoStarted(false)}
                            ref={playerRef}
                            onReady={onReady}
                            className={`absolute top-0 left-0 w-full h-full aspect-video transition opacity-0 ${
                                videoPaused
                                    ? 'opacity-0'
                                    : 'opacity-100 duration-1000'
                            }`}
                        />
                        <ProgressBar player={videoPlayer} />
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
