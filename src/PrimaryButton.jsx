import { BaseButton } from './BaseButton'

export function PrimaryButton({
  children,
  onClick,
  disabled,
  isLoading = false,
}) {
  return (
    <BaseButton
      variant="primary"
      disabled={disabled}
      onClick={onClick}
      isLoading={isLoading}
    >
      {children}
    </BaseButton>
  )
}
