import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from 'src/context/auth.context';
import NotifyContextProvider from 'src/context/notify';
import App from './App';
import './assets/scss/argon-design-system-react.scss';
import './assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/vendor/nucleo/css/nucleo.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        {/* <React.StrictMode> */}
            <AppContextProvider>
                <NotifyContextProvider>
                    <App />
                </NotifyContextProvider>
            </AppContextProvider>
        {/* </React.StrictMode> */}
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
