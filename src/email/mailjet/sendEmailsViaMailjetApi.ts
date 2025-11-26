import * as a from "valibot"
import { type Result, createError, createResult } from "~utils/result/Result"

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
    const successParsing = a.safeParse(successSchemaString, fetchText)
    if (successParsing.success) {
      return createResult(successParsing.output)
    }
    return createResult({ Messages: [] } as MailjetBulkResult)
  }

  const parsing = a.safeParse(errSchemaString, fetchText)
  if (!parsing.success) {
    return createError(op, a.summarize(parsing.issues), fetchText)
  }
  return createError(op, fetched.statusText, fetchText)
}

const successMessageSchema = a.object({
  Email: a.string(),
  MessageUUID: a.string(),
  MessageID: a.number(),
  MessageHref: a.string(),
})

const successSchema = a.object({
  Messages: a.array(
    a.object({
      Status: a.string(),
      To: a.optional(a.array(successMessageSchema)),
      Cc: a.optional(a.array(successMessageSchema)),
      Bcc: a.optional(a.array(successMessageSchema)),
    }),
  ),
})
const successSchemaString = a.pipe(a.string(), a.parseJson(), successSchema)

const errMessageSchema = a.object({
  ErrorIdentifier: a.string(),
  ErrorCode: a.string(),
  StatusCode: a.number(),
  ErrorMessage: a.string(),
  ErrorRelatedTo: a.optional(a.array(a.string())),
})

const errSchema = a.object({
  Messages: a.array(
    a.object({
      Status: a.string(),
      Errors: a.optional(a.array(errMessageSchema)),
    }),
  ),
})
const errSchemaString = a.pipe(a.string(), a.parseJson(), errSchema)
