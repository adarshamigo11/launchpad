import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    phonepe: {
      hasClientId: !!process.env.PHONEPE_CLIENT_ID,
      hasClientSecret: !!process.env.PHONEPE_CLIENT_SECRET,
      clientIdLength: process.env.PHONEPE_CLIENT_ID?.length || 0,
      clientSecretLength: process.env.PHONEPE_CLIENT_SECRET?.length || 0,
      version: process.env.PHONEPE_CLIENT_VERSION,
      env: process.env.PHONEPE_ENV,
    },
    nextPublic: {
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    },
    nodeEnv: process.env.NODE_ENV,
  })
}
