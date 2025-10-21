import { jsonStringifyPretty } from "@utils/json/jsonStringifyPretty"
import * as v from "valibot"
import { readEnvVariableResult } from "~utils/index"
import { createError, createResult, type Result, type ResultErr } from "~utils/result/Result"

export type ResendEnvVariableNames = {
  apiKey: string
  senderAddress: string
  senderName: string
}

export type ResendAddressInfo = {
  name?: string
  email: string
}

/**
 * https://resend.com/docs/api-reference/emails/send-email
 */
export type ResendEmailProps = {
  from?: ResendAddressInfo
  // Recipient email address. For multiple addresses, send as an array of strings. Max 50.
  to: Array<ResendAddressInfo>
  // Cc recipient email address. For multiple addresses, send as an array of strings.
  cc?: Array<ResendAddressInfo>
  // Bcc recipient email address. For multiple addresses, send as an array of strings.
  bcc?: Array<ResendAddressInfo>
  // Reply-to email address. For multiple addresses, send as an array of strings.
  replyTo?: Array<ResendAddressInfo>
  // Email subject.
  subject: string
  html?: string
  text?: string
  attachments?: Array<ResendAttachment>

  // Schedule email to be sent later. The date should be in natural language (e.g.: in 1 min) or ISO 8601 format (e.g: 2024-08-05T11:52:01.858Z).
  scheduledAt?: string
}

export type ResendAttachment = {
  // Content of an attached file, passed as a buffer or Base64 string.
  content: Buffer | string
  // Name of attached file.
  filename: string
  // Path where the attachment file is hosted
  path?: string
  // Content type for the attachment, if not set will be derived from the filename property
  contentType: string
  // You can embed images using the content_id parameter for the attachment. To show the image, you need to include the ID in the src attribute of the img tag (e.g., <img src="cid:...">) of your HTML.
  contentId?: string
}

export type ResendEmailSend = {
  id: string
}

export async function sendEmailViaResend(
  props: ResendEmailProps,
  envVariableNames: ResendEnvVariableNames,
): Promise<Result<ResendEmailSend>> {
  const op = "sendEmailViaResend"
  const apiKeyResult = readEnvVariableResult(envVariableNames.apiKey)
  if (!apiKeyResult.success) return apiKeyResult as ResultErr
  const apiKey = apiKeyResult.data

  if (!props.from) {
    const senderAddressResult = readEnvVariableResult(envVariableNames.senderAddress)
    if (!senderAddressResult.success) return senderAddressResult as ResultErr
    const senderAddress = senderAddressResult.data

    const senderNameResult = readEnvVariableResult(envVariableNames.senderName)
    if (!senderNameResult.success) return senderNameResult as ResultErr
    const senderName = senderNameResult.data

    props.from = { name: senderName, email: senderAddress }
  }

  return sendEmailViaResendApi(props, apiKey)
}

export async function sendEmailViaResendApi(props: ResendEmailProps, apiKey: string): Promise<Result<ResendEmailSend>> {
  const op = "sendEmailViaResendApi"

  // Check required fields individually
  if (!props.from) {
    return createError(op, "Missing required 'from' field", jsonStringifyPretty(props))
  }
  if (!props.from.email) {
    return createError(op, "Missing required 'email' in 'from' field", jsonStringifyPretty(props))
  }
  if (!props.subject) {
    return createError(op, "Missing required 'subject' field", jsonStringifyPretty(props))
  }
  if (props.to.length === 0) {
    return createError(op, "Missing required 'to' recipients", jsonStringifyPretty(props))
  }
  if (!props.text && !props.html) {
    return createError(op, "missing text and html part", jsonStringifyPretty(props))
  }

  const baseUrl = "https://api.resend.com/emails"

  const { from, to, cc, bcc, replyTo, ...rest } = props

  const bodyObject = {
    ...rest,
    from: serializeAdress(from),
    to: serializeAdresses(to),
  } as any
  if (cc) {
    bodyObject.cc = serializeAdresses(cc)
  }
  if (bcc) {
    bodyObject.bcc = serializeAdresses(bcc)
  }
  if (replyTo) {
    bodyObject.replyTo = serializeAdresses(replyTo)
  }

  const body = JSON.stringify(bodyObject)

  const fetched = await fetch(baseUrl, {
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    method: "POST",
  })
  const fetchText = await fetched.text()

  if (fetched.ok) {
    const successParsing = v.safeParse(successSchemaFromString, fetchText)
    if (successParsing.success) {
      return createResult(successParsing.output)
    }
    return createResult({ id: "unknown" } as ResendEmailSend)
  }

  const parsing = v.safeParse(errSchemaFromString, fetchText)
  if (!parsing.success) {
    return createError(op, v.summarize(parsing.issues), fetchText)
  }

  const error = parsing.output
  return createError(op, error.message || "Unknown error")
}

function serializeAdresses(addresses: ResendAddressInfo[]): string[] {
  return addresses.map(serializeAdress)
}

function serializeAdress(recipient: ResendAddressInfo): string {
  if (recipient.name) return `${recipient.name} <${recipient.email}>`
  return recipient.email
}

const successSchema = v.object({
  id: v.string(),
})
const successSchemaFromString = v.pipe(v.string(), v.parseJson(), successSchema)

const errSchema = v.object({
  message: v.string(),
})
const errSchemaFromString = v.pipe(v.string(), v.parseJson(), errSchema)
