import { Check } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { MilestoneIcon } from './MilestoneIcon'
import { type ActionTileProps, type MilestoneTileProps } from './Tile.types'

export const Tile = forwardRef<HTMLButtonElement, ActionTileProps>(function Tile(
  { title, subtitle, count, rightIcon, onClick, disabled, className },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex items-center justify-between bg-[var(--accu-white)] px-[6px] py-[10px] text-left transition-colors',
        !disabled && 'hover:border hover:border-[var(--accu-primary-blue)] hover:bg-[var(--accu-gray-1)]',
        disabled && 'cursor-not-allowed',
        className,
      )}
      style={{
        width: 'var(--accu-tile-action-width)',
        height: 'var(--accu-tile-action-height)',
      }}
    >
      <div className="flex items-center gap-[var(--accu-space-2)]">
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center text-[20px] font-bold leading-none',
            disabled ? 'text-[var(--accu-gray-4)]' : 'text-[var(--accu-logo-orange)]',
          )}
        >
          {count ?? '0'}
        </span>
        <div>
          <p className={cn('text-[12px] font-normal', disabled ? 'text-[var(--accu-gray-4)]' : 'text-[var(--accu-gray-6)]')}>
            {title}
          </p>
          {subtitle ? (
            <p className={cn('text-[12px] font-normal', disabled ? 'text-[var(--accu-gray-4)]' : 'text-[var(--accu-gray-6)]')}>
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex h-10 w-6 shrink-0 items-center justify-center">
        {rightIcon ?? (
          <Check
            className={cn('h-6 w-6', disabled ? 'text-[var(--accu-gray-4)]' : 'text-[var(--accu-primary-blue)]')}
            strokeWidth={2.5}
          />
        )}
      </div>
    </button>
  )
})

export const MilestoneTile = forwardRef<HTMLButtonElement, MilestoneTileProps>(function MilestoneTile(
  { stage, icon, count, amount, onClick, disabled, className },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex flex-col items-start bg-[var(--accu-white)] px-[8px] py-[10px] text-left transition-colors',
        !disabled && 'hover:border hover:border-[var(--accu-primary-blue)] hover:bg-[var(--accu-gray-1)]',
        disabled && 'cursor-not-allowed',
        className,
      )}
      style={{
        width: 'var(--accu-tile-milestone-width)',
        height: 'var(--accu-tile-milestone-height)',
      }}
    >
      <div className="mb-auto">
        {stage ? <MilestoneIcon stage={stage} size={40} /> : icon}
      </div>
      <div>
        <p className="text-[20px] font-bold leading-[23px] text-[var(--accu-logo-orange)]">
          {count ?? '##'}
        </p>
        {amount ? (
          <p className="text-[14px] font-normal leading-[16px] text-[var(--accu-gray-6)]">
            {amount}
          </p>
        ) : null}
      </div>
    </button>
  )
})
