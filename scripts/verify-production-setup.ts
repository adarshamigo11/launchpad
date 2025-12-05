#!/usr/bin/env node

/**
 * Production Setup Verification Script
 * 
 * This script verifies that your production environment is properly configured
 * for deployment to launchpad.expert
 */

import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { StandardCheckoutClient, Env } from 'pg-sdk-node';

// Load production environment variables
config({ path: '.env.production' });

async function verifyMongoDBConnection() {
  console.log('🔍 Verifying MongoDB connection...');
  
  const mongoUri = process.env.MongoDBuri;
  if (!mongoUri) {
    console.error('❌ MongoDB URI not found in environment variables');
    return false;
  }
  
  try {
    console.log('   Connecting to MongoDB...');
    const client = new MongoClient(mongoUri, {
      tls: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    await client.connect();
    console.log('   ✅ Connected successfully');
    
    const db = client.db('Launchpad');
    await db.command({ ping: 1 });
    console.log('   ✅ Database ping successful');
    
    await client.close();
    console.log('   ✅ MongoDB verification passed');
    return true;
  } catch (error) {
    console.error('   ❌ MongoDB connection failed:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
}

async function verifyPhonePeCredentials() {
  console.log('\n🔍 Verifying PhonePe credentials...');
  
  const clientId = process.env.PHONEPE_CLIENT_ID;
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
  const environment = process.env.PHONEPE_ENV;
  
  if (!clientId || !clientSecret) {
    console.error('   ❌ PhonePe credentials not found in environment variables');
    return false;
  }
  
  if (environment !== 'PRODUCTION') {
    console.warn('   ⚠️  PhonePe environment is not set to PRODUCTION');
  }
  
  try {
    console.log('   Initializing PhonePe client...');
    const clientVersion = parseInt(process.env.PHONEPE_CLIENT_VERSION || '1');
    const env = environment === 'PRODUCTION' ? Env.PRODUCTION : Env.SANDBOX;
    
    const phonePeClient = StandardCheckoutClient.getInstance(
      clientId,
      clientSecret,
      clientVersion,
      env
    );
    
    console.log('   ✅ PhonePe client initialized successfully');
    return true;
  } catch (error) {
    console.error('   ❌ PhonePe client initialization failed:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
}

async function verifyBaseUrl() {
  console.log('\n🔍 Verifying base URL configuration...');
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  if (!baseUrl) {
    console.error('   ❌ NEXT_PUBLIC_BASE_URL not found in environment variables');
    return false;
  }
  
  if (baseUrl !== 'https://launchpad.expert') {
    console.warn(`   ⚠️  Base URL is set to ${baseUrl}, expected https://launchpad.expert`);
  }
  
  try {
    const url = new URL(baseUrl);
    if (url.protocol !== 'https:') {
      console.warn('   ⚠️  Base URL should use HTTPS protocol');
    }
    
    console.log('   ✅ Base URL verification passed');
    return true;
  } catch (error) {
    console.error('   ❌ Invalid base URL format:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
}

async function main() {
  console.log('🚀 Launchpad Production Setup Verification\n');
  
  const checks = [
    verifyMongoDBConnection(),
    verifyPhonePeCredentials(),
    verifyBaseUrl()
  ];
  
  const results = await Promise.all(checks);
  const passed = results.filter(Boolean).length;
  const total = checks.length;
  
  console.log(`\n📊 Verification Results: ${passed}/${total} checks passed`);
  
  if (passed === total) {
    console.log('✅ All checks passed! Your environment is ready for production deployment.');
    console.log('\n📝 Next steps:');
    console.log('   1. Ensure you have production credentials from PhonePe');
    console.log('   2. Deploy using: vercel --prod');
    console.log('   3. Test the payment flow on https://launchpad.expert');
  } else {
    console.log('❌ Some checks failed. Please review the errors above and fix them before deployment.');
    process.exit(1);
  }
}

// Run the verification
main().catch(error => {
  console.error('Unexpected error during verification:', error);
  process.exit(1);
});