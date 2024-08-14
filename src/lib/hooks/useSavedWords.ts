import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export type Word = {
  text: string
  translation: string
  transcription: string
}

export function useSavedWords() {
  const [savedWords, setSavedWords] = useLocalStorage<Word[]>(
    'saved-words',
    [],
    { initializeWithValue: false }
  )

  const [learnedWords, setLearnedWords] = useLocalStorage<string[]>(
    'learned-words',
    [],
    { initializeWithValue: false }
  )

  return {
    savedWords,
    setSavedWords,

    isInitialized: savedWords.length > 0,

    getLearnedWords() {
      return savedWords.filter((word) => learnedWords.includes(word.text))
    },

    getUnlearnedWords() {
      return savedWords.filter((word) => !learnedWords.includes(word.text))
    },

    changeLearnedState(word: Word, learned: boolean) {
      if (learned) {
        setLearnedWords((w) => [...w, word.text])
      } else {
        setLearnedWords((words) => words.filter((w) => w !== word.text))
      }
    },
    removeWord(word: Word) {
      setSavedWords((words) => words.filter((w) => w.text !== word.text))
    },

    unlearnAllWords() {
      setLearnedWords([])
    },
  }
}
