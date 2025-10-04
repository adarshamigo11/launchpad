# Neon Task Management App

A full-stack Next.js application with MongoDB for task management, user authentication, and leaderboard tracking.

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create a `.env` file in the root directory with your MongoDB URI:
\`\`\`
MongoDBuri=mongodb+srv://techzuperstudio_db_user:Sagar%40123@cluster0.henmopd.mongodb.net/Launchpad?retryWrites=true&w=majority&appName=Cluster0
\`\`\`

3. Seed the admin user:
\`\`\`bash
node scripts/seed-admin.js
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000)

## Features

- User signup and login
- Admin dashboard for task management
- Task submission and approval system
- Points-based leaderboard
- MongoDB integration for data persistence

## Admin Access

- Email: admin@admin.com
- Password: 123

## Tech Stack

- Next.js 15 (App Router)
- MongoDB
- TypeScript
- Tailwind CSS
- shadcn/ui components
