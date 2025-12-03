# E-Summit Submissions Troubleshooting Guide

## Overview
This document explains how to troubleshoot issues with E-Summit submissions not appearing in the admin panel.

## Common Issues and Solutions

### 1. No Submissions Displayed
**Symptoms:** The admin panel shows "No e-summit submissions yet" even after users have made payments.

**Troubleshooting Steps:**

1. **Check Database Content:**
   - Navigate to `/admin/e-summit/test-db` to see raw database content
   - Verify that payment records are actually being created in MongoDB

2. **Verify Payment Flow:**
   - Make a test payment through the checkout process
   - Check browser console for JavaScript errors
   - Check server logs for backend errors

3. **Check API Endpoint:**
   - Visit `/api/e-summit/payments/test-db` directly to see raw database response
   - Ensure the API is returning data correctly

4. **Verify Data Transformation:**
   - Check that payment records have the required fields
   - Ensure data types match what the admin panel expects

### 2. Data Format Issues
**Symptoms:** Some submissions appear but with missing or incorrect data.

**Troubleshooting Steps:**

1. **Check Required Fields:**
   - Ensure all payment records have:
     - `_id` (MongoDB ObjectId)
     - `name`
     - `email`
     - `phone`
     - `senderName`
     - `passType`
     - `passName`
     - `amount`
     - `transactionId`
     - `status`
     - `createdAt`

2. **Verify Data Types:**
   - `amount` should be a number
   - `createdAt` should be a Date object or timestamp
   - `status` should be one of: "pending", "success", "failed"

### 3. Admin Panel Display Issues
**Symptoms:** Data exists in database but doesn't display correctly in admin panel.

**Troubleshooting Steps:**

1. **Check Browser Console:**
   - Look for JavaScript errors in the browser console
   - Check network tab for failed API requests

2. **Verify Admin Panel Code:**
   - Ensure the frontend is correctly fetching data from `/api/e-summit/payments`
   - Check that the data transformation matches the expected type

## Testing the Payment Flow

1. **Make a Test Payment:**
   - Navigate to any E-Summit pass page
   - Click on a "Buy" button to go to checkout
   - Fill in test data and click "PROCEED TO PAY"
   - Complete or cancel the payment process

2. **Check Database:**
   - Visit `/admin/e-summit/test-db` to see if the payment record was created
   - Verify all required fields are present

3. **Refresh Admin Panel:**
   - Click the "Refresh Payments" button in the admin panel
   - Check if submissions now appear

## Debugging Tools

### Database Test Endpoint
- **URL:** `/api/e-summit/payments/test-db`
- **Purpose:** Returns raw payment data from MongoDB with detailed logging
- **Usage:** Visit directly in browser to see database content

### Admin Database Test Page
- **URL:** `/admin/e-summit/test-db`
- **Purpose:** User-friendly interface to view database content
- **Usage:** Visit in browser to see formatted database content

## Expected Data Structure

Each payment record should have the following structure:

```javascript
{
  _id: ObjectId,
  name: string,
  email: string,
  phone: string,
  senderName: string,
  passType: string,
  passName: string,
  amount: number,
  promoCode: string | null,
  transactionId: string,
  status: "pending" | "success" | "failed",
  createdAt: Date,
  updatedAt: Date
}
```

## Common Fixes

### 1. Data Transformation Issues
If payment records exist but don't display, check the data transformation in `/app/api/e-summit/payments/route.ts`:

```javascript
const formattedPayments = payments.map((payment: any) => ({
  id: payment._id?.toString() || '',
  name: payment.name || '',
  email: payment.email || '',
  // ... other fields with default values
})).filter(payment => payment.id)
```

### 2. Date Format Issues
Ensure dates are properly converted:

```javascript
createdAt: payment.createdAt ? new Date(payment.createdAt).getTime() : Date.now()
```

## Additional Debugging

1. **Check Server Logs:**
   - Look for "[E-Summit]" log messages
   - Check for any error messages during payment processing

2. **Verify MongoDB Connection:**
   - Ensure MongoDB is accessible
   - Check that the "eSummitPayments" collection exists

3. **Test API Endpoints:**
   - Use curl or Postman to directly test `/api/e-summit/payments`
   - Verify the response format matches expectations