import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ToolbarButtonProps {
  label: string
  icon?: ReactNode
  variant?: 'default' | 'accent'
  active?: boolean
  onClick?: () => void
  className?: string
}

export function ToolbarButton({ label, icon, variant = 'default', active, onClick, className }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-3 h-[45px] accu-text-body-md font-normal text-white whitespace-nowrap',
        'transition-colors duration-150 cursor-pointer',
        variant === 'accent'
          ? 'bg-[var(--accu-logo-orange)] hover:brightness-110'
          : active
            ? 'bg-white/15'
            : 'hover:bg-white/10',
        className,
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
