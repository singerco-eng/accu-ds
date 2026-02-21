import { type ReactNode } from 'react'

export interface TooltipProps {
  content: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  children: ReactNode
  className?: string
}
