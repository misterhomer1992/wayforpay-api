// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');
import { DELIMITER } from './const';
import { CommonFormDataProps } from './types';

function formatProductCount({
    productName,
    productCount,
}: {
    productName: string[];
    productCount?: number[];
}) {
    return Array.isArray(productCount)
        ? productCount
        : productName.map(() => 1);
}

function formatProductsAmount({
    amount: amountFromProps,
    productPrice,
    productCount,
}: {
    amount?: number;
    productPrice: number[];
    productCount: number[];
}) {
    let amount: number;

    if (typeof amountFromProps === 'number') {
        amount = amountFromProps;
    } else {
        amount = productPrice.reduce((acc, price, index) => {
            return acc + price * productCount[index];
        }, 0);
    }

    return amount;
}

function getSignature(
    data: (string | number | (string | number)[])[],
    key: string,
) {
    const secret = data
        .map((i) => {
            if (Array.isArray(i)) {
                return i.join(DELIMITER);
            }

            return String(i);
        })
        .join(DELIMITER);
    return crypto.createHmac('md5', key).update(secret).digest('hex');
}

function fillCommonFormDataProps(
    form: FormData,
    {
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
    }: CommonFormDataProps,
) {
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
}

export {
    formatProductCount,
    formatProductsAmount,
    getSignature,
    fillCommonFormDataProps,
};
