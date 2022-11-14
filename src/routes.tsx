import { Redirect, Route, Switch } from 'react-router-dom';

import { PAGE_URLS } from './constants/route';
import LandingPage from './routes/landing';
import SignInPage from './routes/signin';
import SignUpPage from './routes/signup';

function Routes() {
    return (
        <>
            <Switch>
                <Route
                    path={PAGE_URLS.SIGN_IN}
                    exact
                    render={() => <SignInPage />}
                />
                <Route
                    path={PAGE_URLS.SIGN_UP}
                    exact
                    render={() => <SignUpPage />}
                />
                <Route
                    path={PAGE_URLS.HOME}
                    exact
                    render={(props) => <LandingPage {...props} />}
                />
                <Redirect to={PAGE_URLS.HOME} />
            </Switch>
        </>
    );
}

export default Routes;
