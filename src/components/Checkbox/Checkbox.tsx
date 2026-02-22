import { Check } from 'lucide-react'
import { forwardRef, useId, useState } from 'react'
import { cn } from '../../lib/utils'
import { type CheckboxProps } from './Checkbox.types'

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, indeterminate = false, checked, disabled, id, labelClassName, ...props },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [focused, setFocused] = useState(false)
  const isChecked = Boolean(checked)

  const borderColor = disabled
    ? 'var(--accu-disabled-orange)'
    : 'var(--accu-logo-orange)'

  const fillColor = disabled
    ? 'var(--accu-disabled-orange)'
    : 'var(--accu-logo-orange)'

  return (
    <label
      htmlFor={inputId}
      className={cn('inline-flex items-center gap-2', disabled && 'cursor-not-allowed', className)}
    >
      <span className={cn('relative inline-flex items-center justify-center', focused && 'rounded-[4px] shadow-[var(--accu-focus-ring)]')}>
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        <span
          className="inline-flex h-5 w-5 items-center justify-center rounded-[4px] border-2"
          style={{
            borderColor,
            backgroundColor: isChecked || indeterminate ? fillColor : 'var(--accu-white)',
          }}
          aria-hidden="true"
        >
          {indeterminate ? <span className="h-[3.5px] w-[14px] rounded-[2px] bg-white" /> : null}
          {!indeterminate && isChecked ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
        </span>
      </span>
      {label ? <span className={cn('accu-text-body-md font-normal text-[var(--accu-gray-6)]', labelClassName)}>{label}</span> : null}
    </label>
  )
})
