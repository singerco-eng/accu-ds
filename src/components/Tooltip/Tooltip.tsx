import { forwardRef, useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { type TooltipProps } from './Tooltip.types'

const positionClasses = {
  top: 'bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2',
  bottom: 'top-[calc(100%+8px)] left-1/2 -translate-x-1/2',
  left: 'right-[calc(100%+8px)] top-1/2 -translate-y-1/2',
  right: 'left-[calc(100%+8px)] top-1/2 -translate-y-1/2',
} as const

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(function Tooltip(
  { content, position = 'top', children, className },
  ref,
) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!hovered) {
      setVisible(false)
      return
    }

    const timer = window.setTimeout(() => setVisible(true), 200)
    return () => window.clearTimeout(timer)
  }, [hovered])

  return (
    <span
      ref={ref}
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-30 w-max max-w-[300px] rounded-none border px-2 py-2 opacity-0 transition-opacity duration-150',
          'accu-text-body-sm font-normal',
          positionClasses[position],
          visible && 'opacity-100',
        )}
        style={{
          background: '#FFEEE3',
          borderColor: '#F4925D',
          color: '#4D4D4D',
          fontSize: '12px',
          lineHeight: '14px',
        }}
      >
        {content}
      </span>
    </span>
  )
})
