import axios from 'axios';
import { fillCommonFormDataProps } from './utils';
import { CommonFormDataProps } from './types';

function generatePurchaseUrl({ ...commonProps }: CommonFormDataProps) {
    const form = new FormData();

    fillCommonFormDataProps(form, { ...commonProps });

    return axios.post<{
        url: string;
    }>('https://secure.wayforpay.com/pay?behavior=offline', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export { generatePurchaseUrl };
