import { Redirect, Route, Switch } from 'react-router-dom';

import Landing from 'src/views/landing';
import { PAGE_URLS } from './constants/route';
import SignIn from './views/account/SignIn';
import SignUp from './views/account/SignUp';

function Routes() {
    return (
        <>
            <Switch>
                <Route
                    path={PAGE_URLS.SIGN_IN}
                    exact
                    render={() => <SignIn />}
                />
                <Route
                    path={PAGE_URLS.SIGN_UP}
                    exact
                    render={() => <SignUp />}
                />
                <Route
                    path={PAGE_URLS.HOME}
                    exact
                    render={(props) => <Landing {...props} />}
                />
                <Redirect to={PAGE_URLS.HOME} />
            </Switch>
        </>
    );
}

export default Routes;
