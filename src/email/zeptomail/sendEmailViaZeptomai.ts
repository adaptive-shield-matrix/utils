import {
  sendEmailsViaZeptomail,
  type ZeptomailEnvVariableNames,
  type ZeptomailOptionalSender,
} from "~utils/email/zeptomail/sendEmailsViaZeptomail"
import { type ZeptomailAddress } from "~utils/email/zeptomail/sendEmailsViaZeptomailApi"
import { type Result } from "~utils/result/Result"

export async function sendEmailViaZeptomai(
  subject: string,
  html: string,
  to: ZeptomailAddress,
  envVariableNames: ZeptomailEnvVariableNames,
): Promise<Result<null>> {
  const props: ZeptomailOptionalSender = {
    subject,
    htmlBody: html,
    to: [to],
  }
  return sendEmailsViaZeptomail(props, envVariableNames)
}
