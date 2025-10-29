import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import type { UserDoc } from "@/lib/models"
import { generateUniqueId } from "@/lib/server-utils"
import nodemailer from 'nodemailer'

async function sendWelcomeEmail(userEmail: string, userName: string): Promise<void> {
  try {
    console.log("Sending welcome email to:", userEmail)
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const subject = 'Welcome to Launchpad Platform! 🚀'
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Launchpad Platform</title>
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
          .welcome-title {
            color: #1f2937;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .content {
            margin-bottom: 30px;
          }
          .highlight {
            background-color: #f0f9ff;
            padding: 15px;
            border-left: 4px solid #3b82f6;
            margin: 20px 0;
            border-radius: 4px;
          }
          .cta-button {
            display: inline-block;
            background-color: #6366f1;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 20px 0;
          }
          .cta-button:hover {
            background-color: #4f46e5;
          }
          .features {
            margin: 20px 0;
          }
          .feature-item {
            margin: 10px 0;
            padding-left: 20px;
            position: relative;
          }
          .feature-item::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚀 Launchpad Platform</div>
            <h1 class="welcome-title">Welcome, ${userName}!</h1>
          </div>
          
          <div class="content">
            <p>Thank you for joining Launchpad Platform! We're excited to have you on board and can't wait to see what amazing projects you'll create.</p>
            
            <div class="highlight">
              <strong>🎉 Your account has been successfully created!</strong><br>
              You can now start exploring challenges, earning points, and building your portfolio.
            </div>
            
            <h3>What's next?</h3>
            <div class="features">
              <div class="feature-item">Browse our curated collection of coding challenges</div>
              <div class="feature-item">Submit your solutions and earn points</div>
              <div class="feature-item">Track your progress on the leaderboard</div>
              <div class="feature-item">Connect with other developers in our community</div>
              <div class="feature-item">Build a portfolio that showcases your skills</div>
            </div>
            
            <div style="text-align: center;">
              <a href="https://launchpad.expert/tasks" class="cta-button">
                Start Your First Challenge
              </a>
            </div>
            
            <p>If you have any questions or need help getting started, don't hesitate to reach out to our support team. We're here to help you succeed!</p>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The Launchpad Platform Team</p>
            <p>This email was sent to ${userEmail}. If you didn't create an account, please ignore this email.</p>
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
    console.log(`Welcome email sent successfully to ${userEmail}`)
  } catch (error) {
    console.error('Error sending welcome email:', error)
    throw error
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, phone } = await req.json()

    if (!email || !password || !name || !phone) {
      return NextResponse.json({ ok: false, message: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb()
    const usersCollection = db.collection<UserDoc>("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ ok: false, message: "User already exists" }, { status: 400 })
    }

    // Generate unique ID for new user
    const uniqueId = await generateUniqueId()

    // Create new user
    const newUser: UserDoc = {
      email,
      password, // In production, hash this password!
      name,
      phone,
      profilePhoto: "/placeholder-user.jpg",
      points: 0,
      visitedTaskIds: [],
      uniqueId,
      createdAt: new Date(),
    }

    await usersCollection.insertOne(newUser)

    // Send welcome email (don't wait for it to complete)
    sendWelcomeEmail(email, name).catch((error) => {
      console.error("Failed to send welcome email:", error)
      // Don't fail the signup if email fails
    })

    return NextResponse.json({ ok: true, message: "User created successfully" })
  } catch (error) {
    console.error("[Launchpad] Signup error:", error)
    return NextResponse.json({ ok: false, message: "Internal server error" }, { status: 500 })
  }
}
