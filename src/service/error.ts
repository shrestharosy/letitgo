import { AxiosResponse } from 'axios';
import { PAGE_URLS } from 'src/constants/route';

interface IAxiosErrorData {
    statusCode: string;
    status: string;
    timestamp: string;
    detail: string;
    debugMessage: string;
}

interface IParsedError {
    message: string;
    status: number;
}

function parseClientError(error: AxiosResponse<IAxiosErrorData>): IParsedError {
    let parsedError = {
        message: 'Something is wrong in client end',
        status: error.status,
    };
    if (error.status === 403) {
        if (
            error.data.detail.includes(
                'Unauthorized user or JWT Token Malformed'
            )
        ) {
            window.location.href = PAGE_URLS.SIGN_OUT;
        }
        console.log(error.data.detail);
        parsedError.message = `Uh oh. Please log out.`;
    } else if (error.status === 400) {
        parsedError.message = error.data.detail;
    } else if (error.status === 401) {
        // auth.performLogout();
        window.location.href = PAGE_URLS.SIGN_OUT;
        parsedError.message = error.data.detail;
    } else if (error.status === 404) {
        parsedError.message = error.data.detail;
    } else if (error.status === 422) {
        parsedError.message = error.data.detail;
    }
    return parsedError;
}

function parseServerError(error: AxiosResponse<IAxiosErrorData>): IParsedError {
    let parsedError = {
        message: 'Something is wrong with the server',
        status: error.status,
    };
    return parsedError;
}

export default function parseErrorMessage(
    error: AxiosResponse<IAxiosErrorData>
): IParsedError {
    let parsedError = {
        message: 'Something went wrong',
        status: error.status,
    };
    if (`${error.status}`.charAt(0) === '4') {
        parsedError = parseClientError(error);
    } else if (`${error.status}`.charAt(0) === '5') {
        parsedError = parseServerError(error);
    }

    return parsedError;
}
