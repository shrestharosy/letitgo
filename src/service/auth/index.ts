import {
    ISignIn,
    ISignUp,
    ISignUpResponse,
    ISignInResponse,
} from './auth.type';
import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';

const signUp = async (data: ISignUp) => {
    const {
        firstName: first_name,
        lastName: last_name,
        confirmPassword: confirm_password,
        ...rest
    } = data;
    const response: AxiosResponse<ISignUpResponse> = await axiosInstance.post(
        `auth/signup/`,
        {
            ...rest,
            first_name,
            last_name,
            confirm_password,
        }
    );
    return response.data;
};

const signIn = async (data: ISignIn) => {
    const response: AxiosResponse<ISignInResponse> = await axiosInstance.post(
        `auth/signin/`,
        { ...data }
    );
    return response.data;
};

const requestCodeForPasswordReset = async (email: string) => {
    const response: AxiosResponse<ISignInResponse> = await axiosInstance.post(
        `auth/password/reset/`,
        { email }
    );
    return response.data;
};

const verifyResetCode = async (token: string) => {
    const response: AxiosResponse<ISignInResponse> = await axiosInstance.post(
        `auth/password/reset/validate_token/`,
        { token }
    );
    return response.data;
};

const resetPassword = async (token: string, password: string) => {
    const response: AxiosResponse<ISignInResponse> = await axiosInstance.post(
        `auth/password/reset/confirm/`,
        { token, password }
    );
    return response.data;
};

export const authService = {
    signUp,
    signIn,
    requestCodeForPasswordReset,
    verifyResetCode,
    resetPassword,
};
