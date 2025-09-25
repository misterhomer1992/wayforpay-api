jest.mock('axios');
import { generateRegularPurchaseUrl } from '../main';
import axios from 'axios';

const mockedAxios = jest.mocked(axios);

describe('test generateRegularPurchaseUrl', () => {
    beforeEach(() => {
        mockedAxios.post.mockResolvedValueOnce({
            data: {
                url: 'https://secure.wayforpay.com/page?vkh=regular-some-fake-url-123',
            },
        });
    });

    afterEach(() => {
        mockedAxios.post.mockClear();
    });

    it('should generate regular payment url with regularCount prop', async () => {
        const date = 1715267902885;
        const response = await generateRegularPurchaseUrl({
            merchantAccount: 'my_account',
            merchantDomainName: 'https://my_account.com',
            merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
            orderDate: date,
            orderReference: `product__${date}`,
            productName: ['Apple'],
            productPrice: [100],
            currency: 'UAH',
            regularMode: 'daily',
            regularCount: 1,
        });

        expect(mockedAxios.post).toMatchSnapshot();
        expect(response.url).toBe(
            'https://secure.wayforpay.com/page?vkh=regular-some-fake-url-123',
        );
    });

    it('should generate regular payment url with dateEnd prop', async () => {
        const date = 1715267902885;
        const response = await generateRegularPurchaseUrl({
            merchantAccount: 'my_account',
            merchantDomainName: 'https://my_account.com',
            merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
            orderDate: date,
            orderReference: `product__${date}`,
            productName: ['Apple'],
            productPrice: [100],
            currency: 'UAH',
            regularMode: 'daily',
            dateEnd: '24.12.2024',
        });

        expect(mockedAxios.post).toMatchSnapshot();
        expect(response.url).toBe(
            'https://secure.wayforpay.com/page?vkh=regular-some-fake-url-123',
        );
    });

    it('should not generate regular payment url cause of wrong dateEnd format', async () => {
        const date = 1715267902885;
        function testFn() {
            generateRegularPurchaseUrl({
                merchantAccount: 'my_account',
                merchantDomainName: 'https://my_account.com',
                merchantSecretKey: '12jk3hkj12h3kj1h3kj1h3kj123kh12',
                orderDate: date,
                orderReference: `product__${date}`,
                productName: ['Apple'],
                productPrice: [100],
                currency: 'UAH',
                regularMode: 'daily',
                dateEnd: '24-12-2024',
            });
        }

        expect(testFn).toThrowErrorMatchingSnapshot();
    });
});
