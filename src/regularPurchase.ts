import axios from 'axios';
import { fillCommonFormDataProps } from './utils';
import { RegularPurchaseProps } from './types';

function isValidCustomDate(date: string): boolean {
    // First, check the basic format 'dd.mm.yyyy'
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regex.test(date)) {
        return false;
    }

    // Split the date string into parts
    const parts = date.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Check if day is within the month's maximum days
    // Note: This does not fully account for leap years or specific month's day count,
    // but checks the general case for month and day validity.
    if (day < 1 || day > 31) {
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }

    // Basic check for leap year and February 29th
    if (month === 2 && day === 29) {
        const isLeapYear =
            (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        if (!isLeapYear) {
            return false;
        }
    }
    // Checking other months for appropriate day numbers
    else if (month === 4 || month === 6 || month === 9 || month === 11) {
        if (day > 30) {
            return false;
        }
    }

    return true;
}

function generateRegularPurchaseUrl({ ...commonProps }: RegularPurchaseProps) {
    const form = new FormData();

    fillCommonFormDataProps(form, { ...commonProps });

    const amount = form.get('amount')!;

    form.append('regularBehavior', 'preset');
    form.append('regularMode', commonProps.regularMode);
    form.append('regularAmount', amount);
    form.append('regularOn', '1');

    if ('dateEnd' in commonProps) {
        if (!isValidCustomDate(commonProps.dateEnd)) {
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

export { generateRegularPurchaseUrl };
