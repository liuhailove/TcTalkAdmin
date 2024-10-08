import Cookies from "js-cookie";

const SupportKey = 'supportKey';

export function getSupport() {
    return Cookies.get(SupportKey);
}

export function setSupport(isSupport: boolean) {
    return Cookies.set(SupportKey, isSupport, {expires: 3});
}

export function setCookie(key: string, value: string, expires: number) {
    return Cookies.set(key, value, {expires: expires})
}

export function getCookie(key: string) {
    return Cookies.get(key)
}