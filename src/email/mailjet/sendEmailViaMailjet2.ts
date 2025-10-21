import type { MailjetEnvVariableNames } from "@utils/email/mailjet/sendEmailsViaMailjet"
import type {
  MailjetAddressInfo,
  MailjetEmailProps,
  MailjetSingleMessageResult,
} from "@utils/email/mailjet/sendEmailsViaMailjetApi"
import { sendEmailViaMailjet } from "@utils/email/mailjet/sendEmailViaMailjet"
import type { Result } from "@utils/result/Result"

export async function sendEmailViaMailjet2(
  subject: string,
  html: string,
  text: string,
  to: MailjetAddressInfo,
  envVariableNames: MailjetEnvVariableNames,
  SandboxMode: boolean = false,
): Promise<Result<MailjetSingleMessageResult>> {
  const props: MailjetEmailProps = {
    Subject: subject,
    HTMLPart: html,
    TextPart: text,
    To: [to],
  }
  return sendEmailViaMailjet(props, envVariableNames, SandboxMode)
}
