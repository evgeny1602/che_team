import { tgColorClasses } from './tgUtils'

export function ContentInnerContainer({ children }) {
  return (
    <div
      className={`w-full flex flex-col flex-nowrap justify-center items-center grow ${tgColorClasses.txt} p-2`}
    >
      {children}
    </div>
  )
}
