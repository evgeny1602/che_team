import { LoadSpinner } from './LoadSpinner'
import { tgColorClasses } from './tgUtils'

export function AuthLoader() {
  return (
    <div className="auth-loader h-full flex flex-col flex-nowrap justify-center items-center">
      <LoadSpinner />
      <span className={`text-lg font-light opacity-50 ${tgColorClasses.txt}`}>
        Авторизация...
      </span>
    </div>
  )
}
