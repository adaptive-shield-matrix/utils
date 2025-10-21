import { readEnvVariableResult } from "~utils/env/readEnvVariable"
import { jsonStringifyPretty } from "~utils/json/jsonStringifyPretty"
import { sendEmailViaMailjet, type MailjetEmailProps, type MailjetEnvVariableNames } from "./sendEmailViaMailjet"

async function main() {
  const envVariableNames = {
    apiKeyPublic: "MAILJET_APIKEY_PUBLIC",
    apiKeyPrivate: "MAILJET_APIKEY_PRIVATE",
    senderAddress: "MAILJET_SENDER_ADDRESS",
    senderName: "MAILJET_SENDER_NAME",
  } as const satisfies MailjetEnvVariableNames

  const toAddressResult = readEnvVariableResult("AUTH_RESEND_E2E_TEST_TO")
  if (!toAddressResult.success) {
    console.error(toAddressResult)
    return
  }
  const toAddress = toAddressResult.data
  const data: MailjetEmailProps = {
    To: [
      {
        Email: toAddress,
        Name: "Test Recipient",
      },
    ],
    Subject: "Test Email",
    TextPart: "This is a test email",
    HTMLPart: "<p>This is a test email</p>",
  }
  const sandboxMode = true

  const result = await sendEmailViaMailjet(data, envVariableNames, sandboxMode)
  console.log("result:", result, jsonStringifyPretty(result))
}

main()
