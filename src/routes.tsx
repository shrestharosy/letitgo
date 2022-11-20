import { Redirect, Route, Switch } from 'react-router-dom';

import { PAGE_URLS } from './constants/route';
import LandingPage from './routes/landing';
import ProductDetailPage from './routes/product';
import SignInPage from './routes/signin';
import SignUpPage from './routes/signup';
import Upload from './routes/upload';

interface IRoute {
    path: string;
    component: JSX.Element;
    exact: boolean;
}

const routes: Array<IRoute> = [
    {
        path: PAGE_URLS.SIGN_IN,
        exact: true,
        component: <SignInPage />,
    },
    {
        path: PAGE_URLS.SIGN_UP,
        exact: true,
        component: <SignUpPage />,
    },
    {
        path: PAGE_URLS.HOME,
        exact: true,
        component: <LandingPage />,
    },
    {
        path: PAGE_URLS.USER.UPLOAD,
        exact: true,
        component: <Upload />,
    },
    {
        path: PAGE_URLS.PRODUCT.DETAIL,
        exact: true,
        component: <ProductDetailPage />,
    },
];

function Routes() {
    return (
        <>
            <Switch>
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        render={() => route.component}
                    />
                ))}

                <Redirect to={PAGE_URLS.HOME} />
            </Switch>
        </>
    );
}

export default Routes;
