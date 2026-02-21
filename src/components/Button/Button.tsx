import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type ButtonProps, type ButtonVariant } from './Button.types'

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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', iconLeft, iconRight, iconOnly = false, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-[var(--accu-radius-md)] px-2.5 py-2.5 text-body-lg font-medium transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)]',
        iconOnly && 'h-10 w-10 p-2.5',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {iconLeft ? <span className="h-6 w-6 shrink-0 [&>svg]:h-6 [&>svg]:w-6">{iconLeft}</span> : null}
      {!iconOnly ? children : null}
      {iconRight ? <span className="h-6 w-6 shrink-0 [&>svg]:h-6 [&>svg]:w-6">{iconRight}</span> : null}
    </button>
  )
})
