import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc, PasswordResetDoc } from "@/lib/models"
import { randomBytes } from "crypto"
import nodemailer from 'nodemailer'

async function sendPasswordResetEmail(userEmail: string, userName: string, resetToken: string): Promise<void> {
  try {
    console.log("Sending password reset email to:", userEmail)
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`
    const subject = 'Reset Your Password - Launchpad Platform'
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #6366f1;
            margin-bottom: 10px;
          }
          .title {
            color: #1f2937;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .content {
            margin-bottom: 30px;
          }
          .highlight {
            background-color: #fef3c7;
            padding: 15px;
            border-left: 4px solid #f59e0b;
            margin: 20px 0;
            border-radius: 4px;
          }
          .reset-button {
            display: inline-block;
            background-color: #dc2626;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 20px 0;
          }
          .reset-button:hover {
            background-color: #b91c1c;
          }
          .security-note {
            background-color: #f0f9ff;
            padding: 15px;
            border-left: 4px solid #3b82f6;
            margin: 20px 0;
            border-radius: 4px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .token-info {
            background-color: #f9fafb;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 12px;
            word-break: break-all;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚀 Launchpad Platform</div>
            <h1 class="title">Password Reset Request</h1>
          </div>
          
          <div class="content">
            <p>Hello ${userName},</p>
            
            <p>We received a request to reset your password for your Launchpad Platform account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="reset-button">
                Reset My Password
              </a>
            </div>
            
            <div class="highlight">
              <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons. If you don't reset your password within this time, you'll need to request a new reset link.
            </div>
            
            <div class="security-note">
              <strong>🔒 Security Note:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged, and no further action is required.
            </div>
            
            <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
            <div class="token-info">${resetUrl}</div>
            
            <p>If you have any questions or need assistance, please contact our support team.</p>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The Launchpad Platform Team</p>
            <p>This email was sent to ${userEmail}. If you didn't request this password reset, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
    `

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: userEmail,
      subject,
      html,
    }

    await transporter.sendMail(mailOptions)
    console.log(`Password reset email sent successfully to ${userEmail}`)
  } catch (error) {
    console.error('Error sending password reset email:', error)
    throw error
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, phone } = await req.json()

    if (!email || !name || !phone) {
      return NextResponse.json({ 
        ok: false, 
        message: "Email, name, and phone are required" 
      }, { status: 400 })
    }

    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")

    // Check if user exists with matching details
    const user = await usersCollection.findOne({ 
      email: email.toLowerCase(),
      name: { $regex: new RegExp(name, 'i') }, // Case-insensitive name match
      phone: phone
    })

    if (!user) {
      return NextResponse.json({ 
        ok: false, 
        message: "No account found with the provided details. Please check your email, name, and phone number." 
      }, { status: 404 })
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Store reset token in database
    const passwordResetsCollection = db.collection<PasswordResetDoc>("passwordResets")
    
    // Remove any existing reset tokens for this email
    await passwordResetsCollection.deleteMany({ email: email.toLowerCase() })
    
    // Insert new reset token
    await passwordResetsCollection.insertOne({
      email: email.toLowerCase(),
      token: resetToken,
      expiresAt,
      used: false,
      createdAt: new Date()
    })

    // Send password reset email
    await sendPasswordResetEmail(email, name, resetToken)

    return NextResponse.json({ 
      ok: true, 
      message: "Password reset link has been sent to your email address" 
    })
  } catch (error) {
    console.error("[Launchpad] Forgot password error:", error)
    return NextResponse.json({ 
      ok: false, 
      message: "Internal server error" 
    }, { status: 500 })
  }
}
