import axios from 'axios';
import { fillCommonFormDataProps, getSignature } from './utils';
import { CommonFormDataProps, Currency } from './types';

type GeneratePurchaseResponse = {
    url: string;
};

function generatePurchaseUrl({ ...commonProps }: CommonFormDataProps) {
    const form = new FormData();

    fillCommonFormDataProps(form, { ...commonProps });

    return axios.post<GeneratePurchaseResponse>(
        'https://secure.wayforpay.com/pay?behavior=offline',
        form,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );
}

type RetrievePurchaseStateResponse<MAccount, OReference> = {
    merchantAccount: MAccount;
    reason: string;
    reasonCode: number;
    orderReference: OReference;
    amount: number;
    currency: Currency;
    authCode: string;
    createdDate: number;
    processingDate: number;
    cardPan: string;
    cardType: string;
    issuerBankCountry: string;
    issuerBankName: string;
    transactionStatus: string;
    refundAmount: number;
    settlementDate: string;
    settlementAmount: number;
    fee: number;
    merchantSignature: string;
};

function retrievePurchaseState<
    MAccount extends string,
    OReference extends string,
>({
    merchantAccount,
    orderReference,
    merchantSecretKey,
}: {
    merchantAccount: MAccount;
    orderReference: OReference;
    merchantSecretKey: string;
}) {
    const merchantSignature = getSignature(
        [merchantAccount, orderReference],
        merchantSecretKey,
    );

    const data = {
        transactionType: 'CHECK_STATUS',
        merchantAccount: merchantAccount,
        orderReference: orderReference,
        merchantSignature: merchantSignature,
        apiVersion: 1,
    };

    return axios.post<RetrievePurchaseStateResponse<MAccount, OReference>>(
        'https://api.wayforpay.com/api',
        data,
    );
}

type RefundPurchaseResponse<
    MAccount extends string,
    OReference extends string,
> = {
    merchantAccount: MAccount;
    orderReference: OReference;
    transactionStatus: 'Refunded' | 'Voided' | 'Declined';
    reason: string;
    reasonCode: number;
    baseAmount: number;
    baseCurrency: Currency;
    merchantSignature: string;
};

function refundPurchase<MAccount extends string, OReference extends string>({
    merchantAccount,
    orderReference,
    merchantSecretKey,
    amount,
    currency,
}: {
    merchantAccount: string;
    orderReference: string;
    merchantSecretKey: string;
    amount: number;
    currency: Currency;
}) {
    const merchantSignature = getSignature(
        [merchantAccount, orderReference, amount, currency],
        merchantSecretKey,
    );

    const data = {
        transactionType: 'REFUND',
        merchantAccount: merchantAccount,
        orderReference: orderReference,
        amount,
        currency,
        comment: 'CANCEL SUBSCRIPTION',
        merchantSignature: merchantSignature,
        apiVersion: 1,
    };

    return axios.post<RefundPurchaseResponse<MAccount, OReference>>(
        'https://api.wayforpay.com/api',
        data,
    );
}

export { generatePurchaseUrl, retrievePurchaseState, refundPurchase };
