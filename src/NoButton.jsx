import { BaseButton } from './BaseButton'

export function NoButton({ children, disabled, onClick }) {
  return (
    <BaseButton
      variant="no"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}
