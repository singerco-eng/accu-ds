import { X } from 'lucide-react'
import { Children, Fragment, forwardRef, isValidElement, useEffect, useMemo, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../lib/utils'
import { type ModalDrawerProps } from './ModalDrawer.types'

const sizeStyles: Record<NonNullable<ModalDrawerProps['size']>, string> = {
  sm: 'var(--accu-drawer-width-sm)',
  md: 'var(--accu-drawer-width-md)',
  lg: 'var(--accu-drawer-width-lg)',
}

function flattenFooterNodes(node: ReactNode): ReactNode[] {
  return Children.toArray(node).flatMap((child) => {
    if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      return Children.toArray(child.props.children)
    }
    return [child]
  })
}

export const ModalDrawer = forwardRef<HTMLDivElement, ModalDrawerProps>(function ModalDrawer(
  { open, onClose, title, size = 'sm', children, footer, className },
  ref,
) {
  const footerChildren = useMemo(() => flattenFooterNodes(footer), [footer])
  const leftFooter = footerChildren.length > 1 ? footerChildren[0] : null
  const rightFooter = footerChildren.length > 1 ? footerChildren.slice(1) : footerChildren

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose, open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 w-full cursor-default border-none bg-[var(--accu-backdrop)] p-0"
        onClick={onClose}
        aria-label="Close drawer"
      />

      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'absolute right-0 top-0 flex h-full translate-x-0 flex-col bg-[var(--accu-white)] animate-[drawer-in_200ms_ease-out]',
          className,
        )}
        style={{ width: sizeStyles[size] }}
      >
        <header
          className="border-b border-[var(--accu-gray-2)]"
          style={{ height: 'var(--accu-modal-header-height)' }}
        >
          <div className="grid h-full w-full grid-cols-[56px_1fr_56px] items-center">
            <span className="inline-flex h-[42px] w-[56px]" aria-hidden="true" />
            <h2 className="text-display-lg font-thin leading-[42px] text-[var(--accu-gray-6)] text-center">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-[42px] w-[56px] items-center justify-center text-[var(--accu-gray-4)] focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)]"
              aria-label="Close drawer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-[var(--accu-space-6)]">{children}</div>

        {footer ? (
          <footer
            className="flex items-center justify-between border-t border-[var(--accu-gray-2)] px-8 py-[var(--accu-space-5)]"
            style={{ height: 'var(--accu-modal-footer-height)' }}
          >
            <div className="flex items-center">{leftFooter}</div>
            <div className="flex items-center gap-[var(--accu-space-2)]">{rightFooter}</div>
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  )
})
