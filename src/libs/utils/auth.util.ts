import { ACCESS_TOKEN } from 'src/constants/storage';
import storageUtilityInstance from './storage';

export const checkIfLoggedInUser = () => {
    const token = storageUtilityInstance.getItem(ACCESS_TOKEN);
    // TODO : check validity
    if (!token) {
        return false;
    } else {
        return true;
    }
};
