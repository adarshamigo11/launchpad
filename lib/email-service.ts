import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null

  private getTransporter(): nodemailer.Transporter {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      })
    }
    return this.transporter
  }

  async sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html,
      }

      await this.getTransporter().sendMail(mailOptions)
      console.log(`Email sent successfully to ${to}`)
      return true
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean> {
    const subject = 'Welcome to Launchpad Platform! 🚀'
    const html = this.getWelcomeEmailTemplate(userName)

    return await this.sendEmail({
      to: userEmail,
      subject,
      html,
    })
  }

  private getWelcomeEmailTemplate(userName: string): string {
    return `
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
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/tasks" class="cta-button">
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
  }
}

export const emailService = new EmailService()
