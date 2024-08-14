import { useEffect, useState } from 'react'

export function useIncreasingCounter(
  initialValue: number,
  isRunning,
  interval = 1000,
  quantity = 1
) {
  const [counter, setCounter] = useState(initialValue)

  useEffect(() => {
    if (!isRunning) {
      return
    }
    const intervalId = setInterval(() => {
      setCounter((value) => value + quantity)
    }, interval)
    return () => {
      clearInterval(intervalId)
    }
  }, [isRunning, interval, quantity])
  return counter
}
