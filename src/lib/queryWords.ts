export async function queryWords(
  subjectQuery: string,
  wordCount: number = 10
): Promise<any> {
  const resp = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      subject: subjectQuery,
      wordCount,
    }),
  })
  const json = await resp.json()

  if (json.error) {
    throw new Error(json.error)
  }

  return json.map(([text, translation]) => ({ text, translation }))
}
