```
# WayFoPay Payment Service

Welcome to the WayFoPay Payment Service repository. This project is dedicated to providing an easy-to-integrate payment solution through our API, making it simpler for merchants to initiate transactions and securely process payments. Currently, we offer a single public API function `generatePurchaseUrl`, to create a URL for processing a purchase.

## Features

- **Generate Purchase URL**: Generate a secure link for processing payments with customizable parameters to fit various transaction requirements.

## Installation

```sh
npm install @misterhomer1992/wayforpay-api
```

## Usage

Below is a step-by-step guide on how to use the `generatePurchaseUrl` function:

1. **Import the Function**
   ```javascript
   import { generatePurchaseUrl } from '@misterhomer1992/wayforpay-api';
   ```

2. **Prepare Your Parameters**

   You'll need to prepare several parameters to pass to the `generatePurchaseUrl` function. These parameters include merchant details, order information, product details, and optional configurations.

   ```javascript
   const purchaseParams = {
       merchantAccount: "yourMerchantAccountID",
       merchantSecretKey: "yourMerchantSecretKey",
       merchantDomainName: "yourDomain.com",
       orderReference: "yourUniqueOrderRef",
       orderDate: new Date().getTime(),
       productName: ["Product 1", "Product 2"],
       productPrice: [100.00, 200.00],
       currency: "USD", // Optional, defaults to USD
       productCount: [1, 2], // Optional
       amount: 300.00, // Optional total amount
       orderTimeout: 49000, // Optional, in milliseconds
       orderLifeTime: 86400, // Optional, in seconds
       serviceUrl: "yourServiceUrl", // Optional, for callback
       language: "EN", // Optional, defaults to EN
   };
   ```

3. **Generate the Purchase URL**

   With your parameters prepared, you can now call `generatePurchaseUrl` and handle the response to get the payment URL.

   ```javascript
   generatePurchaseUrl(purchaseParams)
      .then(response => {
          console.log("Purchase URL:", response.url);
      })
      .catch(error => {
          console.error("Error generating purchase URL:", error);
      });
   ```

## Contributing

We appreciate any contributions you make to this project. Please feel free to make pull requests or report issues.

## License

This project is licensed under [MIT License](./LICENSE). Feel free to use, modify, and distribute the code as you see fit.

## Contact

For any inquiries or support requests, please contact our team at `misterhomer1992@gmail.com`.
```
