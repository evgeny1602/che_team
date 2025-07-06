import { useState } from 'react'

import { tgTheme } from './tgUtils'

export function FormContainer({ children, title }) {
  const [isMinimized, setIsMinimized] = useState(true)

  const heightClass = isMinimized ? 'h-[60px]' : 'h-auto'
  const bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'

  return (
    <div
      className={`${heightClass} p-2 overflow-hidden w-full flex flex-col flex-nowrap justify-start items-start rounded-4xl gap-4 ${bgClass} transition-all duration-300`}
    >
      <h2
        className={`${bgClass} flex flex-row flex-nowrap justify-center items-center gap-2 rounded-4xl py-2 px-4 w-full text-lg cursor-pointer hover:opacity-60 transition-opacity duration-30`}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {title}
      </h2>

      {children}
    </div>
  )
}
