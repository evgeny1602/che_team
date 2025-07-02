import { LoadSpinner } from './LoadSpinner'
import { tgColorClasses } from './tgUtils'

export function AuthLoader() {
  return (
    <div
      className={`w-full h-[100vh] flex flex-col gap-4 flex-nowrap justify-start pt-40 items-center text-lg font-light`}
    >
      <LoadSpinner />
      <span className={`opacity-50 ${tgColorClasses.txt}`}>Авторизация...</span>
    </div>
  )
}
