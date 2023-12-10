import React, { createContext } from 'react'

export const GlobalContext = createContext({})

export default function GlobalProvider({ children }) {
    return (
        <GlobalContext.Provider value={null}>
            {children}
        </GlobalContext.Provider>
    )
}
