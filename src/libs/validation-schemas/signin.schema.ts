import * as yup from 'yup';

const signInSchema = yup.object().shape({
    username: yup.string().required('Please enter username'),

    password: yup.string().required('Please enter password'),
});

export default signInSchema;
