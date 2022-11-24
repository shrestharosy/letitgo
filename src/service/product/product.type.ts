export interface IBaseProduct {
    title: string;
    price: string;
    description: string;
    category: string;
    condition: number;
}

export interface IProduct extends IBaseProduct {
    id: number;
    image: string;
    created_date: Date;
    user: number;
}

export interface IModifyProduct extends IBaseProduct {
    image: File;
}

export interface ICategory {
    name: string;
}
