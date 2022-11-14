import { AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { IProduct } from './product.type';

const fetchProducts = async () => {
    const response: AxiosResponse<Array<IProduct>> = await axiosInstance.get(
        `/products`
    );
    return response.data;
};

export const productService = {
    fetchProducts,
};
