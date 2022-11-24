import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { IProduct, IModifyProduct, ICategory } from './product.type';

const fetchProducts = async () => {
    const response: AxiosResponse<Array<IProduct>> = await axiosInstance.get(
        `/products/`
    );
    return response.data;
};

const fetchProduct = async (productId: string) => {
    const response: AxiosResponse<IProduct> = await axiosInstance.get(
        `/products/${productId}/`
    );
    return response.data;
};

const addProduct = async (data: IModifyProduct) => {
    const form = new FormData();
    Object.entries(data).forEach((product) =>
        form.append(product[0], product[1])
    );

    const options = {
        method: 'POST',
        url: '/products/',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: form,
    };

    const response: AxiosResponse<Array<IProduct>> =
        await axiosInstance.request(options);
    return response.data;
};

const fetchCategories = async () => {
    const response: AxiosResponse<Array<ICategory>> = await axiosInstance.get(
        `/categories/`
    );
    return response.data;
};

export const productService = {
    fetchProducts,
    fetchProduct,
    addProduct,
    fetchCategories,
};
