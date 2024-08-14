import { Inter } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { FormEvent, useState } from 'react'
import { useSavedWords } from '@/lib/hooks/useSavedWords'
import { queryWords } from '@/lib/queryWords'
import { ButtonWithSpinner } from '@/components/ui/buttonWithSpinner'
import { useRouter } from 'next/router'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Home() {
  const [subject, setSubject] = useState('')
  const [wordCount, setWordCount] = useState('10')
  const { setSavedWords, savedWords } = useSavedWords()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    queryWords(subject, Number(wordCount))
      .then((result) => {
        setSavedWords(result)
        router.push('/learn')
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form
      onSubmit={onFormSubmit}
      className="flex-col flex gap-5 max-w-screen-md "
    >
      <Label htmlFor="message-2">
        Укажите тематику слов, которые хотите изучать
      </Label>
      <Textarea
        name="subject"
        onChange={(event) => setSubject(event.target.value)}
        value={subject}
        placeholder="Прямо в этом окне"
        id="message-2"
        required
      />
      <p className="text-sm text-muted-foreground">
        Так мы сможем подобрать вам слова, которые вы хотите изучить
      </p>
      <Label htmlFor="word-count">Количество слов</Label>
      <Select onValueChange={(value) => setWordCount(value)} value={wordCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Количество слов" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Количество</SelectLabel>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ButtonWithSpinner loading={loading} />
      {error ? (
        <div className="text-sm text-muted-foreground text-red-600">
          Возникла ошибка: {error}
        </div>
      ) : null}
      <p className="text-sm text-muted-foreground">
        Генерация слов займет какое-то время в зависимости от кол-ва слов
      </p>
    </form>
  )
}
