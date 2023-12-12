import React, { createContext, useState } from 'react'

export const GlobalContext = createContext({})

export default function GlobalProvider({ children }) {
    const [token, setToken] = useState(null)
    return (
        <GlobalContext.Provider value={{ token, setToken }}>
            {children}
        </GlobalContext.Provider>
    )
}
