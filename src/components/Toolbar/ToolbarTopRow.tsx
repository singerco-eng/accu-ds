import { type ReactNode } from 'react'
import { ChevronDown, FileText, ClipboardList, Calendar, Bell, AtSign, Settings } from 'lucide-react'
import { cn } from '../../lib/utils'
import { ToolbarBadge } from './ToolbarBadge'
import { type ToolbarNotifications } from './Toolbar.types'

interface ToolbarTopRowProps {
  logo?: ReactNode
  companyName: string
  officeName?: string
  onLocationClick?: () => void
  userName: string
  onUserClick?: () => void
  onSettingsClick?: () => void
  notifications?: ToolbarNotifications
  onReleaseNotesClick?: () => void
}

function IconButton({
  children,
  onClick,
  label,
  className,
}: {
  children: ReactNode
  onClick?: () => void
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'relative flex items-center justify-center h-[45px] w-10 text-white/80 hover:text-white transition-colors cursor-pointer',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function ToolbarTopRow({
  logo,
  companyName,
  officeName,
  onLocationClick,
  userName,
  onUserClick,
  onSettingsClick,
  notifications = {},
  onReleaseNotesClick,
}: ToolbarTopRowProps) {
  return (
    <div
      className="flex h-[45px] w-full items-center bg-[var(--accu-blue-dark)]"
    >
      <div className="flex items-center gap-4 px-4 shrink-0">
        {logo}

        <button
          type="button"
          onClick={onLocationClick}
          className="flex items-center gap-1 text-white accu-text-body-md font-normal hover:text-white/80 transition-colors cursor-pointer"
        >
          <span>{companyName}</span>
          {officeName && (
            <span className="text-white/60">— {officeName}</span>
          )}
          <ChevronDown size={14} className="text-white/60" />
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center">
        <button
          type="button"
          onClick={onReleaseNotesClick}
          className="hidden md:flex items-center gap-2 px-3 h-[45px] text-white/80 hover:text-white accu-text-body-sm font-normal transition-colors cursor-pointer"
        >
          <FileText size={14} />
          <span>Release Notes</span>
          {notifications.releaseNotes && (
            <span className="h-2 w-2 rounded-full bg-[var(--accu-logo-orange)]" />
          )}
        </button>

        <IconButton label="Tasks" className="hidden sm:flex">
          <ClipboardList size={18} />
          {(notifications.tasks ?? 0) > 0 && (
            <ToolbarBadge count={notifications.tasks!} />
          )}
        </IconButton>

        <IconButton label="Calendar" className="hidden sm:flex">
          <Calendar size={18} />
          {(notifications.calendar ?? 0) > 0 && (
            <ToolbarBadge count={notifications.calendar!} />
          )}
        </IconButton>

        <IconButton label="Notifications">
          <Bell size={18} />
          {(notifications.notifications ?? 0) > 0 && (
            <ToolbarBadge count={notifications.notifications!} />
          )}
        </IconButton>

        <IconButton label="Mentions" className="hidden sm:flex">
          <AtSign size={18} />
          {(notifications.atMe ?? 0) > 0 && (
            <ToolbarBadge count={notifications.atMe!} />
          )}
        </IconButton>

        <div className="hidden md:flex items-center h-[45px] border-l border-white/20">
          <button
            type="button"
            onClick={onUserClick}
            className="flex items-center gap-2 px-4 text-white accu-text-body-md font-normal hover:text-white/80 transition-colors cursor-pointer"
          >
            <span>{userName}</span>
          </button>
          <button
            type="button"
            onClick={onSettingsClick}
            aria-label="Settings"
            className="flex items-center justify-center h-[45px] w-10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
