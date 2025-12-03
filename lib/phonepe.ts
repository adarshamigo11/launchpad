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
    console.log("[PhonePe] Using existing client instance");
    return phonePeClient
  }

  console.log("[PhonePe] Creating new client instance with config:", {
    hasClientId: !!PHONEPE_CLIENT_ID,
    hasClientSecret: !!PHONEPE_CLIENT_SECRET,
    clientIdPrefix: PHONEPE_CLIENT_ID.substring(0, 10) + "...",
    env: PHONEPE_ENVIRONMENT,
  });

  if (!PHONEPE_CLIENT_ID || !PHONEPE_CLIENT_SECRET) {
    console.error("[PhonePe] Client credentials missing");
    throw new Error("PhonePe client credentials are not configured.")
  }

  const clientVersion = parseClientVersion()
  console.log("[PhonePe] Parsed client version:", clientVersion);

  const env =
    PHONEPE_ENVIRONMENT === "PRODUCTION" ? Env.PRODUCTION : Env.SANDBOX
  console.log("[PhonePe] Environment:", env);

  try {
    phonePeClient = StandardCheckoutClient.getInstance(
      PHONEPE_CLIENT_ID,
      PHONEPE_CLIENT_SECRET,
      clientVersion,
      env
    )
    console.log("[PhonePe] Client created successfully");
    return phonePeClient
  } catch (error: any) {
    console.error("[PhonePe] Failed to create client:", {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
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

  console.log("[PhonePe] Initiating standard checkout payment:", {
    merchantOrderId,
    amountInPaise,
    hasRedirectUrl: !!redirectUrl,
    hasMessage: !!message,
    expireAfterSeconds,
    hasMetaInfo: !!metaInfo,
  });

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
  console.log("[PhonePe] Pay request built successfully");

  const client = getPhonePeClient()
  console.log("[PhonePe] Got client, calling pay method");

  try {
    const response = await client.pay(payRequest)
    console.log("[PhonePe] Pay method response received:", {
      hasRedirectUrl: !!(response as any).redirectUrl,
      orderId: response.orderId,
      state: response.state,
    });
    return response
  } catch (error: any) {
    console.error("[PhonePe] Pay method error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
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

  console.log("[PhonePe] Creating standard checkout SDK order:", {
    merchantOrderId,
    amountInPaise,
    redirectUrl,
    hasMessage: !!message,
    expireAfterSeconds,
  });

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
  console.log("[PhonePe] SDK order request built successfully");

  const client = getPhonePeClient()
  console.log("[PhonePe] Got client, calling createSdkOrder method");

  try {
    const response = await client.createSdkOrder(sdkRequest)
    console.log("[PhonePe] Create SDK order response received:", {
      hasRedirectUrl: !!(response as any).redirectUrl,
      orderId: response.orderId,
      state: response.state,
    });
    return response
  } catch (error: any) {
    console.error("[PhonePe] Create SDK order error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
}

export async function getStandardCheckoutOrderStatus(
  merchantOrderId: string,
  includeAllAttempts = false
): Promise<OrderStatusResponse> {
  console.log("[PhonePe] Getting order status:", {
    merchantOrderId,
    includeAllAttempts,
  });

  const client = getPhonePeClient()
  console.log("[PhonePe] Got client, calling getOrderStatus method");

  try {
    const response = await client.getOrderStatus(merchantOrderId, includeAllAttempts)
    console.log("[PhonePe] Get order status response received");
    return response
  } catch (error: any) {
    console.error("[PhonePe] Get order status error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
}

export async function initiatePhonePeRefund(params: {
  merchantOrderId: string
  refundId: string
  amountInPaise: number
}): Promise<RefundResponse> {
  const { merchantOrderId, refundId, amountInPaise } = params

  console.log("[PhonePe] Initiating refund:", {
    merchantOrderId,
    refundId,
    amountInPaise,
  });

  if (amountInPaise < 100) {
    throw new Error("PhonePe refund amount must be at least 100 paise.")
  }

  const builder = RefundRequest.builder()
    .merchantRefundId(refundId)
    .originalMerchantOrderId(merchantOrderId)
    .amount(amountInPaise)

  const refundRequest = builder.build()
  console.log("[PhonePe] Refund request built successfully");

  const client = getPhonePeClient()
  console.log("[PhonePe] Got client, calling refund method");

  try {
    const response = await client.refund(refundRequest)
    console.log("[PhonePe] Refund response received");
    return response
  } catch (error: any) {
    console.error("[PhonePe] Refund error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
}

export async function getPhonePeRefundStatus(
  refundId: string
): Promise<RefundStatusResponse> {
  console.log("[PhonePe] Getting refund status:", { refundId });

  const client = getPhonePeClient()
  console.log("[PhonePe] Got client, calling getRefundStatus method");

  try {
    const response = await client.getRefundStatus(refundId)
    console.log("[PhonePe] Get refund status response received");
    return response
  } catch (error: any) {
    console.error("[PhonePe] Get refund status error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  }
}

export const PHONEPE_ENV = PHONEPE_ENVIRONMENT