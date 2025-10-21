import { readEnvVariableResult } from "@utils/env/readEnvVariable"
import * as v from "valibot"
import { createError, createResult, type PromiseResult } from "~utils/result/Result"
import { intOrStringSchema } from "~utils/valibot/intOrStringSchema"

export const telegramBaseApiUrl = "https://api.telegram.org"

export type TelegramMessageParseMode = keyof typeof telegramMessageParseMode

export const telegramMessageParseMode = {
  markdown: "MarkdownV2",
  html: "HTML",
} as const

export type TelegramMessagePropsMd = {
  chatId: string | number
  text: string
}

export type TelegramMessageType = {
  chatId: string | number
  topicId?: string | number
  text: string
  disableNotification?: boolean
}

export type TelegramEnvVariableNames = {
  apiToken: string
  chatId: string
  topicId?: string
}

/**
 * https://core.telegram.org/bots/api#html-style
 */
export async function sendTelegramMessageHtml(
  text: string,
  envVariableNames: TelegramEnvVariableNames,
  disableNotification?: boolean,
): PromiseResult<null> {
  const tokenResult = readEnvVariableResult(envVariableNames.apiToken)
  if (!tokenResult.success) return tokenResult
  const token = tokenResult.data

  const chatIdResult = readEnvVariableResult(envVariableNames.chatId)
  if (!chatIdResult.success) return chatIdResult
  const chatId = chatIdResult.data

  const data: TelegramMessageType = {
    chatId,
    text: text,
  }
  // topicId
  if (envVariableNames.topicId) {
    const topicIdResult = readEnvVariableResult(envVariableNames.chatId)
    if (!topicIdResult.success) return topicIdResult
    data.topicId = topicIdResult.data
  }
  if (disableNotification !== undefined) {
    data.disableNotification = disableNotification
  }

  return sendTelegramMessageHtmlApi(data, token)
}
export async function sendTelegramMessageHtmlApi(p: TelegramMessageType, apiKey: string): PromiseResult<null> {
  return sendTelegramMessageApi(
    {
      chat_id: p.chatId,
      message_thread_id: p.topicId,
      text: p.text,
      parse_mode: telegramMessageParseMode.html,
      disable_notification: p.disableNotification,
    },
    apiKey,
  )
}

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
  const parsing = v.safeParse(errSchemaString, fetchText)
  if (!parsing.success) {
    return createError(op, v.summarize(parsing.issues), fetchText)
  }
  return createError(op, parsing.output.description)
}

const successSchema = v.object({
  ok: v.boolean(),
  // result
  // chat
  date: intOrStringSchema,
  text: v.string(),
  // entities
})

const errSchema = v.object({
  ok: v.boolean(),
  error_code: intOrStringSchema,
  description: v.string(),
})
const errSchemaString = v.pipe(v.string(), v.parseJson(), errSchema)
