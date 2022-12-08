import { MainLoader } from 'src/components/Loader';
import useAuthHook from 'src/libs/hooks/auth.hook';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PAGE_URLS } from 'src/constants/route';

const SignOutPage = () => {
    const { onSignOut } = useAuthHook();

    const { push } = useHistory();

    useEffect(() => {
        onSignOut();
        push(PAGE_URLS.HOME);
    }, []);

    return (
        <>
            <MainLoader />
        </>
    );
};

export default SignOutPage;
