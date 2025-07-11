import { BaseButton } from './BaseButton'

export function DangerButton({ children, disabled, onClick }) {
  return (
    <BaseButton
      variant="danger"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}
