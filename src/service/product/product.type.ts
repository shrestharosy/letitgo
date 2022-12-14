export interface IBaseProduct {
    title: string;
    price: string;
    description: string;
    category: string;
    condition: number;
}

export interface IProduct extends IBaseProduct {
    id: string;
    image: string;
    created_date: Date;
    user: number;
    owner_id: number;
    owner_email: string;
    owner_first_name: string;
    owner_last_name: string;
    verified: boolean;
}

export interface IModifyProduct extends IBaseProduct {
    image?: File | string;
}

export interface ICategory {
    name: string;
    id: string;
}

export interface IOption {
    label: string;
    value: string | number;
}
