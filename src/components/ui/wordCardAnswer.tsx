import { Button } from '@/components/ui/button'
import { Word } from '@/lib/hooks/useSavedWords'
import { WordCardAnswerVariant } from './wordCardAnswerVariant'

export type WordCardProps = {
  word: Word
  selected?: string
}

export function WordCardAnswer({ word, selected }: WordCardProps) {
  return (
    <div className="p-6 group flex flex-col rounded-lg border p-3 text-sm transition-all relative">
      <h5 className="text-xl leading-tight font-medium mb-4">{word.text}</h5>

      {selected ? (
        <WordCardAnswerVariant variant="incorrect">
          {selected}
        </WordCardAnswerVariant>
      ) : null}

      <WordCardAnswerVariant variant="correct">
        {word.translation}
      </WordCardAnswerVariant>
    </div>
  )
}
