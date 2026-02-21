import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { Button } from '../Button'
import { type AnnouncementProps } from './Announcement.types'

const variantStyles = {
  info: {
    accent: 'var(--accu-primary-blue)',
    bg: 'var(--accu-light-blue)',
    title: 'var(--accu-gray-6)',
    actionVariant: 'default' as const,
    Icon: Info,
    iconColor: 'var(--accu-primary-blue)',
  },
  success: {
    accent: 'var(--accu-green)',
    bg: 'var(--accu-light-green)',
    title: 'var(--accu-gray-6)',
    actionVariant: 'success' as const,
    Icon: CheckCircle,
    iconColor: 'var(--accu-green)',
  },
  warning: {
    accent: 'var(--accu-logo-orange)',
    bg: 'var(--accu-light-orange)',
    title: 'var(--accu-gray-6)',
    actionVariant: 'warning' as const,
    Icon: AlertTriangle,
    iconColor: 'var(--accu-logo-orange)',
  },
  error: {
    accent: 'var(--accu-red)',
    bg: 'var(--accu-light-red)',
    title: 'var(--accu-red)',
    actionVariant: 'danger' as const,
    Icon: AlertTriangle,
    iconColor: 'var(--accu-red)',
  },
}

export const Announcement = forwardRef<HTMLDivElement, AnnouncementProps>(function Announcement(
  { variant, title, message, primaryAction, secondaryAction, onDismiss, className },
  ref,
) {
  const { Icon, ...styles } = variantStyles[variant]

  return (
    <div ref={ref} className={cn('flex w-full', className)}>
      <div style={{ width: '8px', background: styles.accent }} />
      <div
        className="relative flex-1 border p-4"
        style={{
          background: styles.bg,
          borderColor: styles.accent,
        }}
      >
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-2 top-2 rounded p-1 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:shadow-[var(--accu-focus-ring)]"
            style={{ color: 'var(--accu-gray-4)' }}
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}

        <div className="flex gap-3 pr-8">
          <span className="mt-0.5">
            <Icon className="h-6 w-6" style={{ color: variantStyles[variant].iconColor }} />
          </span>
          <div className="flex-1">
            <p className="text-body-md font-bold" style={{ color: styles.title }}>
              {title}
            </p>
            {message ? (
              <p className="text-body-md font-regular mt-1" style={{ color: 'var(--accu-gray-6)' }}>
                {message}
              </p>
            ) : null}

            {primaryAction || secondaryAction ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {secondaryAction ? (
                  <Button
                    variant="outline"
                    onClick={secondaryAction.onClick}
                    className="hover:bg-transparent"
                    style={{ borderColor: styles.accent, color: styles.accent, background: styles.bg }}
                  >
                    {secondaryAction.label}
                  </Button>
                ) : null}
                {primaryAction ? (
                  <Button variant={styles.actionVariant} onClick={primaryAction.onClick}>
                    {primaryAction.label}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
})
