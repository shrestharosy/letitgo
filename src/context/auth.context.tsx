import { createContext, useContext, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import { checkIfLoggedInUser } from 'src/libs/utils/auth.util';

interface IContext {
    isLoggedIn: Boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<IContext>({
    isLoggedIn: false,
    setIsLoggedIn: null,
});

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(checkIfLoggedInUser());
    }, [isLoggedIn]);

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
