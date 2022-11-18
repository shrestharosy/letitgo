import * as yup from 'yup';

const signUpSchema = yup.object().shape({
    firstName: yup.string().required('Please enter first name'),
    lastName: yup.string().required('Please enter last name'),
    username: yup.string().required('Please enter username'),
    email: yup
        .string()
        .email('Invalid email')
        .required('Please enter an email'),
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

export default signUpSchema;
