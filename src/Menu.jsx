import { MenuBtn } from './MenuBtn'
import { tgColorClasses, tgTheme } from './tgUtils'

export function Menu({ selectedPageCode, onPageCodeSelect, pageCodes }) {
  const bgClass = tgTheme == 'light' ? 'bg-white/70' : 'bg-black/70'

  return (
    <div
      className={`fixed shadow-[0px_0px_2px_#00000064]  bottom-0 left-[50%] mb-4 flex h-[52px] px-8 -translate-x-[50%] flex-row flex-nowrap items-center justify-center gap-6 rounded-4xl ${bgClass} backdrop-blur-sm`}
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
