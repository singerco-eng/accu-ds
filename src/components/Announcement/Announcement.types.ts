export interface AnnouncementProps {
  variant: 'info' | 'success' | 'warning' | 'error'
  title: string
  message?: string
  primaryAction?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  onDismiss?: () => void
  className?: string
}
