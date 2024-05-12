import { Request, Response } from 'express';
import { getSignature } from './utils';
import {
    Currency,
    ResponseReasonCode,
    ResponseTransactionStatus,
} from './types';

type PurchaseConfirmationResponse = {
    merchantAccount: string;
    orderReference: string;
    merchantSignature: string;
    amount: number;
    currency: Currency;
    authCode: string;
    email: string;
    phone: string;
    createdDate: 12345678;
    processingDate: 12345678;
    cardPan: string;
    cardType: string;
    issuerBankCountry: string;
    issuerBankName: string;
    recToken: string;
    transactionStatus: ResponseTransactionStatus;
    reason: string;
    reasonCode: ResponseReasonCode;
    fee: number;
    paymentSystem: string;
};

function buildPurchaseConfirmationAPI({
    merchantSecretKey,
    onAccepted,
}: {
    merchantSecretKey: string;
    onAccepted: (params: PurchaseConfirmationResponse) => Promise<void> | void;
}) {
    return async (req: Request, res: Response) => {
        if (
            req.method.toLowerCase() !== 'post' ||
            req.get('content-type') !== 'application/x-www-form-urlencoded'
        ) {
            res.status(400).send('BAD REQUEST');
            return;
        }

        const keys = Object.keys(req.body);
        const time = Date.now();
        let parsedData;

        try {
            parsedData = JSON.parse(keys[0]) as PurchaseConfirmationResponse;
        } catch (error) {
            console.log('Error parsing', keys[0]);
            res.status(400).send('Error parsing');

            return;
        }

        const orderReference = parsedData.orderReference;

        if (parsedData.transactionStatus !== 'Approved') {
            res.status(400).send('Transaction status is not approved');

            return;
        }

        const status = 'accept';

        const signature = getSignature(
            [orderReference, status, time],
            merchantSecretKey,
        );

        console.log(`Accepted order#: ${orderReference}`);

        await onAccepted(parsedData);

        res.status(200).send(
            JSON.stringify({
                orderReference,
                status,
                time,
                signature,
            }),
        );
    };
}

export { buildPurchaseConfirmationAPI };
