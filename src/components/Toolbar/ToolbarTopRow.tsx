import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { ToolbarBadge } from './ToolbarBadge'
import { type ToolbarNotifications } from './Toolbar.types'
import { TaskIcon, CalendarBlankIcon, NotificationIcon, CogIcon } from './ToolbarIcons'

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

function NavIconButton({
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
        'flex items-center justify-center h-[45px] text-white hover:text-white/80 transition-colors cursor-pointer',
        className,
      )}
      style={{ paddingLeft: '4px', paddingRight: '8px', gap: '2px' }}
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
      <div className="flex items-center px-4 shrink-0" style={{ gap: '24px' }}>
        {logo}

        <button
          type="button"
          onClick={onLocationClick}
          className="flex items-center px-2 h-[45px] text-white accu-text-body-sm font-normal hover:text-white/80 transition-colors cursor-pointer"
          style={{ gap: '4px' }}
        >
          <span>{companyName}</span>
          {officeName && (
            <span className="text-white/60">— {officeName}</span>
          )}
          <svg width={14} height={14} viewBox="0 0 14 14" fill="currentColor" className="text-white/60 shrink-0"><polygon points="3,5 11,5 7,10" /></svg>
        </button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center">
        <button
          type="button"
          onClick={onReleaseNotesClick}
          className="hidden md:flex items-center gap-2 px-2 h-[45px] text-white hover:text-white/80 accu-text-body-sm font-normal transition-colors cursor-pointer"
        >
          <span>Release Notes</span>
          {notifications.releaseNotes && (
            <span className="h-[11px] w-[11px] rounded-full bg-[var(--accu-logo-orange)]" />
          )}
        </button>

        <NavIconButton label="Tasks" className="hidden sm:flex">
          <TaskIcon size={24} />
          {(notifications.tasks ?? 0) > 0 && (
            <ToolbarBadge count={notifications.tasks!} />
          )}
        </NavIconButton>

        <NavIconButton label="Calendar" className="hidden sm:flex">
          <CalendarBlankIcon size={24} />
          {(notifications.calendar ?? 0) > 0 && (
            <ToolbarBadge count={notifications.calendar!} />
          )}
        </NavIconButton>

        <NavIconButton label="Notifications">
          <NotificationIcon size={24} />
          {(notifications.notifications ?? 0) > 0 && (
            <ToolbarBadge count={notifications.notifications!} />
          )}
        </NavIconButton>

        <NavIconButton label="Mentions" className="hidden sm:flex">
          <span className="accu-text-body-sm font-normal">@Me</span>
          {(notifications.atMe ?? 0) > 0 && (
            <ToolbarBadge count={notifications.atMe!} />
          )}
        </NavIconButton>

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
            <CogIcon size={24} />
          </button>
        </div>
      </div>
    </div>
  )
}
