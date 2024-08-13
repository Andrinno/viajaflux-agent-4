import { createContext, useState } from 'react'

export const APIdata = createContext({} as any)

export default function ApiContext({ children }: any) {
    const [api, setApi] = useState({})
    const [videoTime, setVideoTime] = useState(0)
    const eventId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)

    return (
        <APIdata.Provider
            value={{ api, setApi, videoTime, setVideoTime, eventId }}
        >
            {children}
        </APIdata.Provider>
    )
}
