import { forwardRef, type ElementType } from 'react'
import { cn } from '../../lib/utils'
import {
  type CardProps,
  type CardHeaderProps,
  type CardBodyProps,
  type CardFooterProps,
  type CardMediaProps,
  type CardDividerProps,
  type CardTitleProps,
} from './Card.types'

const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-[var(--accu-white)] border border-[var(--accu-gray-2)]',
  elevated: 'bg-[var(--accu-white)] border border-[var(--accu-gray-2)] shadow-[var(--accu-shadow-md)]',
  outlined: 'bg-transparent border border-[var(--accu-gray-4)]',
}

const paddingClasses: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-[var(--accu-space-3)]',
  md: 'p-[var(--accu-space-4)]',
  lg: 'p-[var(--accu-space-6)]',
}

const footerAlignClasses: Record<NonNullable<CardFooterProps['align']>, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
  between: 'justify-between',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    variant = 'default',
    selected = false,
    interactive = false,
    padding = 'none',
    as = 'div',
    children,
    onClick,
    ...props
  },
  ref,
) {
  const Tag = as as ElementType

  const isClickable = interactive || Boolean(onClick)

  return (
    <Tag
      ref={ref}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isClickable
          ? (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>)
              }
            }
          : undefined
      }
      className={cn(
        'relative overflow-hidden rounded-[var(--accu-card-radius)]',
        variantClasses[variant],
        paddingClasses[padding],
        selected && 'border-[var(--accu-logo-orange)] bg-[var(--accu-card-selected-bg)]',
        isClickable && 'cursor-pointer outline-none transition-shadow duration-150 hover:shadow-[var(--accu-shadow-md)] focus-visible:shadow-[var(--accu-focus-ring)]',
        className,
      )}
      {...props}
    >
      {selected ? (
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 h-full rounded-l-[var(--accu-card-radius)] bg-[var(--accu-logo-orange)]"
          style={{ width: 'var(--accu-card-selected-bar)' }}
        />
      ) : null}
      {children}
    </Tag>
  )
}) as CardCompound

function CardHeader({ className, children, action, divider = false, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-[var(--accu-space-3)] px-[var(--accu-space-4)] pt-[var(--accu-space-4)]',
        divider && 'border-b border-[var(--accu-gray-2)] pb-[var(--accu-space-3)]',
        !divider && 'pb-[var(--accu-space-2)]',
        className,
      )}
      {...props}
    >
      <div className="min-w-0 flex-1">{children}</div>
      {action ? <div className="flex shrink-0 items-center gap-[var(--accu-space-2)]">{action}</div> : null}
    </div>
  )
}

function CardTitle({ title, subtitle, children, className, ...props }: CardTitleProps) {
  return (
    <div className={cn('min-w-0', className)} {...props}>
      <h3 className="truncate accu-text-body-lg font-bold text-[var(--accu-gray-6)]">{title}</h3>
      {subtitle ? <p className="mt-0.5 truncate accu-text-body-sm text-[var(--accu-gray-4)]">{subtitle}</p> : null}
      {children}
    </div>
  )
}

function CardBody({ className, children, scrollable = false, maxHeight, ...props }: CardBodyProps) {
  return (
    <div
      className={cn(
        'px-[var(--accu-space-4)] py-[var(--accu-space-2)]',
        scrollable && 'overflow-y-auto',
        className,
      )}
      style={maxHeight ? { maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight } : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

function CardFooter({ className, children, divider = false, align = 'right', ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-[var(--accu-space-2)] px-[var(--accu-space-4)] pb-[var(--accu-space-4)]',
        divider && 'border-t border-[var(--accu-gray-2)] pt-[var(--accu-space-3)]',
        !divider && 'pt-[var(--accu-space-2)]',
        footerAlignClasses[align],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardMedia({ className, src, alt, height, position = 'top', children, ...props }: CardMediaProps) {
  const heightStyle = height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined

  if (children) {
    return (
      <div
        className={cn(
          'overflow-hidden',
          position === 'top' && 'rounded-t-[var(--accu-card-radius)]',
          position === 'bottom' && 'rounded-b-[var(--accu-card-radius)]',
          className,
        )}
        style={heightStyle}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-hidden',
        position === 'top' && 'rounded-t-[var(--accu-card-radius)]',
        position === 'bottom' && 'rounded-b-[var(--accu-card-radius)]',
        className,
      )}
      style={heightStyle}
      {...props}
    >
      {src ? <img src={src} alt={alt ?? ''} className="h-full w-full object-cover" /> : null}
    </div>
  )
}

function CardDivider({ className, ...props }: CardDividerProps) {
  return <hr className={cn('mx-[var(--accu-space-4)] border-t border-[var(--accu-gray-2)]', className)} {...props} />
}

interface CardCompound
  extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader
  Title: typeof CardTitle
  Body: typeof CardBody
  Footer: typeof CardFooter
  Media: typeof CardMedia
  Divider: typeof CardDivider
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Body = CardBody
Card.Footer = CardFooter
Card.Media = CardMedia
Card.Divider = CardDivider
