# E-Summit Payment System Troubleshooting Guide

## Overview
This document explains how the E-Summit payment system works and provides troubleshooting steps for common issues.

## Payment Flow

1. User selects a pass on the E-Summit page
2. User is redirected to the checkout page (`/e-summit/checkout`)
3. User fills in their details and clicks "PROCEED TO PAY"
4. The frontend sends a request to `/api/e-summit/payments/initiate`
5. The backend creates a payment record in MongoDB
6. The backend initiates a PhonePe payment using the PhonePe SDK
7. If successful, the user is redirected to the PhonePe payment page
8. After payment, PhonePe redirects back to the callback URL
9. The callback verifies the payment status with PhonePe
10. If successful, the payment status is updated in the database

## Common Issues and Solutions

### 1. Payment Not Working
**Symptoms:** Clicking "PROCEED TO PAY" shows an error or does nothing.

**Troubleshooting Steps:**
1. Check that all environment variables are correctly set in `.env`:
   - `PHONEPE_CLIENT_ID`
   - `PHONEPE_CLIENT_SECRET`
   - `PHONEPE_CLIENT_VERSION`
   - `PHONEPE_ENV`
   - `NEXT_PUBLIC_BASE_URL`

2. Verify the PhonePe credentials are correct by testing with the test page at `/e-summit/test-phonepe`

3. Check the browser console for JavaScript errors

4. Check the server logs for backend errors

### 2. Redirect Issues
**Symptoms:** User is not redirected to PhonePe or redirected to wrong page.

**Troubleshooting Steps:**
1. Verify `NEXT_PUBLIC_BASE_URL` is set correctly in `.env`
2. Check that the callback URL is correctly formed in the payment initiation code
3. Ensure the PhonePe sandbox environment is being used for testing

### 3. Amount Validation Errors
**Symptoms:** "Invalid amount" or "Minimum payment amount is ₹1.00" errors.

**Troubleshooting Steps:**
1. Ensure the amount is a positive number greater than or equal to 1.00
2. Check that the amount is being passed correctly from frontend to backend
3. Verify that the amount is being converted to paise correctly (multiply by 100)

## Testing the Payment System

1. Navigate to `/e-summit/test-phonepe` to run a test payment
2. Fill in the form with valid test data
3. Click "Test PhonePe Integration"
4. If successful, you should see a payment URL that you can open to test the payment flow

## Environment Variables Required

```env
PHONEPE_CLIENT_ID=your_client_id
PHONEPE_CLIENT_SECRET=your_client_secret
PHONEPE_CLIENT_VERSION=1
PHONEPE_ENV=SANDBOX
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## PhonePe SDK Integration Points

1. **Payment Initiation**: `/lib/phonepe.ts` - Contains the PhonePe SDK wrapper functions
2. **API Route**: `/app/api/e-summit/payments/initiate/route.ts` - Handles payment initiation requests
3. **Callback Handler**: `/app/api/e-summit/payments/callback/route.ts` - Handles PhonePe callbacks
4. **Frontend**: `/app/e-summit/checkout/page.tsx` - Collects user data and initiates payment

## Debugging Tips

1. Enable detailed logging by checking the console output in browser dev tools and server logs
2. Use the test page to isolate issues in the payment flow
3. Check MongoDB records to see if payment records are being created
4. Verify network requests in browser dev tools to see request/response data