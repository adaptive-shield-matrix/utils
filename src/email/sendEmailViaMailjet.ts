import * as v from "valibot"
import { readEnvVariableResult } from "~utils/env/readEnvVariable"
import { createError, createResult, type Result, type ResultErr } from "~utils/result/Result"

export type MailjetAttachment = {
  ContentType: string
  Filename: string
  Base64Content: string
}

export type MailjetAddressInfo = {
  Email: string
  Name: string
}

export type MailjetEmailProps = {
  From?: MailjetAddressInfo
  To: Array<MailjetAddressInfo>
  Cc?: Array<MailjetAddressInfo>
  Bcc?: Array<MailjetAddressInfo>
  Subject: string
  TextPart?: string
  HTMLPart?: string
  Attachments?: Array<MailjetAttachment>
}

export type MailjetSendProps = {
  Messages: Array<MailjetEmailProps>
  SandboxMode?: boolean
}

export async function sendEmailViaMailjet(
  props: MailjetEmailProps,
  envVariableNames: MailjetEnvVariableNames,
  SandboxMode: boolean = false,
): Promise<Result<MailjetSingleMessageResult>> {
  const op = "sendEmailViaMailjet"
  const result = await sendEmailsViaMailjet(
    {
      Messages: [props],
      SandboxMode,
    },
    envVariableNames,
  )

  if (!result.success) {
    return result as ResultErr
  }

  const message0 = result.data.Messages[0]
  if (!message0) {
    return createError(op, "missing message from api call")
  }

  return createResult(message0)
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

export type MailjetEnvVariableNames = {
  apiKeyPublic: string
  apiKeyPrivate: string
  senderAddress: string
  senderName: string
}

export async function sendEmailsViaMailjet(
  props: MailjetSendProps,
  envVariableNames: MailjetEnvVariableNames,
): Promise<Result<MailjetBulkResult>> {
  const op = "sendEmailsViaMailjet"
  const apiKeyPublicResult = readEnvVariableResult(envVariableNames.apiKeyPublic)
  if (!apiKeyPublicResult.success) return apiKeyPublicResult as ResultErr
  const apiKeyPublic = apiKeyPublicResult.data

  const apiKeyPrivateResult = readEnvVariableResult(envVariableNames.apiKeyPrivate)
  if (!apiKeyPrivateResult.success) return apiKeyPrivateResult as ResultErr
  const apiKeyPrivate = apiKeyPrivateResult.data

  // Check if any message is missing sender
  const hasMissingSender = props.Messages.some((message) => !message.From)
  let messagesToSend = props.Messages
  if (hasMissingSender) {
    const addSenderResult = addSender(props.Messages, envVariableNames)
    if (!addSenderResult.success) return addSenderResult as ResultErr
    messagesToSend = addSenderResult.data
  }

  const sendProps = {
    ...props,
    Messages: messagesToSend,
  }

  return sendEmailsViaMailjetApi(sendProps, apiKeyPublic, apiKeyPrivate)
}

function addSender(
  messages: MailjetEmailProps[],
  envVariableNames: MailjetEnvVariableNames,
): Result<MailjetEmailProps[]> {
  const op = "addSender"
  const senderAddressResult = readEnvVariableResult(envVariableNames.senderAddress)
  if (!senderAddressResult.success) return senderAddressResult as ResultErr
  const senderAddress = senderAddressResult.data

  const senderNameResult = readEnvVariableResult(envVariableNames.senderName)
  if (!senderNameResult.success) return senderNameResult as ResultErr
  const senderName = senderNameResult.data

  const messagesWithSender = messages.map((message) => ({
    ...message,
    From: message.From || {
      Email: senderAddress,
      Name: senderName,
    },
  }))

  return createResult(messagesWithSender)
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
