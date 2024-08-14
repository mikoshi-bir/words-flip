import { useUiOptions } from '@/lib/hooks/useUiOptions'
import { Checkbox } from '../ui/checkbox'

export function TestSettings() {
  const { unlearnIncorrectWords, updateOptions } = useUiOptions()

  const toggleIncorrectWords = () => {
    updateOptions({
      unlearnIncorrectWords: !unlearnIncorrectWords,
    })
  }

  return (
    <div className="flex items-center space-x-2 mt-5">
      <Checkbox
        id="unlearnIncorrectWords"
        onCheckedChange={toggleIncorrectWords}
        checked={unlearnIncorrectWords}
      />
      <label
        htmlFor="unlearnIncorrectWords"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Переносить слова с неправильными ответами в неизученные
      </label>
    </div>
  )
}
