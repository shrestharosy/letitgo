import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN } from 'src/constants/storage';
import storageUtilityInstance from 'src/libs/utils/storage';
import { useNotify } from 'src/context/notify';
import { useState } from 'react';
import { authService } from 'src/service/auth';
import { ISignIn } from 'src/service/auth/auth.type';
import { PAGE_URLS } from 'src/constants/route';

const useAuthHook = () => {
    const [isSignInLoading, setIsSignInLoading] = useState(false);

    const { push } = useHistory();

    const { showError } = useNotify();

    const onSignIn = async (data: ISignIn) => {
        try {
            setIsSignInLoading(true);
            const response = await authService.signIn(data);
            storageUtilityInstance.setItem(ACCESS_TOKEN, response.token);
            push(PAGE_URLS.USER.ACCOUNT);
        } catch (error) {
            showError(error.message);
        } finally {
            setIsSignInLoading(false);
        }
    };

    return { isSignInLoading, onSignIn };
};

export default useAuthHook;
