import { Calendar, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { TextInput } from '../TextInput'
import { type DatePickerProps } from './DatePicker.types'

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function buildCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay()
  const startDate = new Date(year, month, 1 - startOffset)
  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(startDate)
    day.setDate(startDate.getDate() + index)
    return day
  })
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value = null,
    onChange,
    label = 'Date',
    placeholder = 'Select date',
    required,
    error,
    disabled,
    className,
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState<Date>(value ?? new Date())

  useEffect(() => {
    if (value) setViewDate(value)
  }, [value])

  useEffect(() => {
    const onOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  const days = useMemo(() => buildCalendarDays(viewDate), [viewDate])
  const todayKey = toDateKey(new Date())
  const selectedKey = value ? toDateKey(value) : ''
  const monthLabel = viewDate.toLocaleString('default', { month: 'long' })
  const yearLabel = viewDate.getFullYear()

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
        value={value ? value.toLocaleDateString() : ''}
        readOnly
        label={label}
        placeholder={placeholder}
        required={required}
        error={error}
        disabled={disabled}
        active={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn('cursor-pointer', disabled && 'cursor-not-allowed', open && 'border-[var(--accu-logo-orange)]')}
        rightAdornment={<Calendar className="h-6 w-6" />}
      />

      {open ? (
        <div
          className="absolute left-0 top-[calc(100%+var(--accu-space-2))] z-20 rounded-[var(--accu-radius-md)] bg-[var(--accu-white)] p-[var(--accu-space-2)] shadow-[var(--accu-shadow-xl)]"
          style={{ width: 'var(--accu-date-picker-width)', minHeight: 'var(--accu-date-picker-height)' }}
        >
          <div className="mb-[var(--accu-space-2)] flex items-center justify-between">
            <button
              type="button"
              className="flex items-center gap-1 rounded-[var(--accu-radius-sm)] px-[var(--accu-space-2)] py-[var(--accu-space-1)] hover:bg-[var(--accu-gray-1)]"
            >
              <span className="text-[18px] font-bold leading-[20px] text-[var(--accu-gray-6)]">{monthLabel}</span>
              <ChevronDown className="h-4 w-4 text-[var(--accu-gray-4)]" />
            </button>
            <div className="flex items-center gap-1 rounded-[var(--accu-radius-sm)] px-[var(--accu-space-2)] py-[var(--accu-space-1)] hover:bg-[var(--accu-gray-1)]">
              <button
                type="button"
                className="text-[18px] font-normal leading-[20px] text-[var(--accu-gray-6)]"
                onClick={() => setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1))}
              >
                {yearLabel}
              </button>
              <ChevronsUpDown className="h-4 w-4 text-[var(--accu-gray-4)]" />
            </div>
          </div>

          <div className="mb-[var(--accu-space-1)] grid grid-cols-7">
            {weekDays.map((day) => (
              <div key={day} className="flex h-[var(--accu-date-cell-size)] items-center justify-center accu-text-body-sm font-bold text-[var(--accu-gray-5)]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((day) => {
              const key = toDateKey(day)
              const inCurrentMonth = day.getMonth() === viewDate.getMonth()
              const isToday = key === todayKey
              const isSelected = key === selectedKey
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!inCurrentMonth}
                  className={cn(
                    'relative flex h-[var(--accu-date-cell-size)] w-[var(--accu-date-cell-size)] items-center justify-center border-[0.5px] accu-text-body-md font-normal',
                    inCurrentMonth ? 'cursor-pointer' : 'cursor-not-allowed',
                    isSelected
                      ? 'border-[var(--accu-primary-blue)] bg-[var(--accu-primary-blue)] text-[var(--accu-white)]'
                      : 'border-[var(--accu-gray-0)] bg-[var(--accu-white)] text-[var(--accu-gray-6)] hover:bg-[var(--accu-gray-2)]',
                    !inCurrentMonth && 'border-[var(--accu-gray-1)] text-[var(--accu-gray-2)]',
                    isToday && !isSelected && 'border text-[var(--accu-logo-orange)] font-bold',
                    isToday && isSelected && 'font-bold',
                  )}
                  onClick={() => {
                    if (!inCurrentMonth) return
                    onChange(new Date(day.getFullYear(), day.getMonth(), day.getDate()))
                    setOpen(false)
                  }}
                >
                  {day.getDate()}
                  {isToday ? (
                    <span
                      className="absolute bottom-0 rounded-[var(--accu-radius-sm)] bg-[var(--accu-logo-orange)]"
                      style={{
                        width: 'var(--accu-date-today-bar-width)',
                        height: 'var(--accu-date-today-bar-height)',
                      }}
                    />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
})
