import {
  StandardCheckoutClient,
  Env,
  MetaInfo,
  StandardCheckoutPayRequest,
  CreateSdkOrderRequest,
  OrderStatusResponse,
  StandardCheckoutPayResponse,
  CreateSdkOrderResponse,
  RefundRequest,
  RefundResponse,
  RefundStatusResponse,
} from "pg-sdk-node"

type PhonePeEnvironment = "SANDBOX" | "PRODUCTION"

const PHONEPE_CLIENT_ID = process.env.PHONEPE_CLIENT_ID || ""
const PHONEPE_CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || ""
const PHONEPE_CLIENT_VERSION_RAW = process.env.PHONEPE_CLIENT_VERSION || "1"
const PHONEPE_ENVIRONMENT: PhonePeEnvironment =
  process.env.PHONEPE_ENV === "PRODUCTION" ? "PRODUCTION" : "SANDBOX"

let phonePeClient: StandardCheckoutClient | null = null

function parseClientVersion(): number {
  const parsed = Number(PHONEPE_CLIENT_VERSION_RAW)
  if (!Number.isFinite(parsed)) {
    throw new Error(
      `Invalid PHONEPE_CLIENT_VERSION value (${PHONEPE_CLIENT_VERSION_RAW}). It must be a numeric value.`
    )
  }
  return parsed
}

export function getPhonePeClient(): StandardCheckoutClient {
  if (phonePeClient) {
    return phonePeClient
  }

  if (!PHONEPE_CLIENT_ID || !PHONEPE_CLIENT_SECRET) {
    throw new Error("PhonePe client credentials are not configured.")
  }

  const clientVersion = parseClientVersion()

  const env =
    PHONEPE_ENVIRONMENT === "PRODUCTION" ? Env.PRODUCTION : Env.SANDBOX

  phonePeClient = StandardCheckoutClient.getInstance(
    PHONEPE_CLIENT_ID,
    PHONEPE_CLIENT_SECRET,
    clientVersion,
    env
  )
  return phonePeClient
}

export type PhonePeMetaInfoInput = Partial<{
  udf1: string
  udf2: string
  udf3: string
  udf4: string
  udf5: string
}>

export function buildPhonePeMetaInfo(
  input: PhonePeMetaInfoInput
): MetaInfo | undefined {
  const { udf1, udf2, udf3, udf4, udf5 } = input
  if (!udf1 && !udf2 && !udf3 && !udf4 && !udf5) {
    return undefined
  }
  const builder = MetaInfo.builder()
  if (udf1) builder.udf1(udf1)
  if (udf2) builder.udf2(udf2)
  if (udf3) builder.udf3(udf3)
  if (udf4) builder.udf4(udf4)
  if (udf5) builder.udf5(udf5)
  return builder.build()
}

export async function initiateStandardCheckoutPayment(params: {
  merchantOrderId: string
  amountInPaise: number
  redirectUrl?: string
  message?: string
  expireAfterSeconds?: number
  metaInfo?: MetaInfo
}): Promise<StandardCheckoutPayResponse> {
  const {
    merchantOrderId,
    amountInPaise,
    redirectUrl,
    message,
    expireAfterSeconds,
    metaInfo,
  } = params

  if (amountInPaise < 100) {
    throw new Error(
      "PhonePe payment amount must be at least 100 paise (₹1.00)."
    )
  }

  const builder = StandardCheckoutPayRequest.builder()
    .merchantOrderId(merchantOrderId)
    .amount(amountInPaise)

  if (metaInfo) {
    builder.metaInfo(metaInfo)
  }
  if (redirectUrl) {
    builder.redirectUrl(redirectUrl)
  }
  if (message) {
    builder.message(message)
  }
  if (expireAfterSeconds) {
    builder.expireAfter(expireAfterSeconds)
  }

  const payRequest = builder.build()
  const client = getPhonePeClient()
  return client.pay(payRequest)
}

export async function createStandardCheckoutSdkOrder(params: {
  merchantOrderId: string
  amountInPaise: number
  redirectUrl: string
  message?: string
  expireAfterSeconds?: number
}): Promise<CreateSdkOrderResponse> {
  const { merchantOrderId, amountInPaise, redirectUrl, message, expireAfterSeconds } =
    params

  if (amountInPaise < 100) {
    throw new Error(
      "PhonePe SDK order amount must be at least 100 paise (₹1.00)."
    )
  }

  const builder = CreateSdkOrderRequest.StandardCheckoutBuilder()
    .merchantOrderId(merchantOrderId)
    .amount(amountInPaise)
    .redirectUrl(redirectUrl)

  if (message) {
    builder.message(message)
  }
  if (expireAfterSeconds) {
    builder.expireAfter(expireAfterSeconds)
  }

  const sdkRequest = builder.build()
  const client = getPhonePeClient()
  return client.createSdkOrder(sdkRequest)
}

export async function getStandardCheckoutOrderStatus(
  merchantOrderId: string,
  includeAllAttempts = false
): Promise<OrderStatusResponse> {
  const client = getPhonePeClient()
  return client.getOrderStatus(merchantOrderId, includeAllAttempts)
}

export async function initiatePhonePeRefund(params: {
  merchantOrderId: string
  refundId: string
  amountInPaise: number
}): Promise<RefundResponse> {
  const { merchantOrderId, refundId, amountInPaise } = params

  if (amountInPaise < 100) {
    throw new Error("PhonePe refund amount must be at least 100 paise.")
  }

  const builder = RefundRequest.builder()
    .merchantRefundId(refundId)
    .originalMerchantOrderId(merchantOrderId)
    .amount(amountInPaise)

  const refundRequest = builder.build()
  const client = getPhonePeClient()
  return client.refund(refundRequest)
}

export async function getPhonePeRefundStatus(
  refundId: string
): Promise<RefundStatusResponse> {
  const client = getPhonePeClient()
  return client.getRefundStatus(refundId)
}

export const PHONEPE_ENV = PHONEPE_ENVIRONMENT

