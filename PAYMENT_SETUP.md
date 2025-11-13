# Payment-Based Category Access System

This document describes the payment-based access system implemented for categories using PhonePe payment gateway.

## Features Implemented

1. **Admin Panel - Price Management**
   - Added price field to category creation/editing form
   - Categories can be set as free (price = 0) or paid
   - Price is stored in INR

2. **User Interface - Locked/Unlocked Status**
   - Categories with price > 0 appear as locked for users who haven't paid
   - Locked categories show a lock overlay with the price
   - Unlocked categories show an "Unlocked" badge
   - Free categories show a "Free" badge

3. **PhonePe Payment Integration (Using Official SDK)**
   - Payment initiation using PhonePe Node.js SDK (`pg-sdk-node`)
   - Payment callback handler for verifying successful payments
   - Automatic access granting after successful payment
   - Secure payment flow with proper error handling
   - Centralized helper utilities in `lib/phonepe.ts` for initiating payments, creating mobile SDK orders, checking order status, processing refunds, and validating callbacks

4. **Access Control**
   - Users cannot access tasks in locked categories
   - Task detail page checks access before allowing viewing
   - Access status is checked in real-time

## Database Collections

### Categories Collection
- Added `price` field (number, default: 0)

### New Collections Created

1. **payments** - Stores payment transactions
   - `userId`, `userEmail`, `categoryId`
   - `amount`, `transactionId`, `phonepeTransactionId`
   - `status` (pending, success, failed, cancelled)
   - `paymentMethod`, `createdAt`, `updatedAt`

2. **categoryAccess** - Stores user access grants
   - `userId`, `userEmail`, `categoryId`
   - `paymentId` (reference to payment)
   - `accessGranted` (boolean)
   - `accessGrantedAt`, `createdAt`

## Environment Variables Required

Add these to your `.env` file:

```env
# PhonePe SDK Configuration
PHONEPE_CLIENT_ID=your_client_id
PHONEPE_CLIENT_SECRET=your_client_secret
PHONEPE_CLIENT_VERSION=1.0
PHONEPE_ENV=SANDBOX
# For production, change to: PHONEPE_ENV=PRODUCTION

# Base URL for callbacks and redirects
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# For production: https://yourdomain.com
```

### Environment Variable Details

- **PHONEPE_CLIENT_ID**: Your unique client ID from PhonePe (Integer)
- **PHONEPE_CLIENT_SECRET**: Secret key provided by PhonePe (Integer)
- **PHONEPE_CLIENT_VERSION**: Client version for secure communication (String, default: "1.0")
- **PHONEPE_ENV**: Environment setting - use `SANDBOX` for testing or `PRODUCTION` for live payments
- **NEXT_PUBLIC_BASE_URL**: Public URL of your deployment. Used for redirect/callback URLs.

## API Endpoints

### 1. Initiate Payment
**POST** `/api/payments/initiate`
```json
{
  "userId": "user_id",
  "userEmail": "user@example.com",
  "categoryId": "category_id"
}
```

### 2. Check Access
**POST** `/api/payments/check-access`
```json
{
  "userId": "user_id",
  "categoryId": "category_id"
}
```

### 3. Get Access Status (Multiple Categories)
**POST** `/api/payments/access-status`
```json
{
  "userId": "user_id",
  "categoryIds": ["cat1", "cat2", "cat3"]
}
```

### 4. Payment Callback
**POST** `/api/payments/callback`
- Handles PhonePe webhook callbacks
- Verifies payment and grants access

**GET** `/api/payments/callback?transactionId=xxx`
- Handles redirect from PhonePe after payment

## PhonePe Setup Instructions

1. **Register with PhonePe**
   - Sign up at PhonePe for Business
   - Complete merchant verification
   - Get your Client ID, Client Secret, and Client Version

2. **Install Dependencies**
   - The project uses `pg-sdk-node` package (already installed)
   - No additional setup required

3. **Configure Environment Variables**
   - Add all required environment variables to your `.env` file
   - Use `PHONEPE_ENV=SANDBOX` for testing
   - Switch to `PHONEPE_ENV=PRODUCTION` when going live

4. **Configure Webhook**
   - Set callback URL: `https://yourdomain.com/api/payments/callback`
   - Configure in PhonePe merchant dashboard

5. **Test in Sandbox**
   - Use sandbox credentials for testing
   - Test payment flow with test cards
   - Verify callback handling
   - Minimum payment amount is ₹1 (100 paise)

## Payment Flow

1. User clicks on locked category
2. System checks if user has access
3. If no access and category is paid:
   - Create payment record (status: pending)
   - Initiate PhonePe payment
   - Redirect user to PhonePe payment page
4. User completes payment on PhonePe
5. PhonePe sends callback to `/api/payments/callback`
6. System fetches the latest order status from PhonePe to verify the payment outcome
7. If payment successful:
   - Update payment record (status: success)
   - Create categoryAccess record
   - Grant user access to category
8. User is redirected back to tasks page
9. Category now shows as unlocked

## Security Considerations

1. **Payment Verification**
   - Payment initiation uses PhonePe official SDK with secure authentication
   - Every callback triggers an authenticated order-status lookup using the PhonePe SDK (no salt keys required)
   - Prevents unauthorized payment confirmations by cross-checking with PhonePe's status API
   - Client credentials are securely stored in environment variables

2. **Access Control**
   - Access is checked on both frontend and backend
   - Task access is verified before allowing submission
   - Database-level access tracking

3. **Transaction Safety**
   - Each payment has unique transaction ID
   - Prevents duplicate payments
   - Tracks payment status throughout lifecycle

## Testing

1. **Create a Paid Category**
   - Go to Admin Panel > Categories
   - Create a new category with price > 0
   - Save the category

2. **Test as User**
   - Login as regular user
   - Navigate to Tasks page
   - See category as locked
   - Click on locked category
   - Complete payment flow
   - Verify access is granted

3. **Test Free Category**
   - Create category with price = 0
   - Verify it shows as "Free" and is accessible

## Notes

- Categories with price = 0 are automatically accessible
- Once paid, access is granted permanently (lifetime access)
- Payment status is tracked in the database
- Failed payments don't grant access
- Users can see their access status in real-time

