import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type ButtonProps, type ButtonSize, type ButtonVariant } from './Button.types'

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-[var(--accu-primary-blue)] text-white hover:bg-[var(--accu-btn-primary-hover)] disabled:bg-[var(--accu-btn-primary-disabled)]',
  outline:
    'border border-[var(--accu-primary-blue)] bg-transparent text-[var(--accu-primary-blue)] hover:bg-[var(--accu-light-blue)] disabled:border-[var(--accu-btn-primary-disabled)] disabled:text-[var(--accu-btn-primary-disabled)]',
  text:
    'bg-transparent text-[var(--accu-primary-blue)] hover:underline disabled:text-[var(--accu-btn-primary-disabled)]',
  warning:
    'bg-[var(--accu-primary-orange)] text-white hover:bg-[var(--accu-btn-warning-hover)] disabled:bg-[var(--accu-btn-warning-disabled)]',
  danger:
    'bg-[var(--accu-red)] text-white hover:bg-[var(--accu-btn-error-hover)] disabled:bg-[var(--accu-btn-error-disabled)]',
  success:
    'bg-[var(--accu-green)] text-white hover:bg-[var(--accu-btn-success-hover)] disabled:bg-[var(--accu-btn-success-disabled)]',
}

const sizeClasses: Record<ButtonSize, { base: string; iconOnly: string; iconSlot: string }> = {
  default: {
    base: 'px-2.5 py-2.5 accu-text-body-lg',
    iconOnly: 'h-10 w-10 p-2.5',
    iconSlot: 'h-6 w-6 [&>svg]:h-6 [&>svg]:w-6',
  },
  sm: {
    base: 'px-2 py-1 accu-text-body-sm',
    iconOnly: 'h-7 w-7 p-1',
    iconSlot: 'h-4 w-4 [&>svg]:h-4 [&>svg]:w-4',
  },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', size = 'default', iconLeft, iconRight, iconOnly = false, children, ...props },
  ref,
) {
  const s = sizeClasses[size]
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-[var(--accu-radius-md)] font-medium transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)]',
        s.base,
        iconOnly && s.iconOnly,
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {iconLeft ? <span className={cn('shrink-0', s.iconSlot)}>{iconLeft}</span> : null}
      {!iconOnly ? children : null}
      {iconRight ? <span className={cn('shrink-0', s.iconSlot)}>{iconRight}</span> : null}
    </button>
  )
})
