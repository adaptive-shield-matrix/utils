import { jsonStringifyPretty } from "~utils/json/jsonStringifyPretty"
import { type PromiseResult, createError, createResult } from "~utils/result/Result"

export const zeptosBaseApiUrl = "https://api.zeptomail.com/v1.1/email"

export type ZeptomailAddress = {
  name: string
  address: string
}

export type ZeptomailProps = {
  to: Array<ZeptomailAddress>
  from: ZeptomailAddress
  cc?: ZeptomailAddress
  bcc?: ZeptomailAddress
  subject: string
  htmlBody: string
  attachment?: Array<ZeptomailAttachment>
}

export type ZeptomailAttachment = {
  // Content of attachment. Base64 encoded value of a file.
  content: string
  // Indicates attachment content type. Example: text/plain, image/jpg.
  mime_type: String
  // File name of the attachment.
  name: String
}

export async function sendEmailsViaZeptomailApi(props: ZeptomailProps, apiKey: string): PromiseResult<null> {
  const op = "sendTransactionalEmail"

  if (!props.subject) {
    return createError(op, "Missing required 'subject' field", jsonStringifyPretty(props))
  }
  if (props.to.length === 0) {
    return createError(op, "Missing required 'to' recipients", jsonStringifyPretty(props))
  }

  const bodyString = JSON.stringify(props)

  const fetched = await fetch(zeptosBaseApiUrl, {
    body: bodyString,
    headers: {
      Accept: "application/json",
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    method: "POST",
  })
  const fetchText = await fetched.text()
  console.log({ op, text: fetchText })
  if (fetched.ok) {
    return createResult(null)
  }
  return createError(op, "failed sending email via zeptomail api")
}
