import {
    formatProductCount,
    formatProductsAmount,
    getSignature,
} from './utils';

import axios from 'axios';

export function generatePurchaseUrl({
    merchantAccount,
    merchantSecretKey,
    merchantDomainName,
    orderReference,
    orderDate,
    productName,
    productPrice,

    currency = 'USD',
    productCount: productCountFromProps,
    amount: amountFromProps,
    orderTimeout = 49000,
    orderLifeTime = 86400,
    serviceUrl,
    language = 'EN',
}: {
    merchantAccount: string;
    merchantSecretKey: string;
    merchantDomainName: string;
    orderReference: string;
    orderDate: number;
    productName: string[];
    productPrice: number[];
    currency?: 'UAH' | 'USD' | 'EUR';
    productCount?: number[];
    amount?: number;
    orderTimeout?: number;
    orderLifeTime?: number;
    serviceUrl?: string;
    language?:
        | 'EN'
        | 'UA'
        | 'DE'
        | 'PL'
        | 'ES'
        | 'IT'
        | 'FR'
        | 'RO'
        | 'LV'
        | 'SK'
        | 'CS'
        | 'RU';
}) {
    const form = new FormData();
    const productCount = formatProductCount({
        productName,
        productCount: productCountFromProps,
    });
    const amount = formatProductsAmount({
        amount: amountFromProps,
        productCount,
        productPrice,
    });
    const merchantSignature = getSignature(
        [
            merchantAccount,
            merchantDomainName,
            orderReference,
            orderDate,
            amount,
            currency,
            productName,
            productCount,
            productPrice,
        ],
        merchantSecretKey,
    );

    form.append('merchantAccount', merchantAccount);
    form.append('merchantDomainName', merchantDomainName);
    form.append('merchantTransactionSecureType', 'AUTO');
    form.append('merchantSignature', merchantSignature);
    form.append('orderReference', orderReference);
    form.append('orderDate', String(orderDate));
    form.append('currency', currency);

    productName.forEach((name, index) => {
        form.append(`productName[${index}]`, name);
    });
    productPrice.forEach((price, index) => {
        form.append(`productPrice[${index}]`, String(price));
    });
    productCount.forEach((count, index) => {
        form.append(`productCount[${index}]`, String(count));
    });

    form.append('language', language);
    form.append('orderTimeout', String(orderTimeout));
    form.append('orderLifetime', String(orderLifeTime));
    form.append('paymentSystems', 'card;googlePay;applePay');
    form.append('amount', String(amount));

    if (serviceUrl) {
        form.append('serviceUrl', serviceUrl);
    }

    return axios.post<{
        url: string;
    }>('https://secure.wayforpay.com/pay?behavior=offline', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
