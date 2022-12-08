interface IStorage {
    getItem(key: string): string | null;
    setItem(key: string, item: string): void;
    removeItem(key: string): void;
    clear(): void;
    setCookie(
        cookieName: string,
        cookieValue: string | number,
        path: string
    ): string;
    getCookie(name: string): string;
    removeCookie(name: string): string;
}

class StorageUtility implements IStorage {
    getItem(key: string) {
        return localStorage.getItem(key);
    }
    setItem(key: string, item: string) {
        localStorage.setItem(key, item);
    }
    removeItem(key: string) {
        localStorage.removeItem(key);
    }
    clear() {
        localStorage.clear();
    }

    setCookie = (
        cookieName: string,
        cookieValue: string | number,
        path = '/'
    ): string => {
        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 1000 * 3600;
        now.setTime(expireTime);
        const expiryTimeInUTCString = now.toUTCString();
        return (document.cookie = `${cookieName}=${cookieValue};expires=${expiryTimeInUTCString};path=${path};`);
    };

    getCookie = (name: string): string => {
        const cookies = document.cookie.split('; ');

        return cookies.reduce((prev, currentCookie) => {
            const cookieKey = currentCookie.match(/^[^=]*/)?.[0] || '';
            const cookieValue = currentCookie.match(/[^=]*$/)?.[0] || '';
            return cookieKey === name ? decodeURIComponent(cookieValue) : prev;
        }, '');
    };

    removeCookie = (cookieName: string): string =>
        (document.cookie = `${cookieName}=;expires=0`);
}

const storageUtilityInstance = new StorageUtility();

export default storageUtilityInstance;
