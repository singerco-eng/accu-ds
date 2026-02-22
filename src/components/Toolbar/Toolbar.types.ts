import { type ReactNode } from 'react'

export interface ToolbarNavItem {
  key: string
  label: string
  icon?: ReactNode
  variant?: 'default' | 'accent'
}

export interface ToolbarNotifications {
  releaseNotes?: boolean
  tasks?: number
  calendar?: number
  notifications?: number
  atMe?: number
}

export interface ToolbarProps {
  logo?: ReactNode
  companyName: string
  officeName?: string
  onLocationClick?: () => void
  userName: string
  onUserClick?: () => void
  onSettingsClick?: () => void
  navItems: ToolbarNavItem[]
  activeNavItem?: string
  onNavItemClick?: (key: string) => void
  notifications?: ToolbarNotifications
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  onHelpClick?: () => void
  onReleaseNotesClick?: () => void
  className?: string
}
