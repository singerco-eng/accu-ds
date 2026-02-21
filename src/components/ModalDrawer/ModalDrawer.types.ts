import { type ReactNode } from 'react'

export interface ModalDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  footer?: ReactNode
  className?: string
}
