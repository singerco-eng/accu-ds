import { cn } from '../../lib/utils'

interface ToolbarBadgeProps {
  count: number
  className?: string
}

export function ToolbarBadge({ count, className }: ToolbarBadgeProps) {
  if (count <= 0) return null

  const display = count > 99 ? '99+' : String(count)

  return (
    <span
      className={cn(
        'relative flex h-[22px] min-w-[22px] items-center justify-center rounded-full',
        'bg-[var(--accu-red)] text-white font-bold',
        className,
      )}
      style={{ fontSize: '14px', lineHeight: '18px' }}
    >
      {display}
    </span>
  )
}
