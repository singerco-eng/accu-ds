import { Check } from 'lucide-react'
import { forwardRef, useEffect } from 'react'
import { cn } from '../../lib/utils'
import { type ToastProps } from './Toast.types'

const variantStyles = {
  confirmation: {
    accent: 'var(--accu-green)',
  },
  warning: {
    accent: 'var(--accu-logo-orange)',
  },
  error: {
    accent: 'var(--accu-red)',
  },
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { variant, message, duration = 5000, onClose, className },
  ref,
) {
  const { accent } = variantStyles[variant]

  useEffect(() => {
    const timer = window.setTimeout(() => onClose?.(), duration)
    return () => window.clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      ref={ref}
      className={cn('relative w-[360px] overflow-hidden rounded-[var(--accu-radius-md)] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] animate-[toast-in_150ms_ease-out]', className)}
      style={{ border: `1px solid ${accent}` }}
    >
      <div className="flex h-[78px]">
        <div className="flex w-[60px] items-center justify-center" style={{ background: accent }}>
          <Check className="h-6 w-6 text-white" strokeWidth={3} />
        </div>
        <div className="flex w-[300px] items-center px-4">
          <p className="accu-text-body-md font-normal">{message}</p>
        </div>
      </div>
    </div>
  )
})
