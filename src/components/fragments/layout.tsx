import { Header } from '@/components/fragments/header'

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main className={`min-h-screen p-24 pt-14 max-sm:p-5`}>{children}</main>
    </>
  )
}
