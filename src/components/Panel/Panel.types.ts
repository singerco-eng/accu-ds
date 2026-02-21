import { type ReactNode } from 'react'

export interface PanelProps {
  title: string
  defaultOpen?: boolean
  disabled?: boolean
  children: ReactNode
  className?: string
}
