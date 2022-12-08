import type { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { PAGE_URLS } from 'src/constants/route';
import { checkIfLoggedInUser } from 'src/libs/utils/auth.util';
import useAuthHook from '../hooks/auth.hook';

type withAuthenticationFn = (Component: FC<any>) => FC;

const withProtectedPage: withAuthenticationFn = (Component) => {
    const Authenticated: FC = (props: any): JSX.Element | null => {
        const { push } = useHistory();
        const { onSignOut } = useAuthHook();

        let isAuthenticated;

        isAuthenticated = checkIfLoggedInUser();

        if (!isAuthenticated) {
            onSignOut();
            push(PAGE_URLS.SIGN_IN);
        }

        return isAuthenticated ? <Component {...props} /> : null;
    };

    return Authenticated;
};

export default withProtectedPage;
