import { type ReactNode } from 'react'

export interface TagProps {
  variant?: 'blue' | 'darkBlue' | 'gray'
  weight?: 'light' | 'regular'
  removable?: boolean
  onRemove?: () => void
  children: ReactNode
  className?: string
}
