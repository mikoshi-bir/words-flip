import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY || '',
})

async function streamToString(stream) {
  let content = ''
  for await (const chunk of stream) {
    if (chunk.choices[0].delta.content) {
      content += chunk.choices[0].delta.content
    }
  }

  return content
}

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export default async function handler(req: Request, res: Response) {
  const { subject, wordCount = 10 } = await req.json()

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'openai/o4-mini',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `Я делаю хобби-приложение, которое позволяет изучать слова английского языка с помощью карточек. Твоя задача - сгенерировать слова на тематику которую написал пользователь. Я тебе предоставлю несколько параметров которые написал пользователь, а тебе нужно написать слова в паре английский-русский.
      Тебе нужно вернуть ТОЛЬКО слова в виде массива JSON который я предоставлю ниже. Ничего больше возвращать не нужно. Если генерацию невозможно выполнить, ты можешь вернуть ответ формата { "error": "<описание ошибки" }. Тебе нужно вернуть то количество слов которое попросил пользователь. Если запрос невозможно удовлетворить полностью, верни слова на смежные темы/ более простые слова или меньшее количество слов. Старайся генерировать слова на любые темы которые указал пользователь.

      export type Word = [word, translation]

      ВЕРНИ ТОЛЬКО JSON, не возвращай markdown. этот ответ должен быть валидным JSON
      [
        ["computer", "компьютер"]
        ["hardware", "железо"]
      ]
      `,
      },
      {
        role: 'user',
        content: `Параметры генерации которые предоставил пользователь:
        Тема слов: ${subject}
        Количество слов: ${wordCount}`,
      },
    ],
  })

  return new Response(await streamToString(response))
}
