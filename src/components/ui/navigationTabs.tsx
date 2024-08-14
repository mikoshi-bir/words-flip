import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

export type TabsProps = {
  tabs: {
    label: string
    to: string
  }[]
  className?: string
  layoutId: string
}
// https://github.com/triggerdotdev/trigger.dev/blob/main/apps/webapp/app/components/primitives/Tabs.tsx#L14
export function NavigationTabs({ tabs, className, layoutId }: TabsProps) {
  const router = useRouter()

  return (
    <div
      className={cn(
        'flex flex-row gap-x-6 border-b border-grid-bright',
        className
      )}
    >
      {tabs.map((tab, index) => {
        const isActive = router.pathname === tab.to

        return (
          <Link key={index} href={tab.to} passHref legacyBehavior>
            <a className="group flex flex-col items-center pt-1">
              <span
                className={cn(
                  'text-sm transition duration-200',
                  isActive ? 'text-indigo-500' : 'text-charcoal-200'
                )}
              >
                {tab.label}
              </span>
              {isActive ? (
                <motion.div
                  layoutId={layoutId}
                  className="mt-1 h-0.5 w-full bg-indigo-500"
                />
              ) : (
                <div className="mt-1 h-0.5 w-full bg-charcoal-500 opacity-0 transition duration-200 group-hover:opacity-100" />
              )}
            </a>
          </Link>
        )
      })}
    </div>
  )
}
