import { Button } from '@/components/ui/button'

export type WordCardProps = {
  word: { text: string }
  variants: string[]
  onVariantChoose: (variant: string) => void
  // progress is percentage from 0 to 1
  progress: number
}

export default function WordCardQuestion({
  word: { text },
  variants,
  onVariantChoose,
  progress,
}: WordCardProps) {
  return (
    <div className="p-6 group flex flex-col text-center rounded-lg border p-3 text-sm transition-all relative">
      <h5 className="text-xl leading-tight font-medium mb-4">{text}</h5>

      <div className="flex flex-col gap-5 grow align-end justify-center">
        {variants.map((variant, index) => (
          <Button
            key={index}
            onClick={() => onVariantChoose(variant)}
            variant="secondary"
          >
            {variant}
          </Button>
        ))}
      </div>

      <div className="absolute top-0 left-0 right-0 h-2">
        <div
          className="bg-indigo-500 h-2 transition-[width] ease-linear duration-200"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
