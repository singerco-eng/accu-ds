import { forwardRef, useId, useState } from 'react'
import { cn } from '../../lib/utils'
import { type RadioButtonProps } from './RadioButton.types'

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { className, label, checked, disabled, id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [focused, setFocused] = useState(false)
  const isChecked = Boolean(checked)

  const strokeColor = disabled
    ? 'var(--accu-disabled-orange)'
    : 'var(--accu-logo-orange)'

  const dotColor = disabled
    ? 'var(--accu-disabled-orange)'
    : isChecked
      ? 'var(--accu-logo-orange)'
      : 'var(--accu-light-orange)'

  return (
    <label
      htmlFor={inputId}
      className={cn('inline-flex items-center gap-2', disabled && 'cursor-not-allowed', className)}
    >
      <span className={cn('inline-flex rounded-full', focused && 'shadow-[var(--accu-focus-ring)]')}>
        <input
          id={inputId}
          ref={ref}
          type="radio"
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-full border bg-[var(--accu-white)]"
          style={{ borderColor: strokeColor }}
          aria-hidden="true"
        >
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
        </span>
      </span>
      {label ? <span className="text-body-md font-regular text-[var(--accu-gray-6)]">{label}</span> : null}
    </label>
  )
})
