import { MoreVertical } from 'lucide-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { type ContextMenuProps } from './ContextMenu.types'

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(function ContextMenu(
  { items, className },
  ref,
) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  return (
    <div
      ref={(node) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={cn('relative inline-flex', className)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-[var(--accu-radius-sm)] bg-[var(--accu-btn-menu-blue)] text-[var(--accu-primary-blue)] transition-colors hover:bg-[var(--accu-btn-menu-hover)] focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)]"
        style={{
          width: 'var(--accu-context-trigger-width)',
          height: 'var(--accu-context-trigger-height)',
          padding: 'var(--accu-space-2) 18px',
        }}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreVertical className="h-6 w-6" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+var(--accu-space-2))] z-30 overflow-hidden rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] shadow-[var(--accu-shadow-lg)]"
          style={{ minWidth: 'var(--accu-context-item-min-width)' }}
        >
          {items.map((item) => (
            <div key={item.label}>
              <button
                type="button"
                disabled={item.disabled}
                className={cn(
                  'flex w-full items-center gap-[var(--accu-space-2)] px-[var(--accu-space-3)] py-[var(--accu-space-2)] text-left accu-text-body-md font-normal text-[var(--accu-primary-blue)]',
                  item.disabled ? 'cursor-not-allowed text-[var(--accu-gray-4)]' : 'hover:bg-[var(--accu-light-blue)]',
                )}
                onClick={() => {
                  if (item.disabled) return
                  item.onClick()
                  setOpen(false)
                }}
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center">{item.icon}</span>
                <span>{item.label}</span>
              </button>
              {item.dividerAfter ? <div className="h-px w-full bg-[var(--accu-gray-1)]" /> : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
})
