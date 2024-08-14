import WordCard from '@/components/ui/wordCard'
import { useSavedWords } from '@/lib/hooks/useSavedWords'
import { Button } from '@/components/ui/button'
import { useUiOptions } from '@/lib/hooks/useUiOptions'
import Link from 'next/link'
import { WordCardLayout } from '@/components/ui/wordCardLayout'

export default function LearnPage() {
  const {
    savedWords,
    getLearnedWords,
    getUnlearnedWords,
    changeLearnedState,
    removeWord,
    unlearnAllWords,
  } = useSavedWords()

  const { toggleWordsTranslation, showWordsTranslation } = useUiOptions()

  return (
    <div className="flex flex-col gap-5">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight ">
        Слова для изучения
      </h2>
      <WordCardLayout>
        {getUnlearnedWords().map((word) => {
          return (
            <WordCard
              key={word.text}
              word={word}
              isLearned={false}
              onWordRemoved={() => removeWord(word)}
              onLearnedChange={() => changeLearnedState(word, true)}
            />
          )
        })}
      </WordCardLayout>
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Изученные слова
      </h2>
      <div className="flex flex-col sm:gap-3 sm:flex-row gap-2">
        <Button onClick={toggleWordsTranslation} variant="secondary">
          {showWordsTranslation
            ? 'Скрыть перевод слов'
            : 'Показать перевод слов'}
        </Button>
        <Button onClick={unlearnAllWords} variant="secondary">
          Пометить все слова как неизученные
        </Button>
      </div>
      <WordCardLayout>
        {getLearnedWords().map((word) => {
          return (
            <WordCard
              key={word.text}
              word={word}
              isLearned={true}
              onWordRemoved={() => removeWord(word)}
              onLearnedChange={() => changeLearnedState(word, false)}
            />
          )
        })}
      </WordCardLayout>
      <div className="flex justify-center">
        <Button asChild className="my-5 w-full max-w-52" variant="secondary">
          <Link href="/">Сделать новый запрос</Link>
        </Button>
      </div>
    </div>
  )
}
