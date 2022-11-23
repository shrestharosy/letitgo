import { ACCESS_TOKEN } from 'src/constants/storage.constant';
import storageUtilityInstance from './storage.util';

export const checkIfLoggedInUser = () => {
    const token = storageUtilityInstance.getItem(ACCESS_TOKEN);
    // TODO : check validity
    if (!token) {
        return false;
    } else {
        return true;
    }
};
