# E-Summit Payment Troubleshooting Guide

## Common Issues and Solutions

### 1. Payment Not Working When Clicking "Proceed to Pay"

#### Symptoms:
- Clicking "Proceed to Pay" shows loading spinner but doesn't redirect
- No error message is displayed
- Console shows no errors

#### Possible Causes and Solutions:

**A. PhonePe Credentials Not Configured Properly**
1. Check `.env` file for correct PhonePe credentials:
   ```
   PHONEPE_CLIENT_ID=SU2511121305276200002480
   PHONEPE_CLIENT_SECRET=f5014b3f-49eb-46d5-9038-66419761aca4
   PHONEPE_CLIENT_VERSION=1
   PHONEPE_ENV=SANDBOX
   ```

2. Restart the development server after making changes to `.env`

**B. Network Issues**
1. Check browser console for network errors
2. Verify that `NEXT_PUBLIC_BASE_URL` in `.env` matches your development URL:
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

**C. Amount Validation Issues**
1. Ensure the payment amount is at least ₹1.00 (100 paise)
2. Check browser console for amount-related errors

### 2. Testing Payment Integration

#### Using the Test Page:
1. Navigate to `/e-summit/test-payment`
2. Click "Test PhonePe Integration"
3. Check the result and browser console for detailed logs

#### Manual Testing:
1. Open browser developer tools (F12)
2. Go to the Console tab
3. Navigate to `/e-summit/checkout?pass=general`
4. Fill in the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Sender Name: Test Sender
5. Click "Proceed to Pay"
6. Check console for detailed logs

### 3. Checking Server Logs

#### In Development:
1. Check the terminal where you ran `npm run dev` or `yarn dev`
2. Look for log messages prefixed with `[E-Summit]` or `[PhonePe]`

#### Common Log Messages:
- `[E-Summit] Environment check:` - Shows PhonePe configuration status
- `[E-Summit] Received payment request:` - Shows data received from frontend
- `[PhonePe] Creating new client instance:` - Shows PhonePe SDK initialization
- `[PhonePe] Pay method response received:` - Shows response from PhonePe API

### 4. Verifying PhonePe Sandbox Account

1. Ensure you're using Sandbox credentials (not Production)
2. Check that `PHONEPE_ENV=SANDBOX` in your `.env` file
3. Verify credentials at [PhonePe Developer Portal](https://developer.phonepe.com)

### 5. Debugging Steps

#### Step 1: Check Browser Console
1. Press F12 to open developer tools
2. Go to Console tab
3. Click "Proceed to Pay"
4. Look for error messages

#### Step 2: Check Network Tab
1. In developer tools, go to Network tab
2. Click "Proceed to Pay"
3. Look for the request to `/api/e-summit/payments/initiate`
4. Check the response status and data

#### Step 3: Check Server Logs
1. Look at the terminal running your development server
2. Check for error messages when clicking "Proceed to Pay"

#### Step 4: Test with Minimal Data
1. Navigate to `/e-summit/test-payment`
2. Click "Test PhonePe Integration"
3. Check the result

### 6. Common Error Messages and Fixes

**"Payment gateway not configured properly"**
- Solution: Verify `.env` file contains correct PhonePe credentials

**"Minimum payment amount is ₹1.00"**
- Solution: Ensure the calculated amount is at least 100 paise

**"Payment service error: ..."**
- Solution: Check server logs for detailed error information

**Network errors in browser console**
- Solution: Verify `NEXT_PUBLIC_BASE_URL` matches your development URL

### 7. Contact Support

If you're still experiencing issues:

1. Take screenshots of:
   - Browser console errors
   - Network tab requests/responses
   - Server logs showing error messages

2. Provide information about:
   - Operating system
   - Browser version
   - Node.js version
   - Whether you're running in development or production

3. Contact PhonePe support if the issue is with their API