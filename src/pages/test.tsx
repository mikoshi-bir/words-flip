import { Header } from '@/components/fragments/header'
import { Word, useSavedWords } from '@/lib/hooks/useSavedWords'
import { useMemo, useState } from 'react'
import { shuffleArray } from '@/lib/shuffle'
import WordCardQuestion from '@/components/ui/wordCardQuestion'
import WordCard from '@/components/ui/wordCard'
import { WordCardAnswer } from '@/components/ui/wordCardAnswer'
import { WordCardLayout } from '@/components/ui/wordCardLayout'
import { Button } from '@/components/ui/button'
import { TestSettings } from '@/components/fragments/testSettings'
import { useUiOptions } from '@/lib/hooks/useUiOptions'

type IncorrectWord = { incorrectAnswerSelected: string; word: Word }

export default function TestPage() {
  const { getLearnedWords, isInitialized, changeLearnedState, savedWords } =
    useSavedWords()

  const [trainingCounter, setTrainingCounter] = useState(0)

  const wordsForTest = useMemo(
    () => shuffleArray(getLearnedWords()),
    [isInitialized, trainingCounter]
  )

  const [currentlyTestedWord, setCurrentlyTestedWord] = useState(0)
  const currentWord = wordsForTest[currentlyTestedWord]
  const [incorrectWords, setIncorrectWords] = useState<IncorrectWord[]>([])
  const { unlearnIncorrectWords } = useUiOptions()
  /**
   * Нам нужно 3 варианта ответа.
   * Один из них должен быть правильный
   * Мы снова шафлим wordsForTest и берем оттуда первые два элемента
   * В них мы добавляем правильный ответ и снова шафлим
   */
  const variants = useMemo(() => {
    if (!currentWord) {
      return []
    }
    const words = [
      ...shuffleArray(wordsForTest.filter((d) => d.text !== currentWord.text))
        .slice(0, 2)
        .map((word) => word.translation),
      currentWord.translation,
    ]
    return shuffleArray(words)
  }, [currentWord, wordsForTest])

  const onVariantChoose = (variant: string) => {
    const isTranslationCorrect = variant === currentWord.translation
    if (!isTranslationCorrect) {
      if (unlearnIncorrectWords) {
        changeLearnedState(currentWord, false)
      }

      setIncorrectWords((prevValue) => [
        ...prevValue,
        {
          incorrectAnswerSelected: variant,
          word: currentWord,
        },
      ])
    }
    setCurrentlyTestedWord((prevValue) => prevValue + 1)
  }

  const resetTest = () => {
    setTrainingCounter((prevValue) => prevValue + 1)
    setCurrentlyTestedWord(0)
    setIncorrectWords([])
  }

  if (wordsForTest.length === 0) {
    return <div>Нет изученных слов для тестирования</div>
  }

  const testResult = wordsForTest.map((word) => {
    const incorrectWord = incorrectWords.find((w) => w.word.text === word.text)

    return incorrectWord || { word, incorrectAnswerSelected: null }
  })

  if (!currentWord) {
    return (
      <div>
        <h3>Вы прошли тест</h3>
        <div>Всего слов в тесте: {wordsForTest.length}</div>
        <div>
          Правильных ответов: {wordsForTest.length - incorrectWords.length}
        </div>
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-3">
            Ваши ответы
          </h4>
          <WordCardLayout>
            {testResult.map((answer) => (
              <WordCardAnswer
                key={answer.word.text}
                selected={answer.incorrectAnswerSelected}
                word={answer.word}
              />
            ))}
          </WordCardLayout>
        </div>
        <Button onClick={resetTest} className="mt-4">
          Повторить тест
        </Button>
      </div>
    )
  }

  return (
    <div>
      <WordCardQuestion
        word={currentWord}
        variants={variants}
        onVariantChoose={onVariantChoose}
        progress={currentlyTestedWord / wordsForTest.length}
      />
      <TestSettings />
    </div>
  )
}
