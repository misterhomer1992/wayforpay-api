import axios from 'axios';
import { fillCommonFormDataProps, isValidDate } from './utils';
import { CommonFormDataProps } from './types';

type RegularPurchaseStatus =
    | 'Active'
    | 'Suspended'
    | 'Created'
    | 'Removed'
    | 'Confirmed'
    | 'Completed';

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

function generateRegularPurchaseUrl({ ...commonProps }: RegularPurchaseProps) {
    const form = new FormData();

    fillCommonFormDataProps(form, { ...commonProps });

    const amount = form.get('amount')!;

    form.append('regularBehavior', 'preset');
    form.append('regularMode', commonProps.regularMode);
    form.append('regularAmount', amount);
    form.append('regularOn', '1');

    if ('dateEnd' in commonProps) {
        if (!isValidDate(commonProps.dateEnd)) {
            throw new Error('Invalid date format. Use DD.MM.YYYY');
        }

        form.append('dateEnd', commonProps.dateEnd);
    } else if ('regularCount' in commonProps) {
        form.append('regularCount', String(commonProps.regularCount));
    }

    return axios.post<{
        url: string;
    }>('https://secure.wayforpay.com/pay?behavior=offline', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

type RetrieveRegularPurchaseStateResponse =
    | {
          reasonCode: number;
          reason: string;
          orderReference: string;
          mode: string;
          status: RegularPurchaseStatus;
          amount: number;
          currency: string;
          card: string;
          email: string;
          dateBegin: number;
          dateEnd: number;
          lastPayedDate: null | string;
          lastPayedStatus: null | string;
          nextPaymentDate: number;
      }
    | {
          reasonCode: number;
          reason: string;
          orderReference: null;
          mode: null;
          status: null;
          amount: number;
          currency: null;
          card: string;
          email: null;
          dateBegin: null;
          dateEnd: null;
          lastPayedDate: null;
          lastPayedStatus: null;
          nextPaymentDate: null;
      };

function retrieveRegularPurchaseState<
    MAccount extends string,
    OReference extends string,
>({
    merchantAccount,
    orderReference,
    merchantPassword,
}: {
    merchantAccount: MAccount;
    orderReference: OReference;
    merchantPassword: string;
}) {
    const data = {
        requestType: 'STATUS',
        merchantAccount,
        merchantPassword,
        orderReference,
    };

    return axios.post<RetrieveRegularPurchaseStateResponse>(
        'https://api.wayforpay.com/regularApi',
        data,
    );
}

type CancelRegularPurchaseResponse =
    | { reasonCode: 4102; reason: 'Rule is not found' }
    | { reasonCode: 4100; reason: 'Ok' };

function cancelRegularPurchase<
    MAccount extends string,
    OReference extends string,
>({
    merchantAccount,
    orderReference,
    merchantPassword,
}: {
    merchantAccount: MAccount;
    orderReference: OReference;
    merchantPassword: string;
}) {
    const data = {
        requestType: 'REMOVE',
        merchantAccount,
        merchantPassword,
        orderReference: orderReference,
    };

    return axios.post<CancelRegularPurchaseResponse>(
        'https://api.wayforpay.com/regularApi',
        data,
    );
}

export {
    generateRegularPurchaseUrl,
    retrieveRegularPurchaseState,
    cancelRegularPurchase,
};
