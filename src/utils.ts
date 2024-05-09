// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');
import { DELIMITER } from './const';

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

export { formatProductCount, formatProductsAmount, getSignature };
