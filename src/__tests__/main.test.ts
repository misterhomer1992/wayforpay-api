jest.mock('axios');
import { generatePurchaseUrl } from '../main';
import axios from 'axios';

const mockedAxios = jest.mocked(axios);

describe('test generatePurchaseUrl', () => {
    beforeEach(() => {
        mockedAxios.post.mockResolvedValueOnce({
            data: {
                url: 'https://secure.wayforpay.com/page?vkh=some-fake-url-123',
            },
        });
    });

    it('should generate payment url with single product', async () => {
        const date = 1715267902885;
        const response = await generatePurchaseUrl({
            merchantAccount: 'my_account',
            merchantDomainName: 'https://my_account.com',
            merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
            orderDate: date,
            orderReference: `product__${date}`,
            productName: ['Apple'],
            productPrice: [100],
            currency: 'UAH',
        });

        expect(mockedAxios.post).toMatchSnapshot();
        expect(response.data.url).toBe(
            'https://secure.wayforpay.com/page?vkh=some-fake-url-123',
        );
    });

    it('should generate payment url with multiple products', async () => {
        const date = 1715266261866;
        const response = await generatePurchaseUrl({
            merchantAccount: 'my_account',
            merchantDomainName: 'https://my_account.com',
            merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
            orderDate: date,
            orderReference: `product_1_${date}`,
            productName: ['Apple', 'Orange'],
            productPrice: [100, 45],
            currency: 'UAH',
        });
        expect(mockedAxios.post).toMatchSnapshot();
        expect(response.data.url).toBe(
            'https://secure.wayforpay.com/page?vkh=some-fake-url-123',
        );
    });

    it('should generate payment url with overwritten amount', async () => {
        const date = 1715266261866;
        const response = await generatePurchaseUrl({
            merchantAccount: 'my_account',
            merchantDomainName: 'https://my_account.com',
            merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
            orderDate: date,
            orderReference: `product_1_${date}`,
            productName: ['Apple', 'Kiwi'],
            productPrice: [100, 45],
            currency: 'UAH',
            amount: 123,
        });

        expect(mockedAxios.post).toMatchSnapshot();
        expect(response.data.url).toBe(
            'https://secure.wayforpay.com/page?vkh=some-fake-url-123',
        );
    });

    it('should generate payment url in EUR currency by default', async () => {
        const date = 1715266261866;
        const response = await generatePurchaseUrl({
            merchantAccount: 'my_account',
            merchantDomainName: 'https://my_account.com',
            merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
            orderDate: date,
            orderReference: `product_1_${date}`,
            productName: ['Milk'],
            productPrice: [2],
            currency: 'EUR',
        });
        expect(mockedAxios.post).toMatchSnapshot();
        expect(response.data.url).toBe(
            'https://secure.wayforpay.com/page?vkh=some-fake-url-123',
        );
    });

    it('should generate payment url with serviceUrl', async () => {
        const date = 1715266261866;
        const response = await generatePurchaseUrl({
            merchantAccount: 'my_account',
            merchantDomainName: 'https://my_account.com',
            merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
            orderDate: date,
            orderReference: `product_1_${date}`,
            productName: ['Milk'],
            productPrice: [2],
            currency: 'EUR',
            serviceUrl: 'https://my_account.com/success',
        });
        expect(mockedAxios.post).toMatchSnapshot();
        expect(response.data.url).toBe(
            'https://secure.wayforpay.com/page?vkh=some-fake-url-123',
        );
    });

    it('should generate payment url with UA language', async () => {
        const date = 1715266261866;
        const response = await generatePurchaseUrl({
            merchantAccount: 'my_account',
            merchantDomainName: 'https://my_account.com',
            merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
            orderDate: date,
            orderReference: `product_1_${date}`,
            productName: ['Milk'],
            productPrice: [2],
            currency: 'EUR',
            serviceUrl: 'https://my_account.com/success',
            language: 'UA',
        });
        expect(mockedAxios.post).toMatchSnapshot();
        expect(response.data.url).toBe(
            'https://secure.wayforpay.com/page?vkh=some-fake-url-123',
        );
    });

    it('should generate payment url with custom productCount', async () => {
        const date = 1715266261866;
        const response = await generatePurchaseUrl({
            merchantAccount: 'my_account',
            merchantDomainName: 'https://my_account.com',
            merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
            orderDate: date,
            orderReference: `product_1_${date}`,
            productName: ['Milk'],
            productPrice: [2],
            productCount: [3],
        });
        expect(mockedAxios.post).toMatchSnapshot();
        expect(response.data.url).toBe(
            'https://secure.wayforpay.com/page?vkh=some-fake-url-123',
        );
    });
});
