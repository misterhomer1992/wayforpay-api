type Currency = 'UAH' | 'USD' | 'EUR';

type CommonFormDataProps = {
    merchantAccount: string;
    merchantSecretKey: string;
    merchantDomainName: string;
    orderReference: string;
    orderDate: number;
    productName: string[];
    productPrice: number[];
    currency?: Currency;
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
};

export { type CommonFormDataProps, type Currency };
