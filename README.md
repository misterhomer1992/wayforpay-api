# WayFoPay Payment Service

Welcome to the WayFoPay Payment Service repository. This project is dedicated to providing an easy-to-integrate payment solution through our API, making it simpler for merchants to initiate transactions and securely process payments.

## Features

-   **Generate Purchase URL**: Generate a secure link for processing payments with customizable parameters to fit various transaction requirements.
-   **Retrieve Purchase State**: Retrieve the state of a purchase using the merchant account and order reference.
-   **Refund Purchase**: Refund a purchase using the merchant account, order reference, amount, and currency.
-   **Generate Regular Purchase URL**: Generate a secure link for processing regular payments with customizable parameters.
-   **Retrieve Regular Purchase State**: Retrieve the state of a regular purchase using the merchant account and order reference.
-   **Cancel Regular Purchase**: Cancel a regular purchase using the merchant account and order reference.

## Installation

```sh
npm install @misterhomer1992/wayforpay-api
```

## Usage

Below is a step-by-step guide on how to use the `generatePurchaseUrl` function:

1.  **Usage**

    ```javascript
    import {
        generatePurchaseUrl,
        retrievePurchaseState,
        refundPurchase,
        generateRegularPurchaseUrl,
        retrieveRegularPurchaseState,
        cancelRegularPurchase,
    } from '@misterhomer1992/wayforpay-api';
    ```

2.  **Prepare Your Parameters**

    You'll need to prepare several parameters to pass to the `generatePurchaseUrl` function. These parameters include merchant details, order information, product details, and optional configurations.

    ```javascript
    const purchaseParams = {
        merchantAccount: 'yourMerchantAccountID',
        merchantSecretKey: 'yourMerchantSecretKey',
        merchantDomainName: 'yourDomain.com',
        orderReference: 'yourUniqueOrderRef',
        orderDate: new Date().getTime(),
        productName: ['Product 1', 'Product 2'],
        productPrice: [100.0, 200.0],
        currency: 'USD', // Optional, defaults to USD
        productCount: [1, 2], // Optional
        amount: 300.0, // Optional total amount
        orderTimeout: 49000, // Optional, in milliseconds
        orderLifeTime: 86400, // Optional, in seconds
        serviceUrl: 'yourServiceUrl', // Optional, for callback
        language: 'EN', // Optional, defaults to EN
    };
    ```

3.  **Use the Functions**

    With your parameters prepared, you can now call the functions and handle the responses.

    ```javascript
    generatePurchaseUrl(purchaseParams)
        .then((response) => {
            console.log('Purchase URL:', response.url);
        })
        .catch((error) => {
            console.error('Error generating purchase URL:', error);
        });

    retrievePurchaseState({
        merchantAccount: 'yourMerchantAccountID',
        orderReference: 'yourUniqueOrderRef',
        merchantSecretKey: 'yourMerchantSecretKey',
    })
        .then((response) => {
            console.log('Purchase State:', response.data);
        })
        .catch((error) => {
            console.error('Error retrieving purchase state:', error);
        });

    refundPurchase({
        merchantAccount: 'yourMerchantAccountID',
        orderReference: 'yourUniqueOrderRef',
        merchantSecretKey: 'yourMerchantSecretKey',
        amount: 300.0,
        currency: 'USD',
    })
        .then((response) => {
            console.log('Refund Response:', response.data);
        })
        .catch((error) => {
            console.error('Error refunding purchase:', error);
        });

    generateRegularPurchaseUrl({
        ...purchaseParams,
        regularMode: 'daily',
        regularCount: 5,
    })
        .then((response) => {
            console.log('Regular Purchase URL:', response.url);
        })
        .catch((error) => {
            console.error('Error generating regular purchase URL:', error);
        });

    retrieveRegularPurchaseState({
        merchantAccount: 'yourMerchantAccountID',
        orderReference: 'yourUniqueOrderRef',
        merchantPassword: 'yourMerchantPassword',
    })
        .then((response) => {
            console.log('Regular Purchase State:', response.data);
        })
        .catch((error) => {
            console.error('Error retrieving regular purchase state:', error);
        });

    cancelRegularPurchase({
        merchantAccount: 'yourMerchantAccountID',
        orderReference: 'yourUniqueOrderRef',
        merchantPassword: 'yourMerchantPassword',
    })
        .then((response) => {
            console.log('Cancel Regular Purchase Response:', response.data);
        })
        .catch((error) => {
            console.error('Error cancelling regular purchase:', error);
        });
    ```

## Contributing

We appreciate any contributions you make to this project. Please feel free to make pull requests or report issues.

## License

This project is licensed under [MIT License](./LICENSE). Feel free to use, modify, and distribute the code as you see fit.

## Contact

For any inquiries or support requests, please contact our team at `misterhomer1992@gmail.com`.
