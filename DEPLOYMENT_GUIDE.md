# Production Deployment Guide for Launchpad.expert

This guide will help you deploy your application to production with the domain launchpad.expert.

## Prerequisites

1. Production domain (launchpad.expert) with DNS management access
2. SSL certificate for HTTPS (automatically provided by Vercel)
3. Production credentials from PhonePe
4. MongoDB Atlas cluster accessible from production environment

## Environment Configuration

### 1. Update Environment Variables

Create or update `.env.production` with your production values:

```bash
# MongoDB Configuration
MongoDBuri=mongodb+srv://techzuperstudio_db_user:launchpad123@cluster0.phbhneq.mongodb.net/Launchpad?retryWrites=true&w=majority

# Gmail SMTP Configuration (if used in production)
GMAIL_USER=launchpadexpertech@gmail.com
GMAIL_APP_PASSWORD=your_app_password_here

# PhonePe SDK Configuration - PRODUCTION
PHONEPE_CLIENT_ID=your_production_client_id_here
PHONEPE_CLIENT_SECRET=your_production_client_secret_here
PHONEPE_CLIENT_VERSION=1
PHONEPE_ENV=PRODUCTION

# Base URL for callbacks and redirects
NEXT_PUBLIC_BASE_URL=https://launchpad.expert
```

### 2. PhonePe Production Credentials

To get production credentials from PhonePe:
1. Visit the PhonePe Partner Portal
2. Apply for production access if you haven't already
3. Once approved, you'll receive:
   - Production Client ID
   - Production Client Secret
4. Replace the placeholder values in `.env.production`

## Domain Configuration

### 1. DNS Setup

Add the following DNS records to your domain registrar:

1. **A Record** (if using Vercel):
   - Name: @ (or launchpad)
   - Value: 76.76.21.21 (Vercel IP)

2. **CNAME Record** (alternative):
   - Name: www
   - Value: cname.vercel-dns.com

### 2. Vercel Domain Configuration

If deploying to Vercel:

1. Add your domain to your Vercel project:
   ```bash
   vercel domains add launchpad.expert
   ```

2. Verify domain ownership:
   ```bash
   vercel domains verify launchpad.expert
   ```

3. Configure DNS as prompted by Vercel

## SSL/TLS Configuration

Vercel automatically provisions SSL certificates for custom domains. No additional configuration is needed.

## Deployment Process

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy to production:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy with Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Trigger deployment

## Post-Deployment Verification

### 1. Test Payment Flow

1. Visit https://launchpad.expert
2. Navigate to E-Summit section
3. Try to make a test payment with a small amount
4. Verify the PhonePe payment page loads correctly

### 2. Test Promo Codes

1. Create a promo code in the admin panel
2. Try to apply it during checkout
3. Verify the discount is applied correctly

### 3. Test Callback Handling

1. Complete a test payment
2. Verify the callback URL is called correctly
3. Check that payment status is updated in the database

## Troubleshooting

### Common Issues

1. **Payment Not Working**:
   - Verify PhonePe production credentials
   - Check environment variables are set correctly
   - Ensure NEXT_PUBLIC_BASE_URL matches your domain

2. **Database Connection Issues**:
   - Verify MongoDB Atlas IP whitelist includes Vercel IPs
   - Check MongoDB connection string

3. **SSL/TLS Issues**:
   - Wait for Vercel to provision SSL certificate (can take a few minutes)
   - Check domain verification status in Vercel dashboard

### Logs and Monitoring

1. Check Vercel logs:
   ```bash
   vercel logs launchpad.expert
   ```

2. Monitor MongoDB Atlas for connection issues

3. Check browser console for JavaScript errors

## Security Considerations

1. Never commit sensitive credentials to version control
2. Use environment variables for all secrets
3. Regularly rotate credentials
4. Monitor for unauthorized access attempts

## Support

If you encounter issues:
1. Check the Vercel deployment logs
2. Review MongoDB Atlas connection logs
3. Contact PhonePe support for payment gateway issues
4. Reach out to your development team for code-related issues