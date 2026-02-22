import { X } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type TagProps } from './Tag.types'

function getVariantClasses(variant: TagProps['variant']) {
  if (variant === 'darkBlue') return 'bg-[var(--accu-blue-dark)]'
  if (variant === 'blue') return 'bg-[var(--accu-cyan)]'
  return 'bg-[var(--accu-gray-4)]'
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { variant = 'gray', weight = 'regular', removable = false, onRemove, children, className },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 px-1.5 py-1 text-white',
        weight === 'regular' ? 'font-normal' : 'font-light',
        getVariantClasses(variant),
        className,
      )}
      style={{ fontSize: '10px', lineHeight: '10px' }}
    >
      <span>{children}</span>
      {removable ? (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-sm text-white/80 hover:text-white focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)]"
          aria-label="Remove tag"
        >
          <X className="h-2.5 w-2.5" />
        </button>
      ) : null}
    </span>
  )
})
