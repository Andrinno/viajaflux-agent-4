import { createContext, useState } from 'react'

export const APIdata = createContext({} as any)

export default function ApiContext({ children }: any) {
    const [api, setApi] = useState({})
    const [videoTime, setVideoTime] = useState(0)
    return (
        <APIdata.Provider value={{ api, setApi, videoTime, setVideoTime }}>
            {children}
        </APIdata.Provider>
    )
}
