import type { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { PAGE_URLS } from 'src/constants/route';
import { checkIfLoggedInUser } from 'src/libs/utils/auth.util';

type withAuthenticationFn = (Component: FC<any>) => FC;

const withPublicPage: withAuthenticationFn = (Component) => {
    const Authenticated: FC = (props: any): JSX.Element | null => {
        let isAuthenticated;

        isAuthenticated = checkIfLoggedInUser();

        return !isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to={PAGE_URLS.HOME} />
        );
    };

    return Authenticated;
};

export default withPublicPage;
