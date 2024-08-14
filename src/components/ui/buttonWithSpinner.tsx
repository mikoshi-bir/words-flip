import * as React from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

export function ButtonWithSpinner({
  loading,
  ...props
}: { loading: boolean } & React.ComponentProps<typeof Button>) {
  return (
    <Button disabled={loading} {...props}>
      {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
      Начать изучать слова
    </Button>
  )
}
