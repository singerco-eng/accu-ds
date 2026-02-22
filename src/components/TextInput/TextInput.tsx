import {
  forwardRef,
  type ChangeEvent,
  type FocusEvent,
  type Ref,
  type TextareaHTMLAttributes,
  useId,
  useMemo,
  useState,
} from 'react'
import { cn } from '../../lib/utils'
import { type TextInputProps } from './TextInput.types'

export const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>(function TextInput(
  {
    className,
    label,
    error,
    required,
    multiline,
    rows = 4,
    id,
    value,
    defaultValue,
    onFocus,
    onBlur,
    onChange,
    disabled,
    active = false,
    rightAdornment,
    hideNativeValueText = false,
    placeholder,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [focused, setFocused] = useState(false)
  const initialDefault = typeof defaultValue === 'string' ? defaultValue : typeof defaultValue === 'number' ? String(defaultValue) : ''
  const [uncontrolledValue, setUncontrolledValue] = useState(initialDefault)

  const currentValue = useMemo(() => {
    if (value === undefined || value === null) return uncontrolledValue
    return typeof value === 'number' ? String(value) : value
  }, [uncontrolledValue, value])

  const hasValue = currentValue.length > 0
  const hasFloatingLabel = Boolean(label || placeholder)
  const floatingLabelText = label ?? placeholder ?? ''
  const isFloating = focused || active || hasValue
  const hasError = Boolean(error)
  const requiredEmpty = Boolean(required && !focused && !hasValue && !hasError)

  const fieldClass = cn(
    'accu-text-body-lg w-full border border-transparent px-[10px] pb-1 pt-[23px] text-[var(--accu-input-text)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
    rightAdornment && 'pr-10',
    hideNativeValueText && 'text-transparent',
    multiline ? 'min-h-[50px] resize-y' : 'h-[50px]',
    hasError && 'border-b-[var(--accu-red)] bg-[var(--accu-light-red)]',
    requiredEmpty && 'border-b-[var(--accu-primary-orange)] bg-[var(--accu-light-orange)]',
    !hasError && !requiredEmpty && 'bg-[var(--accu-input-bg)]',
    (focused || active) && 'shadow-[var(--accu-focus-ring)]',
    className,
  )

  return (
    <div className="w-full">
      <div className="relative">
        {hasFloatingLabel ? (
          <label
            htmlFor={inputId}
            className={cn(
              'pointer-events-none absolute left-[10px] text-[var(--accu-gray-4)] transition-all duration-200 ease-out',
              isFloating ? 'top-1 accu-text-body-md' : 'top-4 accu-text-body-lg',
            )}
          >
            {floatingLabelText}
          </label>
        ) : null}

        {multiline ? (
          <textarea
            id={inputId}
            ref={ref as Ref<HTMLTextAreaElement>}
            className={fieldClass}
            rows={rows}
            value={value as string | number | readonly string[] | undefined}
            defaultValue={defaultValue as string | number | readonly string[] | undefined}
            placeholder=""
            onFocus={(event) => {
              setFocused(true)
              onFocus?.(event as unknown as FocusEvent<HTMLInputElement>)
            }}
            onBlur={(event) => {
              setFocused(false)
              onBlur?.(event as unknown as FocusEvent<HTMLInputElement>)
            }}
            onChange={(event) => {
              if (value === undefined) setUncontrolledValue(event.currentTarget.value)
              onChange?.(event as unknown as ChangeEvent<HTMLInputElement>)
            }}
            disabled={disabled}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <>
            <input
              id={inputId}
              ref={ref as Ref<HTMLInputElement>}
              className={fieldClass}
              value={value}
              defaultValue={defaultValue}
              placeholder=""
              onFocus={(event) => {
                setFocused(true)
                onFocus?.(event)
              }}
              onBlur={(event) => {
                setFocused(false)
                onBlur?.(event)
              }}
              onChange={(event) => {
                if (value === undefined) setUncontrolledValue(event.currentTarget.value)
                onChange?.(event)
              }}
              disabled={disabled}
              {...props}
            />
            {rightAdornment ? (
              <span className="pointer-events-none absolute right-[10px] top-1/2 -translate-y-1/2 text-[var(--accu-gray-4)]">
                {rightAdornment}
              </span>
            ) : null}
          </>
        )}
      </div>
      {error ? (
        <p className="accu-text-body-sm mt-1" style={{ color: 'var(--accu-red)' }}>
          {error}
        </p>
      ) : null}
    </div>
  )
})
