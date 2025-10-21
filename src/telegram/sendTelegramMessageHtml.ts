import {
  sendTelegramMessageHtmlApi,
  type TelegramMessageSendingProps,
} from "@utils/telegram/sendTelegramMessageHtmlApi"
import { readEnvVariableResult } from "~utils/env/readEnvVariable"
import { type PromiseResult } from "~utils/result/Result"

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

  const data: TelegramMessageSendingProps = {
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
