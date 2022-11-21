export interface IBaseSignUp {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
}

export interface ISignUp extends IBaseSignUp {
    password: string;
    confirmPassword: string;
}

export interface ISignUpResponse extends IBaseSignUp {}

export interface ISignIn {
    username: string;
    password: string;
}

export interface ISignInResponse {
    token: string;
}
