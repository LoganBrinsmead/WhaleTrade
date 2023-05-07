import { createContext, useState } from 'react';

export const GlobalContext = createContext({});

export function GlobalProvider({ children }) {
    const [ isAuth, setIsAuth ] = useState(false);

    return (
        <GlobalContext.Provider value={{ isAuth, setIsAuth }} >
            {children}
        </GlobalContext.Provider>
    );
}
