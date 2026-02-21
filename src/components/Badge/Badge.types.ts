import { type ReactNode } from 'react'

export interface BadgeProps {
  variant?: 'gray' | 'grayBlue' | 'warning' | 'danger'
  children: ReactNode
  className?: string
}
