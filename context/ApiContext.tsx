import { createContext, useState } from 'react'

export const APIdata = createContext({} as any)

export default function ApiContext({ children }: any) {
    const [api, setApi] = useState({})
    const [videoTime, setVideoTime] = useState(0)
    const eventId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)

    const [tags, setTags] = useState<string>('')
    const [funnel, setFunnel] = useState<number>()
    const [price, setPrice] = useState<number>(0)

    return (
        <APIdata.Provider
            value={{
                api,
                setApi,
                videoTime,
                setVideoTime,
                eventId,
                tags,
                setTags,
                funnel,
                setFunnel,
                price,
                setPrice,
            }}
        >
            {children}
        </APIdata.Provider>
    )
}
