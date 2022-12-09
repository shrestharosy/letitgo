import * as yup from 'yup';

export const requestTokenSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email')
        .required('Please enter an email'),
});

export const verifyTokenSchema = yup.object().shape({
    code: yup.string().required('Please enter a code'),
});

export const resetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required("It's for your own security")
        .min(6, 'So weak. Make it atleast 6 characters')
        .max(32, 'Too long. Keep it within 32 characters'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], "Oh no! The passwords don't match")
        .required('Please confirm password'),
});
