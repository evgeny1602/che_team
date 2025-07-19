import { BaseButton } from './BaseButton'

export function PrimaryButton({
  children,
  onClick,
  disabled,
  isLoading = false,
  size = 'normal',
}) {
  return (
    <BaseButton
      variant="primary"
      disabled={disabled}
      onClick={onClick}
      isLoading={isLoading}
      size={size}
    >
      {children}
    </BaseButton>
  )
}
