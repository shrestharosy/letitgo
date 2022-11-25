import { IUserProfile } from '../user/user.type';

interface IBaseUser {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface ISignUp extends IBaseUser {
    password: string;
    confirmPassword: string;
}

export interface ISignUpResponse extends IBaseUser {}

export interface ISignIn {
    username: string;
    password: string;
}

export interface ISignInResponse extends IUserProfile {
    token: string;
}
