import { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import BlurImage from '../BlurImage'
import ProgressBar from './ProgressBar'

export default function Video(props: {
    id: string
    cover?: string
    autoPlay?: boolean
}) {
    const [videoStarted, setVideoStarted] = useState(false)
    const [videoPaused, setVideoPaused] = useState(false)
    const [videoPlayer, setVideoPlayer] = useState<YT.Player>()
    const playerRef = useRef<YouTube>(null)

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
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
            controls: 0,
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
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 cursor-pointer"
                    onClick={handleStartVideo}
                >
                    <div className="w-60 h-36 rounded-xl bg-primary/80 animate-pulse flex items-center justify-center flex-col gap-2 p-8 text-center">
                        <span className="text-white">
                            Clique aqui para assistir!
                        </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-24 h-24 text-white ml-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            />
                        </svg>
                    </div>
                </div>
                {/* Imagem do vídeo */}
                <div className="relative w-full h-full">
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
                    <div id={'vsl'}>
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
                                            <div className="w-full h-full animate-pulse rounded-xl bg-primary/80 flex items-center justify-center flex-col gap-2 p-4 text-center">
                                                <span className="text-white">
                                                    Continue assistindo!
                                                </span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-24 h-24 text-white ml-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                                                    />
                                                </svg>
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
