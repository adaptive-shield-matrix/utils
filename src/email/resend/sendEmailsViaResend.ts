import {
  type ResendEmailProps,
  type ResendEmailSend,
  sendEmailsViaResendApi,
} from "@utils/email/resend/sendEmailsViaResendApi"
import { readEnvVariableResult } from "@utils/env/readEnvVariable"
import type { Result, ResultErr } from "@utils/result/Result"

export type ResendEnvVariableNames = {
  apiKey: string
  senderAddress: string
  senderName: string
}

export async function sendEmailsViaResend(
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

  return sendEmailsViaResendApi(props, apiKey)
}
