import { BaseButton } from './BaseButton'

export function DefaultButton({ children, disabled, onClick }) {
  return (
    <BaseButton
      variant="default"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  )
}
