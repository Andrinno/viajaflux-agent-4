import { createContext, useState } from 'react'

export const APIdata = createContext({} as any)

export default function ApiContext({ children }: any) {
    const [api, setApi] = useState({})

    return (
        <APIdata.Provider value={{ api, setApi }}>{children}</APIdata.Provider>
    )
}
