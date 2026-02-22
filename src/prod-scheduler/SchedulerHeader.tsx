import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, LayoutPanelLeft, PanelBottom, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '../components/Button'
import { Tabs } from '../components/Tabs'
import { type TabItem } from '../components/Tabs/Tabs.types'
import { SelectMenu } from '../components/SelectMenu'

const viewTabs: TabItem[] = [
  { id: 'month', label: 'Month' },
  { id: 'week', label: 'Week' },
  { id: 'day', label: 'Day' },
]

const locationOptions = [
  { value: 'all', label: 'All Locations' },
  { value: 'royal', label: 'Royal Construction' },
  { value: 'summit', label: 'Summit Roofing' },
  { value: 'apex', label: 'Apex Exteriors' },
]

function formatDateRange(date: Date, view: string): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }

  if (view === 'day') {
    return date.toLocaleDateString('en-US', opts)
  }

  if (view === 'month') {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const start = new Date(date)
  start.setDate(start.getDate() - start.getDay())
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return `${start.toLocaleDateString('en-US', opts)} - ${end.toLocaleDateString('en-US', opts)}`
}

interface SchedulerHeaderProps {
  panelPosition: 'sidebar' | 'bottom'
  onPanelPositionChange: (position: 'sidebar' | 'bottom') => void
  activeView: string
  onViewChange: (view: string) => void
  currentDate: Date
  onDateChange: (date: Date) => void
  slotWidth: number
  slotRange: [number, number]
  onSlotWidthChange: (value: number) => void
}

export default function SchedulerHeader({
  panelPosition, onPanelPositionChange,
  activeView, onViewChange, currentDate, onDateChange,
  slotWidth, slotRange, onSlotWidthChange,
}: SchedulerHeaderProps) {
  const [location, setLocation] = useState<string | string[]>('royal')
  const [actionsOpen, setActionsOpen] = useState(false)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!actionsOpen) return
    const onOutside = (e: MouseEvent) => {
      if (!actionsRef.current?.contains(e.target as Node)) setActionsOpen(false)
    }
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActionsOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('keydown', onEscape)
    }
  }, [actionsOpen])

  const navigateDate = (direction: -1 | 1) => {
    const next = new Date(currentDate)
    if (activeView === 'day') next.setDate(next.getDate() + direction)
    else if (activeView === 'week') next.setDate(next.getDate() + 7 * direction)
    else next.setMonth(next.getMonth() + direction)
    onDateChange(next)
  }

  const goToToday = () => onDateChange(new Date())

  const isToday = (() => {
    const now = new Date()
    const a = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    const b = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    if (activeView === 'day') return a.getTime() === b.getTime()
    if (activeView === 'week') {
      const weekStart = new Date(a)
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)
      return b >= weekStart && b <= weekEnd
    }
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
  })()

  return (
    <div
      className="flex items-center gap-4 px-4 py-2"
      style={{
        background: 'var(--accu-gray-2)',
        minHeight: 48,
      }}
    >
      {/* Today + Date Navigation */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={goToToday}
          disabled={isToday}
          className="h-[35px] !bg-[var(--accu-white)] !px-3 !py-1.5 !text-[13px]"
        >
          Today
        </Button>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => navigateDate(-1)}
            className="flex h-7 w-7 items-center justify-center rounded-[var(--accu-radius-sm)] text-[var(--accu-gray-5)] hover:bg-[var(--accu-gray-1)] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span
            className="accu-text-body-md font-medium select-none"
            style={{ color: 'var(--accu-gray-6)', minWidth: 180, textAlign: 'center' }}
          >
            {formatDateRange(currentDate, activeView)}
          </span>
          <button
            type="button"
            onClick={() => navigateDate(1)}
            className="flex h-7 w-7 items-center justify-center rounded-[var(--accu-radius-sm)] text-[var(--accu-gray-5)] hover:bg-[var(--accu-gray-1)] transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* View Mode Pills */}
      <Tabs
        items={viewTabs}
        activeId={activeView}
        onChange={onViewChange}
        variant="pill"
      />

      {/* Zoom Slider */}
      <div className="flex items-center gap-1.5">
        <ZoomOut className="h-3.5 w-3.5 text-[var(--accu-gray-4)]" />
        <input
          type="range"
          min={slotRange[0]}
          max={slotRange[1]}
          value={slotWidth}
          onChange={(e) => onSlotWidthChange(Number(e.target.value))}
          className="scheduler-zoom-slider"
          style={{ width: 100 }}
        />
        <ZoomIn className="h-3.5 w-3.5 text-[var(--accu-gray-4)]" />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Location Dropdown */}
      <SelectMenu
        options={locationOptions}
        value={location}
        onChange={setLocation}
        label="Location"
        placeholder="Select location"
        className="!max-w-[200px]"
      />

      {/* Actions Dropdown */}
      <div ref={actionsRef} className="relative">
        <Button
          variant="default"
          onClick={() => setActionsOpen((prev) => !prev)}
          iconRight={<ChevronDown />}
          className="h-[35px] !px-3 !py-1.5"
        >
          Actions
        </Button>
        {actionsOpen && (
          <div
            className="absolute right-0 top-[calc(100%+4px)] z-30 min-w-[220px] overflow-hidden rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] shadow-[var(--accu-shadow-lg)]"
          >
            <button
              type="button"
              className="flex w-full items-center gap-2 px-3 py-2 text-left accu-text-body-md font-normal text-[var(--accu-primary-blue)] hover:bg-[var(--accu-light-blue)]"
              onClick={() => {
                onPanelPositionChange(panelPosition === 'sidebar' ? 'bottom' : 'sidebar')
                setActionsOpen(false)
              }}
            >
              {panelPosition === 'sidebar'
                ? <><PanelBottom className="h-5 w-5" /> Switch to Bottom View</>
                : <><LayoutPanelLeft className="h-5 w-5" /> Switch to Sidebar View</>
              }
            </button>
          </div>
        )}
      </div>

      {/* Filters Button */}
      <Button variant="default" className="h-[35px] !px-3 !py-1.5">
        Filters
      </Button>
    </div>
  )
}
