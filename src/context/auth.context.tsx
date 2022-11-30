import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { checkIfLoggedInUser } from 'src/libs/utils/auth.util';

interface IContext {
    isLoggedIn: Boolean;
    category: string;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<IContext>({
    isLoggedIn: false,
    category: null,
    setIsLoggedIn: null,
    setCategory: null
});

const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [category, setCategory] = useState<string>(null);

    useEffect(() => {
        setIsLoggedIn(checkIfLoggedInUser());
    }, [isLoggedIn]);

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                category,
                setIsLoggedIn,
                setCategory
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
