import { ChevronDown, Search } from 'lucide-react'
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { Checkbox } from '../Checkbox'
import { TextInput } from '../TextInput'
import { type SelectMenuProps, type SelectOption } from './SelectMenu.types'

function normalizeValue(value: SelectMenuProps['value'], multiple: boolean): string[] {
  if (multiple) {
    if (Array.isArray(value)) return value
    if (typeof value === 'string' && value.length > 0) return [value]
    return []
  }
  return typeof value === 'string' ? [value] : []
}

export const SelectMenu = forwardRef<HTMLDivElement, SelectMenuProps>(function SelectMenu(
  {
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    label,
    required,
    multiple,
    searchable,
    error,
    disabled,
    className,
    size = 'default',
  },
  ref,
) {
  const isSm = size === 'sm'
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const interactingRef = useRef(false)

  const closeMenu = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  useEffect(() => {
    if (!open) return

    const onOutside = (event: MouseEvent) => {
      if (interactingRef.current) {
        interactingRef.current = false
        return
      }
      if (!rootRef.current?.contains(event.target as Node)) closeMenu()
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu()
    }
    document.addEventListener('mousedown', onOutside, true)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onOutside, true)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open, closeMenu])

  const selectedValues = normalizeValue(value, Boolean(multiple))
  const selectedOptions = useMemo(
    () => options.filter((option) => selectedValues.includes(option.value)),
    [options, selectedValues],
  )

  const filteredOptions = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (term.length === 0) return options
    return options.filter((option) => option.label.toLowerCase().includes(term))
  }, [options, query])

  const onSelect = (option: SelectOption) => {
    if (option.disabled) return
    if (multiple) {
      const exists = selectedValues.includes(option.value)
      const next = exists
        ? selectedValues.filter((item) => item !== option.value)
        : [...selectedValues, option.value]
      onChange(next)
      return
    }
    onChange(option.value)
    closeMenu()
  }

  const onSelectAll = () => {
    if (!multiple) return
    const enabledValues = options.filter((option) => !option.disabled).map((option) => option.value)
    const allSelected = enabledValues.every((item) => selectedValues.includes(item))
    onChange(allSelected ? [] : enabledValues)
  }

  const selectedText = selectedOptions.map((option) => option.label).join(', ')
  const inputValue = open ? query : selectedText

  const handleDropdownMouseDown = (event: React.MouseEvent) => {
    event.preventDefault()
    interactingRef.current = true
  }

  return (
    <div
      ref={(node) => {
        rootRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={cn('relative w-full max-w-[404px]', className)}
    >
      <TextInput
        value={inputValue}
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        disabled={disabled}
        active={open}
        size={size}
        readOnly={!searchable}
        onClick={() => !disabled && setOpen(true)}
        onFocus={() => !disabled && setOpen(true)}
        onChange={(event) => {
          setQuery(event.currentTarget.value)
          if (!open) setOpen(true)
        }}
        className={cn('cursor-pointer', disabled && 'cursor-not-allowed')}
        rightAdornment={
          searchable ? (
            <Search className={isSm ? 'h-3.5 w-3.5' : 'h-5 w-5'} />
          ) : (
            <ChevronDown className={cn(isSm ? 'h-3.5 w-3.5' : 'h-6 w-6', 'transition-transform', open && 'rotate-180')} />
          )
        }
      />

      {open ? (
        <div
          className={cn(
            'absolute left-0 z-20 w-full overflow-hidden rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] shadow-[var(--accu-shadow-lg)]',
            isSm ? 'top-[calc(100%+2px)]' : 'top-[calc(100%+var(--accu-space-2))]',
          )}
          onMouseDown={handleDropdownMouseDown}
        >
          <div className={cn('overflow-y-auto', isSm ? 'max-h-[200px]' : 'max-h-[260px]')}>
            {multiple ? (
              <button
                type="button"
                className={cn(
                  'flex w-full items-center hover:bg-[var(--accu-light-blue)]',
                  isSm ? 'h-[28px] px-2' : 'h-[34px] px-[10px]',
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelectAll()}
              >
                <Checkbox
                  checked={options.filter((option) => !option.disabled).every((item) => selectedValues.includes(item.value))}
                  onChange={() => onSelectAll()}
                  label="Select All"
                  labelClassName={cn(
                    'font-normal text-[var(--accu-gray-6)] pointer-events-none',
                    isSm ? 'accu-text-body-sm' : 'accu-text-body-lg',
                  )}
                  className="w-full pointer-events-none"
                />
              </button>
            ) : null}

            {filteredOptions.map((option) => {
              const selected = selectedValues.includes(option.value)

              if (multiple) {
                return (
                  <button
                    type="button"
                    key={option.value}
                    disabled={option.disabled}
                    className={cn(
                      'flex w-full items-center',
                      isSm ? 'h-[28px] px-2' : 'h-[34px] px-[10px]',
                      option.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-[var(--accu-light-blue)]',
                      selected && 'bg-[var(--accu-light-blue)]',
                    )}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onSelect(option)}
                  >
                    <Checkbox
                      checked={selected}
                      disabled={option.disabled}
                      onChange={() => onSelect(option)}
                      label={option.label}
                      labelClassName={cn(
                        'font-normal text-[var(--accu-gray-6)] pointer-events-none',
                        isSm ? 'accu-text-body-sm' : 'accu-text-body-lg',
                      )}
                      className="w-full pointer-events-none"
                    />
                  </button>
                )
              }

              return (
                <button
                  type="button"
                  key={option.value}
                  disabled={option.disabled}
                  className={cn(
                    'flex w-full items-center text-left',
                    isSm ? 'h-[28px] px-2 accu-text-body-sm' : 'h-[34px] px-[10px] accu-text-body-lg',
                    'font-normal text-[var(--accu-gray-6)]',
                    option.disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-[var(--accu-light-blue)]',
                    selected && 'bg-[var(--accu-light-blue)] font-medium',
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSelect(option)}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
})
