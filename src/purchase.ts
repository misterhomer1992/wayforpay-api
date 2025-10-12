import axios from 'axios';
import { fillCommonFormDataProps, getSignature } from './utils';
import {
    CommonFormDataProps,
    Currency,
    ResponseReasonCode,
    ResponseTransactionStatus,
} from './types';

type GeneratePurchaseResponse = {
    url: string;
};

async function generatePurchase({ ...commonProps }: CommonFormDataProps) {
    const form = new FormData();

    const { merchantSignature } = fillCommonFormDataProps(form, {
        ...commonProps,
    });

    const res = await axios.post<GeneratePurchaseResponse>(
        'https://secure.wayforpay.com/pay?behavior=offline',
        form,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );

    return {
        url: res.data.url,
        merchantSignature,
        merchantVersion: '1.0',
    };
}

type RetrievePurchaseStateResponse<MAccount, OReference> = {
    merchantAccount: MAccount;
    reason: string;
    reasonCode: ResponseReasonCode;
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
    transactionStatus: ResponseTransactionStatus;
    refundAmount: number;
    settlementDate: string;
    settlementAmount: number;
    fee: number;
    merchantSignature: string;
};

async function retrievePurchaseState<
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

    const response = await axios.post<
        RetrievePurchaseStateResponse<MAccount, OReference>
    >('https://api.wayforpay.com/api', data);

    return response.data;
}

type RefundPurchaseResponse<
    MAccount extends string,
    OReference extends string,
> = {
    orderReference: OReference;
    transactionStatus: ResponseTransactionStatus;
    reasonCode: ResponseReasonCode;
    reason: string;
    merchantAccount: MAccount;
};

async function refundPurchase<
    MAccount extends string,
    OReference extends string,
>({
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

    const response = await axios.post<
        RefundPurchaseResponse<MAccount, OReference>
    >('https://api.wayforpay.com/api', data);

    return response.data;
}

export { generatePurchase, retrievePurchaseState, refundPurchase };
