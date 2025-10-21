import { type Result, createError, createResult } from "@utils/result/Result"
import * as v from "valibot"

export type MailjetSendProps = {
  Messages: Array<MailjetEmailProps>
  SandboxMode?: boolean
}

export type MailjetEmailProps = {
  From?: MailjetAddressInfo
  To: Array<MailjetAddressInfo>
  Cc?: Array<MailjetAddressInfo>
  Bcc?: Array<MailjetAddressInfo>
  Subject: string
  HTMLPart?: string
  TextPart?: string
  Attachments?: Array<MailjetAttachment>
}

export type MailjetAddressInfo = {
  Email: string
  Name: string
}

export type MailjetAttachment = {
  ContentType: string
  Filename: string
  Base64Content: string
}

export type MailjetMessageResult = {
  Email: string
  MessageUUID: string
  MessageID: number
  MessageHref: string
}

export type MailjetBulkResult = {
  Messages: Array<{
    Status: string
    To?: Array<MailjetMessageResult>
  }>
}

export type MailjetSingleMessageResult = {
  Status: string
  To?: Array<MailjetMessageResult>
}

export async function sendEmailsViaMailjetApi(
  props: MailjetSendProps,
  apiKeyPublic: string,
  apiKeyPrivate: string,
): Promise<Result<MailjetBulkResult>> {
  const op = "sendEmailsViaMailjetApi"
  if (props.Messages.length === 0) {
    return createError(op, "no messages")
  }

  for (const message of props.Messages) {
    if (message.To.length === 0) {
      return createError(op, "no recipients")
    }

    if (!message.Subject) {
      return createError(op, "missing subject")
    }

    if (!message.TextPart && !message.HTMLPart) {
      return createError(op, "missing text or html part")
    }
  }

  const baseUrl = "https://api.mailjet.com/v3.1/send"
  const body = JSON.stringify(props)

  const auth = btoa(`${apiKeyPublic}:${apiKeyPrivate}`)

  const fetched = await fetch(baseUrl, {
    body: body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    method: "POST",
  })
  const fetchText = await fetched.text()

  if (fetched.ok) {
    const successParsing = v.safeParse(successSchemaString, fetchText)
    if (successParsing.success) {
      return createResult(successParsing.output)
    }
    return createResult({ Messages: [] } as MailjetBulkResult)
  }

  const parsing = v.safeParse(errSchemaString, fetchText)
  if (!parsing.success) {
    return createError(op, v.summarize(parsing.issues), fetchText)
  }
  return createError(op, fetched.statusText, fetchText)
}

const successMessageSchema = v.object({
  Email: v.string(),
  MessageUUID: v.string(),
  MessageID: v.number(),
  MessageHref: v.string(),
})

const successSchema = v.object({
  Messages: v.array(
    v.object({
      Status: v.string(),
      To: v.optional(v.array(successMessageSchema)),
      Cc: v.optional(v.array(successMessageSchema)),
      Bcc: v.optional(v.array(successMessageSchema)),
    }),
  ),
})
const successSchemaString = v.pipe(v.string(), v.parseJson(), successSchema)

const errMessageSchema = v.object({
  ErrorIdentifier: v.string(),
  ErrorCode: v.string(),
  StatusCode: v.number(),
  ErrorMessage: v.string(),
  ErrorRelatedTo: v.optional(v.array(v.string())),
})

const errSchema = v.object({
  Messages: v.array(
    v.object({
      Status: v.string(),
      Errors: v.optional(v.array(errMessageSchema)),
    }),
  ),
})
const errSchemaString = v.pipe(v.string(), v.parseJson(), errSchema)
