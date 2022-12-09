import { AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '../axios';
import { ICategory, IModifyProduct, IProduct } from './product.type';

const fetchProducts = async (
    category?: string,
    condition?: number,
    search?: string,
    verified?: string
) => {
    let url = `/products/`;
    const filters = [];
    if (category) {
        filters.push(`category=${category}`);
    }
    if (condition) {
        filters.push(`condition=${condition}`);
    }
    if (search) {
        filters.push(`search=${search}`);
    }
    if (verified) {
        filters.push(`verified=${verified}`);
    }
    if (filters) {
        url = `${url}?${filters.join('&')}`;
    }
    const response: AxiosResponse<Array<IProduct>> = await axiosInstance.get(
        url
    );
    return response.data;
};

const fetchMyProducts = async (userId: number) => {
    const response: AxiosResponse<Array<IProduct>> = await axiosInstance.get(
        `/products/?owner=${userId}`
    );
    return response.data;
};

const fetchProduct = async (id: string) => {
    const response: AxiosResponse<IProduct> = await axiosInstance.get(
        `/products/${id}/`
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

const updateProduct = async (id: string, data: IModifyProduct) => {
    let options: AxiosRequestConfig<any> = {
        method: 'PUT',
        url: `/products/${id}/`,
    };

    if (typeof data.image === 'object') {
        const form = new FormData();
        Object.entries(data).forEach((product) =>
            form.append(product[0], product[1])
        );
        options = {
            ...options,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: form,
        };
    }

    if (typeof data.image === 'string') {
        options = {
            ...options,
            data,
        };
    }

    const response: AxiosResponse<Array<IProduct>> =
        await axiosInstance.request(options);
    return response.data;
};

const deleteProduct = async (id: string) => {
    const response: AxiosResponse<IProduct> = await axiosInstance.delete(
        `/products/${id}/`
    );
    return response.data;
};

const fetchCategories = async () => {
    const response: AxiosResponse<Array<ICategory>> = await axiosInstance.get(
        `/categories/`
    );
    return response.data;
};

const contactProductOwner = async (productId: string) => {
    const response: AxiosResponse<Array<ICategory>> = await axiosInstance.patch(
        `products/${productId}/contact/`
    );
    return response.data;
};

export const productService = {
    fetchProducts,
    fetchMyProducts,
    fetchProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchCategories,
    contactProductOwner,
};
