import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type ProgressBarProps, type ProgressStepsProps } from './ProgressBar.types'

const colorMap: Record<NonNullable<ProgressBarProps['color']>, string> = {
  blue: 'var(--accu-primary-blue)',
  green: 'var(--accu-green)',
  red: 'var(--accu-red)',
  gray: 'var(--accu-gray-4)',
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, max = 100, color = 'blue', className },
  ref,
) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <div
        className="w-full overflow-hidden rounded-[var(--accu-radius-full)] bg-[var(--accu-gray-2)]"
        style={{ height: 'var(--accu-progress-track-height)' }}
      >
        <div
          className="h-full rounded-[var(--accu-radius-full)] transition-[width] duration-300 ease-out"
          style={{ width: `${percentage}%`, background: colorMap[color] }}
        />
      </div>
    </div>
  )
})

export const ProgressSteps = forwardRef<HTMLDivElement, ProgressStepsProps>(function ProgressSteps(
  { steps, currentStep, className },
  ref,
) {
  return (
    <div ref={ref} className={cn('flex w-full items-center', className)} style={{ height: 'var(--accu-progress-step-dot)' }}>
      <div className="relative flex w-full items-center justify-between">
        {/* Gray base track -- 1px, #DCDCDC, spans entire width */}
        <div
          className="absolute left-0 right-0 top-1/2"
          style={{
            height: 'var(--accu-progress-step-line-base)',
            marginTop: 'calc(var(--accu-progress-step-line-base) / -2)',
            background: 'var(--accu-gray-2)',
          }}
        />

        {/* Green progress line -- 1.5px, #8BC541, spans from first dot to current dot */}
        {currentStep > 1 ? (
          <div
            className="absolute left-0 top-1/2"
            style={{
              height: 'var(--accu-progress-step-line-active)',
              marginTop: 'calc(var(--accu-progress-step-line-active) / -2)',
              background: 'var(--accu-green)',
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        ) : null}

        {/* Step dots */}
        {steps.map((_, index) => {
          const stepNumber = index + 1
          const active = stepNumber <= currentStep

          return (
            <div
              key={index}
              className="relative z-10 flex items-center justify-center rounded-full"
              style={{
                width: 'var(--accu-progress-step-dot)',
                height: 'var(--accu-progress-step-dot)',
                background: active ? 'var(--accu-green)' : 'var(--accu-gray-2)',
              }}
            >
              {active ? (
                <span className="text-[10px] font-bold leading-none text-white">{stepNumber}</span>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
})
