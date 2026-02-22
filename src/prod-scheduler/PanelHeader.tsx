import { useState, useRef, useEffect } from 'react'
import { Maximize2, Minimize2, ChevronDown, LayoutGrid, List } from 'lucide-react'
import { SCOPE_LABELS, type PanelScope, type GroupByField } from './data/mock-orders'

const scopeOptions: { value: PanelScope; label: string }[] = [
  { value: 'to-be-scheduled', label: 'To Be Scheduled' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'all', label: 'All Orders' },
]

const baseGroupByOptions: { value: GroupByField; label: string }[] = [
  { value: 'trade', label: 'Trade' },
  { value: 'crew', label: 'Crew' },
  { value: 'age', label: 'Age' },
  { value: 'event-type', label: 'Order Type' },
  { value: 'wod-status', label: 'WOD Status' },
  { value: 'awc-status', label: 'AWC Status' },
  { value: 'none', label: 'None' },
]

const groupByOptions = baseGroupByOptions

export type ViewMode = 'card' | 'list'

interface PanelHeaderProps {
  scope: PanelScope
  onScopeChange: (scope: PanelScope) => void
  count: number
  groupBy: GroupByField
  onGroupByChange: (groupBy: GroupByField) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  showViewToggle: boolean
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

function HeaderDropdown<T extends string>({
  value,
  options,
  onChange,
  renderTrigger,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (val: T) => void
  renderTrigger: (label: string, open: boolean) => React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const current = options.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((p) => !p)}>
        {renderTrigger(current?.label ?? '', open)}
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-1 z-50 min-w-[160px] rounded-[var(--accu-radius-md)] py-1 shadow-lg"
          style={{ background: 'var(--accu-white)', border: '1px solid var(--accu-gray-2)' }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className="flex w-full items-center px-3 py-1.5 text-left accu-text-body-sm transition-colors hover:bg-[var(--accu-gray-0)]"
              style={{ color: opt.value === value ? 'var(--accu-primary-blue)' : 'var(--accu-gray-6)', fontWeight: opt.value === value ? 600 : 400 }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PanelHeader({ scope, onScopeChange, count, groupBy, onGroupByChange, viewMode, onViewModeChange, showViewToggle, isFullscreen, onToggleFullscreen }: PanelHeaderProps) {
  const groupLabel = groupByOptions.find((o) => o.value === groupBy)?.label ?? 'None'

  return (
    <div
      className="flex items-center justify-between px-3 py-2"
      style={{ background: 'var(--accu-blue-dark)', minHeight: 40 }}
    >
      <div className="flex items-center gap-2">
        <HeaderDropdown
          value={scope}
          options={scopeOptions}
          onChange={onScopeChange}
          renderTrigger={(_, open) => (
            <span className="inline-flex items-center gap-1.5 font-bold text-white uppercase cursor-pointer hover:text-white/80 transition-colors" style={{ fontSize: '13px', letterSpacing: '0.5px' }}>
              {SCOPE_LABELS[scope]}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
            </span>
          )}
        />
        <span
          className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 font-bold"
          style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', color: 'white' }}
        >
          {count}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <HeaderDropdown
          value={groupBy}
          options={groupByOptions}
          onChange={onGroupByChange}
          renderTrigger={(_, open) => (
            <span
              className="inline-flex items-center gap-1 cursor-pointer rounded-[var(--accu-radius-sm)] px-2 py-1 transition-colors hover:bg-white/15"
              style={{ background: 'rgba(255,255,255,0.1)', fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}
            >
              <span className="font-normal" style={{ color: 'rgba(255,255,255,0.5)' }}>Group:</span>
              <span className="font-bold text-white">{groupLabel}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
            </span>
          )}
        />
        {showViewToggle && (
          <div className="flex items-center rounded-[var(--accu-radius-sm)]" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <button
              type="button"
              onClick={() => onViewModeChange('card')}
              className="flex h-6 w-6 items-center justify-center rounded-l-[var(--accu-radius-sm)] transition-colors"
              style={{ background: viewMode === 'card' ? 'rgba(255,255,255,0.25)' : undefined, color: viewMode === 'card' ? 'white' : 'rgba(255,255,255,0.5)' }}
              title="Card view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className="flex h-6 w-6 items-center justify-center rounded-r-[var(--accu-radius-sm)] transition-colors"
              style={{ background: viewMode === 'list' ? 'rgba(255,255,255,0.25)' : undefined, color: viewMode === 'list' ? 'white' : 'rgba(255,255,255,0.5)' }}
              title="List view"
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="flex h-6 w-6 items-center justify-center rounded-[var(--accu-radius-sm)] text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  )
}
