export function SuccessButton({ children, disabled, onClick }) {
  const opacityClass = disabled ? 'opacity-50' : ''

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`transition-opacity duration-200 rounded-4xl bg-green-600 text-white px-4 py-2 text-xs ${opacityClass}`}
    >
      {children}
    </button>
  )
}
