import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'

export type WordCardState = {
  variant: 'correct' | 'incorrect'
  children: ReactNode
}

export function WordCardAnswerVariant(props: WordCardState) {
  const sharedClassnames = 'border-2 flex gap-2 p-2 [&+&]:mt-2 rounded-md'

  if (props.variant === 'correct') {
    return (
      <div
        className={`${sharedClassnames} border-green-800 text-green-200 bg-green-900/20`}
      >
        <CheckCircledIcon className="text-green-200" height={20} width={20} />
        {props.children}
      </div>
    )
  } else {
    return (
      <div
        className={`${sharedClassnames} border-red-800 text-red-200  bg-red-900/20`}
      >
        <CrossCircledIcon className="text-red-200" height={20} width={20} />
        {props.children}
      </div>
    )
  }
}
