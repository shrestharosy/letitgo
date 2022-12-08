import { useAppContext } from 'src/context/auth.context';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN, USER } from 'src/constants/storage.constant';
import storageUtilityInstance from 'src/libs/utils/storage.util';
import { useNotify } from 'src/context/notify';
import { useState } from 'react';
import { authService } from 'src/service/auth';
import { ISignIn } from 'src/service/auth/auth.type';
import { PAGE_URLS } from 'src/constants/route';

const useAuthHook = () => {
    const [isSignInLoading, setIsSignInLoading] = useState(false);

    const { setIsLoggedIn } = useAppContext();

    const { push } = useHistory();

    const { showError } = useNotify();

    const onSignIn = async (data: ISignIn) => {
        try {
            setIsSignInLoading(true);
            const { token, ...rest } = await authService.signIn(data);
            storageUtilityInstance.setItem(ACCESS_TOKEN, token);
            storageUtilityInstance.setItem(USER, JSON.stringify(rest));
            setIsLoggedIn(true);
            push(PAGE_URLS.USER.ACCOUNT);
        } catch (error) {
            showError(error.message);
        } finally {
            setIsSignInLoading(false);
        }
    };

    const onSignOut = () => {
        storageUtilityInstance.removeItem(ACCESS_TOKEN);
        setIsLoggedIn(false);
    };

    return { isSignInLoading, onSignIn, onSignOut };
};

export default useAuthHook;
