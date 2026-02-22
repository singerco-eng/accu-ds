import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type SliderProps } from './Slider.types'

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  { min = 0, max = 100, value, onChange, label, labelPosition = 'top', showValue = true, formatValue, disabled, className },
  ref,
) {
  const safeValue = Math.min(max, Math.max(min, value))
  const ratio = ((safeValue - min) / (max - min || 1)) * 100
  const valueText = formatValue ? formatValue(safeValue) : `${safeValue}`

  return (
    <div ref={ref} className={cn(labelPosition === 'left' ? 'flex items-center gap-4' : 'inline-flex flex-col gap-2', className)}>
      {label ? <span className="accu-text-body-md font-normal text-[var(--accu-gray-6)]">{label}</span> : null}

      <div className="relative h-[28px] w-[270px]">
        {showValue ? (
          <span className="accu-text-body-sm font-bold absolute -top-6 -translate-x-1/2" style={{ left: `${ratio}%` }}>
            {valueText}
          </span>
        ) : null}

        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-[var(--accu-gray-2)]" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[var(--accu-dark-green)]"
          style={{ width: `${ratio}%` }}
        />
        <div
          className={cn(
            'absolute top-1/2 h-7 w-7 -translate-y-1/2 -translate-x-1/2 rounded-full border bg-white',
            disabled ? 'opacity-50' : '',
          )}
          style={{ left: `${ratio}%`, borderColor: 'var(--accu-dark-green)', cursor: disabled ? 'not-allowed' : 'grab' }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={safeValue}
          disabled={disabled}
          onChange={(event) => onChange(Number(event.currentTarget.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          aria-label={label ?? 'Slider'}
        />
      </div>
    </div>
  )
})
