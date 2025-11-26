import * as a from "valibot"
import { type PromiseResult, createError, createResult } from "~utils/result/Result"
import { intOrStringSchema } from "~utils/valibot/intOrStringSchema"

export type TelegramMessageParseMode = keyof typeof telegramMessageParseMode

export const telegramMessageParseMode = {
  markdown: "MarkdownV2",
  html: "HTML",
} as const

/**
 * https://core.telegram.org/bots/api#sendmessage
 * errors - https://core.telegram.org/method/messages.sendMessage#possible-errors
 */
export type TelegramMessageProps = {
  chat_id: string | number
  message_thread_id?: string | number
  text: string
  parse_mode: "MarkdownV2" | "HTML"
  link_preview_options?: TelegramLinkPreviewOptions
  disable_notification?: boolean
}

/**
 * https://core.telegram.org/bots/api#linkpreviewoptions
 */
export type TelegramLinkPreviewOptions = {
  is_disabled?: boolean
  url?: string
  prefer_small_media?: boolean
  prefer_large_media?: boolean
  show_above_text?: boolean
}
export async function sendTelegramMessageApi(props: TelegramMessageProps, apiKey: string): PromiseResult<null> {
  const op = "sendTelegramMessage"
  if (!apiKey) return createError(op, "missing apiKey")

  if (props.text.length <= 0) {
    return createError(op, "text length = 0")
  }

  if (props.text.length > 4096) {
    return createError(op, "text length to long: " + props.text.length + " > " + 4096)
  }

  // console.log(cleanedText)
  // console.log("sending")
  // console.log(filled)
  const url = `https://api.telegram.org/bot${apiKey}/sendMessage`
  const body = JSON.stringify(props)
  // console.log(url, body)
  const fetched = await fetch(url, {
    body: body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  })
  const fetchText = await fetched.text()
  // console.log("api call", fetched.status, fetchText)
  if (fetched.ok) {
    return createResult(null)
  }
  const parsing = a.safeParse(errSchemaFromString, fetchText)
  if (!parsing.success) {
    return createError(op, a.summarize(parsing.issues), fetchText)
  }
  return createError(op, parsing.output.description)
}

// const successSchema = v.object({
//   ok: v.boolean(),
//   // result
//   // chat
//   date: intOrStringSchema,
//   text: v.string(),
//   // entities
// })

const errSchema = a.object({
  ok: a.boolean(),
  error_code: intOrStringSchema,
  description: a.string(),
})
export const errSchemaFromString = a.pipe(a.string(), a.parseJson(), errSchema)
