import { type ReactNode } from 'react'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'lg' | 'xl' | 'fullscreen'
  footer?: ReactNode
  children: ReactNode
  className?: string
}
