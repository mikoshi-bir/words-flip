import { NavigationTabs } from '@/components/ui/navigationTabs'

const tabsList = [
  {
    label: 'Главная',
    to: '/',
  },
  {
    label: 'Обучение',
    to: '/learn',
  },
  {
    label: 'Тест',
    to: '/test',
  },
]
export const Header = () => {
  return (
    <div className="max-w-screen-md flex p-24 py-0 pt-8 max-sm:p-5">
      <NavigationTabs
        layoutId="header-navigation"
        tabs={tabsList}
        className="w-full"
      />
    </div>
  )
}
