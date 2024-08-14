import { Word } from '@/lib/hooks/useSavedWords'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import { useUiOptions } from '@/lib/hooks/useUiOptions'

export default function WordCard({
  word: { text, transcription, translation },
  isLearned,
  onLearnedChange,
  onWordRemoved,
}: {
  word: Word
  isLearned
  onLearnedChange
  onWordRemoved
}) {
  const { showWordsTranslation } = useUiOptions()

  const shouldShowWordsTranslation = showWordsTranslation || !isLearned

  return (
    <div className="p-6 group flex flex-col text-center rounded-lg border p-3 text-sm transition-all sm:hover:bg-accent relative ">
      <TrashIcon
        onClick={(event) => {
          onWordRemoved()
        }}
        className="opacity-0 [&:not(:hover)]:group-hover:opacity-70 hover:opacity-100 cursor-pointer absolute right-5 top-5 max-sm:opacity-100"
      />
      <h5 className="text-xl leading-tight font-medium">{text}</h5>
      <span className="text-gray-500 text-sm ">{transcription}</span>
      {shouldShowWordsTranslation ? (
        <>
          <p className="text-gray-300 text-base mb-4 pt-3">{translation}</p>
        </>
      ) : null}

      <div className="flex grow align-end justify-center">
        <Button
          onClick={(event) => {
            onLearnedChange()
          }}
          className="opacity-0 group-hover:opacity-100 max-sm:opacity-100 "
          variant="ghost"
        >
          {isLearned ? 'Не изучено' : 'Изучено'}
        </Button>
      </div>
    </div>
  )
}
