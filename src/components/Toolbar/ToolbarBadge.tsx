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
        'absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1',
        'bg-[var(--accu-red)] text-white font-bold',
        className,
      )}
      style={{ fontSize: '10px', lineHeight: '10px' }}
    >
      {display}
    </span>
  )
}
