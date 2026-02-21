import { forwardRef, useId, useState } from 'react'
import { cn } from '../../lib/utils'
import { type ToggleProps } from './Toggle.types'

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { className, label, checked, defaultChecked, onCheckedChange, onChange, disabled, id, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [focused, setFocused] = useState(false)
  const [internalChecked, setInternalChecked] = useState(Boolean(defaultChecked))
  const isControlled = checked !== undefined
  const isChecked = isControlled ? Boolean(checked) : internalChecked

  const trackColor = disabled
    ? isChecked
      ? 'var(--accu-btn-success-disabled)'
      : 'var(--accu-btn-error-disabled)'
    : isChecked
      ? 'var(--accu-green)'
      : 'var(--accu-red)'

  return (
    <label
      htmlFor={inputId}
      className={cn('inline-flex items-center gap-2', disabled && 'cursor-not-allowed', className)}
    >
      <span className={cn('inline-flex rounded-full', focused && 'shadow-[var(--accu-focus-ring)]')}>
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          className="peer sr-only"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => {
            if (!isControlled) setInternalChecked(event.currentTarget.checked)
            onCheckedChange?.(event.currentTarget.checked)
            onChange?.(event)
          }}
          {...props}
        />
        <span
          className="relative inline-flex h-[22px] w-[44px] items-center rounded-full p-0.5 transition-colors"
          style={{ backgroundColor: trackColor }}
          aria-hidden="true"
        >
          <span
            className={cn(
              'h-[18px] w-[18px] rounded-full bg-white shadow transition-transform duration-150',
              isChecked && 'translate-x-[22px]',
            )}
          />
        </span>
      </span>
      {label ? <span className="text-body-md font-regular text-[var(--accu-gray-6)]">{label}</span> : null}
    </label>
  )
})
