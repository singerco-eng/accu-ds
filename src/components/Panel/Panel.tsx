import { ChevronDown, MoreVertical } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { type PanelProps } from './Panel.types'

export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { title, defaultOpen = false, disabled = false, children, className },
  ref,
) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-between border border-[var(--accu-gray-2)] bg-[var(--accu-gray-1)] text-left',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        )}
        style={{ height: 'var(--accu-panel-header-height)' }}
      >
        <span className="px-[var(--accu-space-4)] text-body-md font-bold text-[var(--accu-gray-6)]">{title}</span>
        <span
          className="flex h-full items-center justify-center gap-[var(--accu-space-2)] border-l border-[var(--accu-gray-2)] px-[var(--accu-space-2)] text-[var(--accu-gray-6)]"
          style={{ width: 'var(--accu-panel-action-width)' }}
        >
          <MoreVertical className="h-4 w-4" />
          <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} />
        </span>
      </button>

      <div
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0">
          <div className="rounded-b-[var(--accu-radius-md)] border border-t-0 border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-4)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
})
