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
        'flex flex-col items-center justify-center h-[45px] px-2 py-[3px] text-white',
        'transition-colors duration-150 cursor-pointer',
        variant === 'accent'
          ? 'bg-[var(--accu-logo-orange)] hover:brightness-110'
          : active
            ? 'bg-white/15'
            : 'hover:bg-white/10',
        className,
      )}
      style={{ gap: '2px' }}
    >
      {icon}
      <span style={{ fontSize: '10px', lineHeight: '12px', whiteSpace: 'nowrap' }} className="font-normal">{label}</span>
    </button>
  )
}
