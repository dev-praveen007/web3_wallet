// utils/cryptoUtils.js
import CryptoJS from "crypto-js";
import toast, { Toaster } from 'react-hot-toast';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// Encrypt function
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function
export const decryptData = (ciphertext) => {
    if (!ciphertext) return
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

//Toast function
export const showToast = (type, msg, others) => {
    return toast[type](msg, others)
}

// set values to the local storage in encrption.
export const setLocal = (key, value) => localStorage.setItem(key, encryptData(JSON.stringify({ data: value })))

// get values from the local storage with decryption.
export const getLocal = (key) => JSON.parse(decryptData(localStorage.getItem(key)) || "{}")?.data

export const addressshowing = (data) => {
    if (data?.length > 10) {
        var address = data?.substring(0, 10) + '...' + data?.substring(data.length - 11, data.length - 1)
    } else {
        var address = data
    }
    return address
}

export const stopFunction = async (ms) => await new Promise(res => setTimeout(() => res(), ms));