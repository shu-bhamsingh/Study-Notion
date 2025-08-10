# Payment Integration Setup Guide

## Razorpay Integration

To properly set up the payment integration with Razorpay in this project, follow these steps:

### 1. Create a Razorpay Account

If you don't already have one, create an account at [Razorpay](https://razorpay.com/).

### 2. Get Your API Keys

1. Log in to your Razorpay Dashboard
2. Go to Settings > API Keys
3. Generate a new API key pair if you don't have one
4. Note down both the Key ID and Key Secret

### 3. Set Up Environment Variables

#### Frontend (.env file)

Create a `.env` file in the `src` directory of your project with the following content:

```
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
REACT_APP_BASE_URL=http://localhost:5001/api/v1
```

Replace `your_razorpay_key_id` with your actual Razorpay Key ID.

#### Backend (.env file)

Create a `.env` file in the `Server` directory with the following content:

```
RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
```

Replace the placeholders with your actual Razorpay credentials.

### 4. Restart Your Application

After setting up the environment variables, restart both your frontend and backend servers to apply the changes.

## Troubleshooting

### Common Issues:

1. **"Authentication key was missing during initialization"**: This error occurs when the Razorpay key is not properly set in the frontend environment variables.

2. **"Could not initiate order"**: This could be due to missing or incorrect API keys on the backend.

3. **Payment verification fails**: Check that your key secret is correctly set on the backend.

### Debug Steps:

1. Verify that your `.env` files contain the correct API keys
2. Check browser console for any errors during payment initialization
3. Ensure the backend server can access the environment variables
4. Make sure you're using test mode keys during development

## Testing Payments

In test mode, you can use the following card details:

- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name

For more test card options, refer to the [Razorpay Testing Documentation](https://razorpay.com/docs/payments/payments/test-card-details/).