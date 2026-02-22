import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type BreadcrumbsProps } from './Breadcrumbs.types'

export const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(function Breadcrumbs({ items, className }, ref) {
  const single = items.length === 1

  if (single) {
    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-1 rounded-sm pr-4 pl-1 py-[9px]', className)}
        style={{ background: 'var(--accu-gray-1)' }}
      >
        <ChevronLeft className="h-3 w-3" style={{ color: 'var(--accu-primary-blue)' }} />
        <FileText className="h-3 w-3" style={{ color: 'var(--accu-primary-blue)' }} />
        <span className="accu-text-body-sm font-normal" style={{ color: 'var(--accu-primary-blue)' }}>
          Back to List
        </span>
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('inline-flex items-center gap-1', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const isActive = Boolean(item.active)
        const label = (
          <span
            className={cn(
              'accu-text-body-sm inline-flex items-center gap-1.5 transition-colors',
              !isLast && 'group-hover:font-medium group-hover:text-[var(--accu-primary-blue)] group-focus-visible:font-medium group-focus-visible:text-[var(--accu-primary-blue)]',
              isActive && 'font-medium',
            )}
            style={{ color: isActive ? 'var(--accu-primary-blue)' : 'var(--accu-gray-4)' }}
          >
            <FileText className="h-3 w-3" />
            {item.label}
          </span>
        )

        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1">
            {isLast || (!item.href && !item.onClick) ? (
              <span>{label}</span>
            ) : item.href ? (
              <a
                href={item.href}
                onClick={item.onClick}
                className="group rounded-sm no-underline focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)]"
              >
                {label}
              </a>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                className="group rounded-sm focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)]"
              >
                {label}
              </button>
            )}
            {!isLast ? <ChevronRight className="h-3 w-3" style={{ color: 'var(--accu-gray-4)' }} /> : null}
          </span>
        )
      })}
    </div>
  )
})
