import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type BadgeProps } from './Badge.types'

const variantStyles = {
  gray: 'bg-[var(--accu-gray-2)]',
  grayBlue: 'bg-[var(--accu-gray-blue)]',
  warning: 'bg-[var(--accu-logo-orange)]',
  danger: 'bg-[var(--accu-red)]',
} as const

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'gray', children, className },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex h-6 w-6 items-center justify-center rounded-full text-white font-bold',
        variantStyles[variant],
        className,
      )}
      style={{ fontSize: '14px', lineHeight: '14px' }}
    >
      {children}
    </span>
  )
})
