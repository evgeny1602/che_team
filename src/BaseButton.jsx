import { LoadSpinner } from './LoadSpinner'
import { tgTheme } from './tgUtils'

export function BaseButton({
  variant = 'primary',
  children,
  disabled,
  onClick,
  isLoading = false,
  size = 'normal',
}) {
  let bgClass = {
    default: 'bg-linear-to-bl from-sky-700 to-cyan-500',
    danger: 'bg-linear-to-bl from-red-700 to-red-500',
    primary: 'bg-linear-to-bl from-[#df530e] to-[#f58f5c]',
    success: 'bg-linear-to-bl from-green-600 to-emerald-400',
    no: 'bg-linear-to-bl from-blue-600 to-violet-400',
  }[variant]

  let colorClass = 'text-white'

  if (disabled) {
    bgClass = tgTheme == 'light' ? 'bg-black/5' : 'bg-white/5'
    colorClass = tgTheme == 'light' ? 'text-black/40' : 'text-white/40'
  }

  const sizeClass = {
    normal: 'p-4 w-full text-sm',
    small: 'py-2 px-4 text-sm',
    large: 'p-6 w-full text-sm',
  }[size]

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex flex-row flex-nowrap justify-center items-center gap-2 transition-opacity rounded-4xl ${bgClass} ${colorClass} ${sizeClass}  cursor-pointer hover:opacity-60 transition-opacity duration-300`}
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
