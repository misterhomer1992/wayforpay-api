type CommonFormDataProps = {
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
};

type CommonRegularPurchaseProps = CommonFormDataProps & {
    regularMode:
        | 'client'
        | 'daily'
        | 'weekly'
        | 'quarterly'
        | 'monthly'
        | 'halfyearly'
        | 'yearly';
};

type RegularPurchaseProps =
    | (CommonRegularPurchaseProps & {
          regularCount: number;
      })
    | (CommonRegularPurchaseProps & {
          dateEnd: string;
      });

export { type CommonFormDataProps, type RegularPurchaseProps };
