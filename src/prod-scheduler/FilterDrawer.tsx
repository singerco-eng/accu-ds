import { X } from 'lucide-react'
import { cn } from '../lib/utils'
import { SelectMenu } from '../components/SelectMenu'
import { Tabs } from '../components/Tabs'
import { Button } from '../components/Button'
import { TRADES, type AgeFilter, type Criteria, type EventType, type WodPhase, type AwcPhase } from './data/mock-orders'

export interface FilterState {
  trades: string[]
  age: AgeFilter
  hasMoney: 'any' | 'yes' | 'no'
  criteria: Criteria | 'any'
  eventType: EventType | 'any'
  wodPhase: WodPhase
  awcPhase: AwcPhase
}

export const DEFAULT_FILTERS: FilterState = {
  trades: [],
  age: 'any',
  hasMoney: 'any',
  criteria: 'any',
  eventType: 'any',
  wodPhase: 'any',
  awcPhase: 'any',
}

export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.trades.length > 0 ||
    filters.age !== 'any' ||
    filters.hasMoney !== 'any' ||
    filters.criteria !== 'any' ||
    filters.eventType !== 'any' ||
    filters.wodPhase !== 'any' ||
    filters.awcPhase !== 'any'
  )
}

const WOD_PHASE_LABEL: Record<WodPhase, string> = {
  any: 'Any',
  waiting: 'Waiting',
  ordered: 'Ordered',
  delivered: 'Delivered',
}

const AWC_PHASE_LABEL: Record<AwcPhase, string> = {
  any: 'Any',
  assigned: 'Assigned',
  working: 'Working',
  completed: 'Completed',
  'no-labor': 'No Labor',
}

export function getFilterChips(filters: FilterState): { key: string; label: string }[] {
  const chips: { key: string; label: string }[] = []
  if (filters.trades.length > 0) {
    chips.push({ key: 'trades', label: `Trade: ${filters.trades.join(', ')}` })
  }
  if (filters.age !== 'any') {
    chips.push({ key: 'age', label: `Age: ${filters.age}` })
  }
  if (filters.hasMoney !== 'any') {
    chips.push({ key: 'hasMoney', label: `Has $: ${filters.hasMoney}` })
  }
  if (filters.criteria !== 'any') {
    chips.push({ key: 'criteria', label: `Flag: ${filters.criteria}` })
  }
  if (filters.eventType !== 'any') {
    const etLabels: Record<EventType, string> = { 'material-and-labor': 'Mat & Labor', 'material-only': 'Material Only', 'labor-only': 'Labor Only' }
    chips.push({ key: 'eventType', label: `Type: ${etLabels[filters.eventType]}` })
  }
  if (filters.wodPhase !== 'any') {
    chips.push({ key: 'wodPhase', label: `WOD: ${WOD_PHASE_LABEL[filters.wodPhase]}` })
  }
  if (filters.awcPhase !== 'any') {
    chips.push({ key: 'awcPhase', label: `AWC: ${AWC_PHASE_LABEL[filters.awcPhase]}` })
  }
  return chips
}

interface FilterDrawerProps {
  open: boolean
  filters: FilterState
  onChange: (filters: FilterState) => void
}

interface FilterChipsProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  drawerOpen: boolean
}

const tradeOptions = TRADES.map((t) => ({ value: t, label: t }))

const eventTypeItems = [
  { id: 'any', label: 'Any' },
  { id: 'material-and-labor', label: 'Mat & Lab' },
  { id: 'material-only', label: 'Material' },
  { id: 'labor-only', label: 'Labor' },
]

const ageItems = [
  { id: 'any', label: 'Any' },
  { id: '0-7', label: '0-7d' },
  { id: '8-14', label: '8-14d' },
  { id: '15-30', label: '15-30d' },
  { id: '30+', label: '30+' },
]

const moneyItems = [
  { id: 'any', label: 'Any' },
  { id: 'yes', label: 'Yes' },
  { id: 'no', label: 'No' },
]

const criteriaItems = [
  { id: 'any', label: 'Any' },
  { id: 'rush', label: 'Rush' },
  { id: 'hold', label: 'Hold' },
  { id: 'special', label: 'Special' },
]

const wodPhaseItems = [
  { id: 'any', label: 'Any' },
  { id: 'waiting', label: 'Waiting' },
  { id: 'ordered', label: 'Ordered' },
  { id: 'delivered', label: 'Delivered' },
]

const awcPhaseItems = [
  { id: 'any', label: 'Any' },
  { id: 'assigned', label: 'Assigned' },
  { id: 'working', label: 'Working' },
  { id: 'completed', label: 'Completed' },
]

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 font-bold text-[var(--accu-gray-5)]" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', width: 42 }}>
      {children}
    </span>
  )
}

export function FilterChips({ filters, onChange, drawerOpen }: FilterChipsProps) {
  const chips = getFilterChips(filters)
  if (chips.length === 0 || drawerOpen) return null

  return (
    <div className="flex flex-wrap gap-1 px-2 py-1.5" style={{ borderBottom: '1px solid var(--accu-gray-1)' }}>
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1 px-1.5 py-0.5 text-white"
          style={{ fontSize: '10px', background: 'var(--accu-primary-blue)' }}
        >
          {chip.label}
          <button
            type="button"
            onClick={() => {
              if (chip.key === 'trades') onChange({ ...filters, trades: [] })
              else if (chip.key === 'age') onChange({ ...filters, age: 'any' })
              else if (chip.key === 'hasMoney') onChange({ ...filters, hasMoney: 'any' })
              else if (chip.key === 'criteria') onChange({ ...filters, criteria: 'any' })
              else if (chip.key === 'eventType') onChange({ ...filters, eventType: 'any' })
              else if (chip.key === 'wodPhase') onChange({ ...filters, wodPhase: 'any' })
              else if (chip.key === 'awcPhase') onChange({ ...filters, awcPhase: 'any' })
            }}
            className="inline-flex h-3 w-3 items-center justify-center rounded-full hover:bg-white/20"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
    </div>
  )
}

export default function FilterDrawer({ open, filters, onChange }: FilterDrawerProps) {
  const update = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch })

  return (
    <div
      className={cn(
        'grid transition-[grid-template-rows] duration-200 ease-out',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] overflow-hidden',
      )}
    >
      <div className="min-h-0">
        <div className="flex flex-col gap-2 px-3 py-2.5" style={{ borderBottom: '1px solid var(--accu-gray-1)', background: 'var(--accu-gray-0)' }}>
          {/* Trade (multi-select dropdown) */}
          <div className="flex items-center gap-2">
            <FilterLabel>Trade</FilterLabel>
            <SelectMenu
              size="sm"
              multiple
              options={tradeOptions}
              value={filters.trades}
              onChange={(val) => update({ trades: Array.isArray(val) ? val : [] })}
              placeholder="All Trades"
              className="!max-w-none flex-1"
            />
          </div>

          {/* Event Type pills */}
          <div className="flex items-center gap-2">
            <FilterLabel>Type</FilterLabel>
            <Tabs
              variant="pill"
              size="sm"
              colorScheme="neutral"
              items={eventTypeItems}
              activeId={filters.eventType}
              onChange={(id) => update({ eventType: id as EventType | 'any' })}
            />
          </div>

          {/* Age pills */}
          <div className="flex items-center gap-2">
            <FilterLabel>Age</FilterLabel>
            <Tabs
              variant="pill"
              size="sm"
              colorScheme="neutral"
              items={ageItems}
              activeId={filters.age}
              onChange={(id) => update({ age: id as AgeFilter })}
            />
          </div>

          {/* Has $ pills */}
          <div className="flex items-center gap-2">
            <FilterLabel>Has $</FilterLabel>
            <Tabs
              variant="pill"
              size="sm"
              colorScheme="neutral"
              items={moneyItems}
              activeId={filters.hasMoney}
              onChange={(id) => update({ hasMoney: id as 'any' | 'yes' | 'no' })}
            />
          </div>

          {/* Flag pills */}
          <div className="flex items-center gap-2">
            <FilterLabel>Flag</FilterLabel>
            <Tabs
              variant="pill"
              size="sm"
              colorScheme="neutral"
              items={criteriaItems}
              activeId={filters.criteria}
              onChange={(id) => update({ criteria: id as Criteria | 'any' })}
            />
          </div>

          {/* WOD pills */}
          <div className="flex items-center gap-2">
            <FilterLabel>WOD</FilterLabel>
            <Tabs
              variant="pill"
              size="sm"
              colorScheme="neutral"
              items={wodPhaseItems}
              activeId={filters.wodPhase}
              onChange={(id) => update({ wodPhase: id as WodPhase })}
            />
          </div>

          {/* AWC pills */}
          <div className="flex items-center gap-2">
            <FilterLabel>AWC</FilterLabel>
            <Tabs
              variant="pill"
              size="sm"
              colorScheme="neutral"
              items={awcPhaseItems}
              activeId={filters.awcPhase}
              onChange={(id) => update({ awcPhase: id as AwcPhase })}
            />
          </div>

          {/* Clear All */}
          {hasActiveFilters(filters) && (
            <div className="flex justify-end">
              <Button variant="text" size="sm" onClick={() => onChange({ ...DEFAULT_FILTERS })}>
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
