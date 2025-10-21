import type { PromiseResult } from "~utils/result/Result"
import { sendTelegramMessageApi, telegramMessageParseMode } from "~utils/telegram/sendTelegramMessageApi"

export type TelegramMessageSendingProps = {
  chatId: string | number
  topicId?: string | number
  text: string
  disableNotification?: boolean
}

export async function sendTelegramMessageHtmlApi(p: TelegramMessageSendingProps, apiKey: string): PromiseResult<null> {
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
