type Currency = 'UAH' | 'USD' | 'EUR';
type Language =
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

type ResponseReasonCode = [
    '1100',
    '1101',
    '1102',
    '1103',
    '1104',
    '1105',
    '1106',
    '1108',
    '1109',
    '1110',
    '1112',
    '1113',
    '1114',
    '1115',
    '1116',
    '1117',
    '1118',
    '1120',
    '1121',
    '1122',
    '1123',
    '1124',
    '1125',
    '1126',
    '1127',
    '1128',
    '1129',
    '1130',
    '1131',
    '1132',
    '1133',
    '1134',
    '1135',
    '1136',
    '1137',
    '1138',
    '1139',
    '1140',
    '1141',
    '1142',
    '1143',
    '1144',
    '1145',
    '1146',
    '1147',
    '1148',
    '1149',
    '1151',
    '5100',
    '4107',
][number];

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
    language?: Language;
};

type ResponseTransactionStatus =
    | 'InProcessing'
    | 'WaitingAuthComplete'
    | 'Approved'
    | 'Pending'
    | 'Expired'
    | 'Refunded/Voided'
    | 'Declined'
    | 'RefundInProcessing';

export {
    type CommonFormDataProps,
    type Currency,
    type Language,
    type ResponseTransactionStatus,
    type ResponseReasonCode,
};
