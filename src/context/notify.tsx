import React, { useContext } from 'react';
import NotificationAlert from 'react-notification-alert';

const NotifyContext = React.createContext(null);

export const useNotify = () => {
    return useContext(NotifyContext);
};

const Notification = ({ children }: { children: JSX.Element }) => {
    const notificationAlertRef = React.useRef(null);

    const showSuccess = (title, message) => {
        let options = {
            place: 'tc',
            message: (
                <div className='alert-text'>
                    <span className='alert-title' data-notify='title'>
                        {title}
                    </span>
                    <span data-notify='message'>{message}</span>
                </div>
            ),
            type: 'success',
            icon: 'ni ni-bell-55',
            autoDismiss: 7,
        };
        notificationAlertRef.current.notificationAlert(options);
    };
    const showError = (title, message) => {
        let options = {
            place: 'tc',
            message: (
                <div className='alert-text'>
                    <span className='alert-title' data-notify='title'>
                        {title}
                    </span>
                    <span data-notify='message'>{message}</span>
                </div>
            ),
            type: 'danger',
            icon: 'ni ni-bell-55',
            autoDismiss: 7,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    const showInfo = (title, message) => {
        let options = {
            place: 'tc',
            message: (
                <div className='alert-text'>
                    <span className='alert-title' data-notify='title'>
                        {title}
                    </span>
                    <span data-notify='message'>{message}</span>
                </div>
            ),
            type: 'info',
            icon: 'ni ni-bell-55',
            autoDismiss: 7,
        };
        notificationAlertRef.current.notificationAlert(options);
    };

    return (
        <>
            <div className='rna-wrapper'>
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <NotifyContext.Provider
                value={{ showSuccess, showError, showInfo }}
            >
                {children}
            </NotifyContext.Provider>
        </>
    );
};

export default Notification;
