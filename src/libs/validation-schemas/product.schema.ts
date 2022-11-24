import * as yup from 'yup';

const productSchema = yup.object().shape({
    title: yup
        .string()
        .required('Item name helps the users to find the items. Duh!'),
    description: yup.string().required('Description is required'),
    category: yup
        .string()
        .required('Help users find items faster by selecting a category'),
    condition: yup
        .string()
        .required('Please select the condition of your item'),
    price: yup.number().required('Invalid price'),
    // image: yup.mixed().required('File is required'),
});

export default productSchema;
