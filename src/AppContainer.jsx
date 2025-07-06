import { tgColorClasses } from './tgUtils'

export function AppContainer({ children }) {
  return (
    <div
      className={`app-container w-full h-[100vh] p-4 relative ${tgColorClasses.txt}`}
    >
      {children}
    </div>
  )
}
