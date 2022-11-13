import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Landing from 'src/views/landing';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path='/'
                    exact
                    render={(props) => <Landing {...props} />}
                />
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
