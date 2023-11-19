import { useContext, useEffect, useState } from 'react'
import { APIdata } from '../../../context/ApiContext'

const ProgressBar = (props: { player: YT.Player | undefined }) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const { setVideoTime } = useContext(APIdata)

    useEffect(() => {
        const interval = setInterval(() => {
            if (props.player) {
                setCurrentTime(props.player.getCurrentTime())
                setDuration(props.player.getDuration())
                setVideoTime(props.player.getCurrentTime())
            }
        }, 100)

        return () => clearInterval(interval)
    }, [props.player])

    const getAccelerationFactor = (time: number, duration: number): number => {
        // Começa com um fator de aceleração alto e diminui com o tempo
        const maxFactor = 5
        const factor = maxFactor + (maxFactor - 1) * (1 - time / duration) ** 2
        // Limita o fator entre 1 e maxFactor
        return Math.min(Math.max(factor, 1), maxFactor)
    }

    const progress =
        100 *
        (1 -
            Math.pow(
                1 - currentTime / duration,
                getAccelerationFactor(currentTime, duration)
            ))

    return (
        <div className="absolute bottom-0 z-10 w-full h-5 px-2 py-1">
            <div
                className="h-full box-glow bg-gradient-to-r from-primary to-secondary transition-all duration-100 rounded-xl"
                style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
        </div>
    )
}

export default ProgressBar
