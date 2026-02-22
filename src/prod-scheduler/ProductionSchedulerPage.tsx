import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '../lib/utils'
import { Toolbar } from '../components/Toolbar'
import { type ToolbarNavItem } from '../components/Toolbar/Toolbar.types'
import {
  CircleAddIcon,
  CircleArrowLeftIcon,
  DashboardIcon,
  DirectoryIcon,
  PersonIcon,
  HammerIcon,
  PhotosIcon,
  PawPrintIcon,
  PlusIcon,
  CalendarIcon,
  ToolsIcon,
} from '../components/Toolbar/ToolbarIcons'
import SchedulerHeader from './SchedulerHeader'
import SchedulingPanel, { type PanelScope, type GroupByField, type FilterState, type ViewMode } from './SchedulingPanel'
import { DEFAULT_FILTERS } from './FilterDrawer'
import SchedulerCalendar, { type SchedulerCalendarHandle, VIEW_MAP } from './SchedulerCalendar'

const navItems: ToolbarNavItem[] = [
  { key: 'new', label: 'New', icon: <CircleAddIcon size={18} />, variant: 'accent' },
  { key: 'recent', label: 'Recent', icon: <CircleArrowLeftIcon size={18} />, variant: 'accent' },
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon size={18} /> },
  { key: 'contacts', label: 'Contacts', icon: <DirectoryIcon size={18} /> },
  { key: 'leads', label: 'Leads', icon: <PersonIcon size={18} /> },
  { key: 'jobs', label: 'Jobs', icon: <HammerIcon size={18} /> },
  { key: 'photos', label: 'Photos', icon: <PhotosIcon size={18} /> },
  { key: 'track', label: 'Track', icon: <PawPrintIcon size={18} /> },
  { key: 'reports', label: 'ReportsPlus', icon: <PlusIcon size={18} /> },
  { key: 'production', label: 'Production', icon: <CalendarIcon size={18} /> },
  { key: 'tools', label: 'Tools', icon: <ToolsIcon size={18} /> },
]

export default function ProductionSchedulerPage() {
  const [activeNav, setActiveNav] = useState('production')
  const [panelPosition, setPanelPosition] = useState<'sidebar' | 'bottom'>('sidebar')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [bottomHeight, setBottomHeight] = useState(300)

  const [calendarView, setCalendarView] = useState('week')
  const [calendarDate, setCalendarDate] = useState(() => new Date())
  const calendarRef = useRef<SchedulerCalendarHandle>(null)

  const SLOT_DEFAULTS: Record<string, number> = { week: 80, day: 50, month: 30 }
  const SLOT_RANGES: Record<string, [number, number]> = { week: [40, 200], day: [25, 120], month: [12, 80] }
  const [slotWidths, setSlotWidths] = useState<Record<string, number>>(SLOT_DEFAULTS)

  const currentSlotWidth = slotWidths[calendarView] ?? SLOT_DEFAULTS[calendarView] ?? 80
  const currentSlotRange = SLOT_RANGES[calendarView] ?? [20, 200]
  const handleSlotWidthChange = useCallback((value: number) => {
    setSlotWidths((prev) => ({ ...prev, [calendarView]: value }))
  }, [calendarView])

  const [scope, setScope] = useState<PanelScope>('to-be-scheduled')
  const [groupBy, setGroupBy] = useState<GroupByField>('trade')
  const [viewMode, setViewMode] = useState<ViewMode>('card')
  const [searchQuery, setSearchQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const panelProps = {
    scope,
    onScopeChange: setScope,
    groupBy,
    onGroupByChange: setGroupBy,
    viewMode,
    onViewModeChange: setViewMode,
    searchQuery,
    onSearchChange: setSearchQuery,
    filtersOpen,
    onToggleFilters: () => setFiltersOpen((prev) => !prev),
    filters,
    onFiltersChange: setFilters,
  }
  const dragging = useRef(false)
  const suppressDateSync = useRef(false)

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev)

  useEffect(() => {
    const api = calendarRef.current?.getApi()
    if (!api) return
    const fcView = VIEW_MAP[calendarView] ?? 'resourceTimelineWeek'
    suppressDateSync.current = true
    if (api.view.type !== fcView) api.changeView(fcView)
    api.gotoDate(calendarDate)
    requestAnimationFrame(() => {
      suppressDateSync.current = false
    })
  }, [calendarView, calendarDate])

  const handleDateRangeChange = useCallback((centerDate: Date) => {
    if (suppressDateSync.current) return
    setCalendarDate(centerDate)
  }, [])

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    const startY = e.clientY
    const startH = bottomHeight

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return
      const delta = startY - ev.clientY
      const newH = Math.min(Math.max(startH + delta, 150), 600)
      setBottomHeight(newH)
    }
    const onUp = () => {
      dragging.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    document.body.style.cursor = 'row-resize'
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [bottomHeight])

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--accu-gray-bg)' }}>
      <Toolbar
        companyName="AccuLynx Roofing"
        officeName="Chicago Office"
        userName="John Smith"
        navItems={navItems}
        activeNavItem={activeNav}
        onNavItemClick={setActiveNav}
        notifications={{
          releaseNotes: true,
          tasks: 3,
          calendar: 1,
          notifications: 12,
          atMe: 2,
        }}
        searchPlaceholder="Search jobs, contacts..."
        onSearch={(q) => console.log('Search:', q)}
        onHelpClick={() => console.log('Help')}
        onLocationClick={() => console.log('Location')}
        onUserClick={() => console.log('User')}
        onSettingsClick={() => console.log('Settings')}
        onReleaseNotesClick={() => console.log('Release notes')}
      />

      {!isFullscreen && (
        <SchedulerHeader
          panelPosition={panelPosition}
          onPanelPositionChange={setPanelPosition}
          activeView={calendarView}
          onViewChange={setCalendarView}
          currentDate={calendarDate}
          onDateChange={setCalendarDate}
          slotWidth={currentSlotWidth}
          slotRange={currentSlotRange}
          onSlotWidthChange={handleSlotWidthChange}
        />
      )}

      {isFullscreen ? (
        <div className="flex-1 min-h-0 flex">
          <SchedulingPanel
            position="sidebar"
            isFullscreen
            onToggleFullscreen={toggleFullscreen}
            {...panelProps}
          />
        </div>
      ) : (
        <div
          className={cn(
            'flex-1 min-h-0 flex',
            panelPosition === 'bottom' ? 'flex-col' : 'flex-row',
          )}
        >
          {panelPosition === 'sidebar' && (
            <SchedulingPanel
              position="sidebar"
              isFullscreen={false}
              onToggleFullscreen={toggleFullscreen}
              {...panelProps}
            />
          )}

          <main className="flex-1 min-w-0 min-h-0 overflow-hidden">
            <SchedulerCalendar
              ref={calendarRef}
              view={calendarView}
              date={calendarDate}
              slotMinWidth={currentSlotWidth}
              onDateRangeChange={handleDateRangeChange}
            />
          </main>

          {panelPosition === 'bottom' && (
            <>
              <div
                className="shrink-0 cursor-row-resize flex items-center justify-center hover:bg-[var(--accu-gray-1)] transition-colors"
                style={{ height: 6, background: 'var(--accu-gray-0)', borderTop: '1px solid var(--accu-gray-2)' }}
                onMouseDown={onResizeStart}
              >
                <div className="rounded-full" style={{ width: 32, height: 3, background: 'var(--accu-gray-3)' }} />
              </div>
              <div style={{ height: bottomHeight }} className="shrink-0">
                <SchedulingPanel
                  position="bottom"
                  isFullscreen={false}
                  onToggleFullscreen={toggleFullscreen}
                  {...panelProps}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
