import { type ReactNode } from 'react'

export interface ContextMenuItem {
  label: string
  onClick: () => void
  icon?: ReactNode
  dividerAfter?: boolean
  disabled?: boolean
}

export interface ContextMenuProps {
  items: ContextMenuItem[]
  className?: string
}
