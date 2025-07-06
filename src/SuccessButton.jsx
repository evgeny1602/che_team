import { BaseButton } from './BaseButton'

export function SuccessButton({ children, disabled, onClick }) {
  return (
    <BaseButton
      variant="success"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}
