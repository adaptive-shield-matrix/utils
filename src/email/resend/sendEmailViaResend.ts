import { sendEmailsViaResend, type ResendEnvVariableNames } from "~utils/email/resend/sendEmailsViaResend"
import {
  type ResendAddressInfo,
  type ResendEmailProps,
  type ResendEmailSend,
} from "~utils/email/resend/sendEmailsViaResendApi"
import { type Result } from "~utils/result/Result"

export async function sendSingleEmailViaResend(
  subject: string,
  html: string,
  text: string,
  to: ResendAddressInfo,
  envVariableNames: ResendEnvVariableNames,
): Promise<Result<ResendEmailSend>> {
  const props: ResendEmailProps = {
    subject,
    html,
    text,
    to: [to],
  }
  return sendEmailsViaResend(props, envVariableNames)
}
