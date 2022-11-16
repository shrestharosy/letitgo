import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { IProduct } from './product.type';

const fetchProducts = async () => {
    const response: AxiosResponse<Array<IProduct>> = await axiosInstance.get(
        `/products`
    );
    return response.data;
};

const fetchProduct = async (productId: string) => {
    const response: AxiosResponse<IProduct> = await axiosInstance.get(
        `/products/${productId}`
    );
    return response.data;
};

export const productService = {
    fetchProducts,
    fetchProduct,
};
