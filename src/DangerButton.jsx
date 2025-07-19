import { BaseButton } from './BaseButton'

export function DangerButton({ children, disabled, onClick, size = 'normal' }) {
  return (
    <BaseButton
      variant="danger"
      disabled={disabled}
      onClick={onClick}
      size={size}
    >
      {children}
    </BaseButton>
  )
}
