import { LoadSpinner } from './LoadSpinner'
import { tgTheme } from './tgUtils'

export function BaseButton({
  variant = 'primary',
  children,
  disabled,
  onClick,
  isLoading = false,
}) {
  let bgClass = {
    danger: 'bg-red-700',
    primary: 'bg-[#df530e]',
    success: 'bg-green-600',
    no: 'bg-blue-600',
  }[variant]

  let colorClass = 'text-white'

  if (disabled) {
    bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'
    colorClass = tgTheme == 'light' ? 'text-black/40' : 'text-white/40'
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex flex-row flex-nowrap justify-center items-center gap-2 transition-opacity rounded-4xl ${bgClass} ${colorClass} p-4 text-sm cursor-pointer hover:opacity-60 transition-opacity duration-300`}
    >
      {!isLoading && children}

      {isLoading && (
        <LoadSpinner
          size="small"
          theme="dark"
        />
      )}
    </button>
  )
}
