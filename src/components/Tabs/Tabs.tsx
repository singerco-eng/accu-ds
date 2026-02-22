import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type TabsProps } from './Tabs.types'

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { items, activeId, onChange, variant = 'underline', size = 'default', colorScheme = 'blue', className },
  ref,
) {
  if (variant === 'pill') {
    const isSm = size === 'sm'
    const isNeutral = colorScheme === 'neutral'

    return (
      <div ref={ref} className={cn('inline-flex', className)}>
        {items.map((item, index) => {
          const active = item.id === activeId
          const isFirst = index === 0
          const isLast = index === items.length - 1
          const radiusClass = isSm
            ? (isFirst ? 'rounded-l-[6px] rounded-r-none' : isLast ? 'rounded-r-[6px] rounded-l-none' : 'rounded-none')
            : (isFirst ? 'rounded-l-[10px] rounded-r-none' : isLast ? 'rounded-r-[10px] rounded-l-none' : 'rounded-none')

          const sizeClass = isSm
            ? 'h-[22px] px-2 font-medium'
            : 'accu-text-body-lg h-[35px] px-3 py-2 font-normal'

          let colorClass: string
          if (isNeutral) {
            colorClass = active
              ? 'bg-[var(--accu-primary-blue)] text-white'
              : 'bg-[var(--accu-gray-2)] text-[var(--accu-gray-5)]'
          } else {
            colorClass = active
              ? 'bg-[var(--accu-primary-blue)] text-white'
              : 'bg-white text-[var(--accu-primary-blue)]'
          }

          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={() => onChange(item.id)}
              className={cn(
                'transition-colors focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)] disabled:cursor-not-allowed disabled:opacity-50',
                sizeClass,
                radiusClass,
                colorClass,
              )}
              style={isSm ? { fontSize: '11px', lineHeight: '22px' } : undefined}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div ref={ref} className={cn('inline-flex items-stretch', className)}>
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              disabled={item.disabled}
              onClick={() => onChange(item.id)}
              className={cn(
                'accu-text-body-md relative inline-flex h-[42px] min-w-[96px] items-center justify-center px-4 focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)] disabled:cursor-not-allowed disabled:opacity-50',
                active ? 'bg-white font-bold text-[var(--accu-blue-dark)]' : 'bg-[var(--accu-gray-0)] font-normal text-[var(--accu-primary-blue)]',
              )}
              style={{
                borderBottom: active ? '1px solid var(--accu-blue-dark)' : 'none',
                borderRight: '1px solid var(--accu-gray-2)',
              }}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('inline-flex items-stretch', className)}>
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            onClick={() => onChange(item.id)}
            className={cn(
              'relative inline-flex h-[42px] min-w-[96px] items-center justify-center px-4 focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)] disabled:cursor-not-allowed disabled:opacity-50',
              active ? 'z-10 bg-white text-[var(--accu-blue-dark)]' : 'bg-[var(--accu-gray-1)] text-[var(--accu-primary-blue)]',
            )}
            style={{
              borderLeft: !active ? '1px solid var(--accu-gray-2)' : 'none',
              borderRight: !active ? '1px solid var(--accu-gray-2)' : 'none',
              fontSize: active ? '20px' : '14px',
              lineHeight: active ? '20px' : '16px',
              fontWeight: 300,
            }}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
})
