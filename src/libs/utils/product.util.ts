import { PRODUCT_CONDITION } from 'src/constants/product.constant';

export const mapProductCondition = (condition: number) => {
    return Object.entries(PRODUCT_CONDITION).find(
        (key) => key[1] === condition
    )[0];
};

export const getProductConditionColor = (condition: number) => {
    switch (condition) {
        case 1:
            return 'danger';
        case 2:
            return 'warning';
        case 3:
            return 'yellow';
        case 4:
            return 'primary';
        case 5:
            return 'success';
        default:
            return '';
    }
};
