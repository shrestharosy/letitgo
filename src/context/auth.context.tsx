import { createContext, useContext, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { checkIfLoggedInUser } from 'src/libs/utils/auth.util';

interface IContext {
    isAuthenticated: Boolean;
}

const AppContext = createContext<IContext>({
    isAuthenticated: false,
});

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(checkIfLoggedInUser());
    }, []);

    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
