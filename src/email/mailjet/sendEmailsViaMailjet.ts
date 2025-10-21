import {
  sendEmailsViaMailjetApi,
  type MailjetBulkResult,
  type MailjetEmailProps,
  type MailjetSendProps,
} from "~utils/email/mailjet/sendEmailsViaMailjetApi"
import { readEnvVariableResult } from "~utils/env/readEnvVariable"
import { createResult, type Result, type ResultErr } from "~utils/result/Result"

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
