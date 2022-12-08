import * as yup from 'yup';

const productSchema = yup.object().shape({
    title: yup.string().required('Item name helps the users to find the items'),
    description: yup.string().required('Description is required'),
    category: yup
        .string()
        .required('Help users find items faster by selecting a category'),
    condition: yup
        .string()
        .required('Please select the condition of your item'),
    price: yup
        .number()
        .typeError('You must specify a price')
        .min(0, 'Minimum price is 0')
        .max(30, 'Maximum price is 1000'),
    // image: yup.mixed().required('File is required'),
});

export default productSchema;
