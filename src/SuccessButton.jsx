import { BaseButton } from './BaseButton'

export function SuccessButton({
  children,
  disabled,
  onClick,
  size = 'normal',
}) {
  return (
    <BaseButton
      variant="success"
      disabled={disabled}
      onClick={onClick}
      size={size}
    >
      {children}
    </BaseButton>
  )
}
