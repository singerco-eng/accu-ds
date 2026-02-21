export interface ToastProps {
  variant: 'confirmation' | 'warning' | 'error'
  message: string
  duration?: number
  onClose?: () => void
  className?: string
}
