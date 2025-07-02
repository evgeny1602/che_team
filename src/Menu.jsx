import { MenuBtn } from './MenuBtn'
import { tgColorClasses, tgTheme } from './tgUtils'

export function Menu({ selectedPageCode, onPageCodeSelect, pageCodes }) {
  const bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'

  return (
    <div
      className={`fixed bottom-0 left-[50%] mb-4 flex h-[50px] px-8 -translate-x-[50%] flex-row flex-nowrap items-center justify-center gap-6 rounded-4xl ${bgClass} backdrop-blur-sm`}
    >
      {pageCodes.map((pageCode) => (
        <MenuBtn
          icon={pageCode}
          isSelected={selectedPageCode === pageCode}
          onClick={() => onPageCodeSelect(pageCode)}
          key={pageCode}
        />
      ))}
    </div>
  )
}
