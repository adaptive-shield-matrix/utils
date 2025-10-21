import { nowIso } from "~utils/date/nowIso"
import { readEnvVariableResult } from "~utils/env/readEnvVariable"
import { jsonStringifyPretty } from "~utils/json/jsonStringifyPretty"
import { sendEmailViaResend, type ResendEnvVariableNames } from "./sendEmailViaResend"

sendTest()

async function sendTest() {
  const envVariableNames = {
    apiKey: "RESEND_API_KEY",
    senderAddress: "RESEND_SENDER_ADDRESS",
    senderName: "RESEND_SENDER_NAME",
  } as const satisfies ResendEnvVariableNames

  const toAddressResult = readEnvVariableResult("AUTH_RESEND_E2E_TEST_TO")
  if (!toAddressResult.success) {
    console.error(toAddressResult)
    return
  }
  const toAddress = toAddressResult.data
  const got = await sendEmailViaResend(
    {
      to: [{ name: "", email: toAddress }],
      subject: "test email " + nowIso(),
      html: "<strong>it works</strong>",
    },
    envVariableNames,
  )
  console.log(jsonStringifyPretty(got))
}
