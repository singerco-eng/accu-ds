import { useMemo } from 'react'
import { cn } from '../lib/utils'
import {
  mockOrders,
  filterByScope,
  filterBySearch,
  filterByTrade,
  filterByAge,
  filterByMoney,
  filterByCriteria,
  filterByEventType,
  filterByWodPhase,
  filterByAwcPhase,
  groupOrders,
  type PanelScope,
  type GroupByField,
} from './data/mock-orders'
import PanelHeader, { type ViewMode } from './PanelHeader'
import PanelToolbar from './PanelToolbar'
import FilterDrawer, {
  FilterChips,
  hasActiveFilters as checkActiveFilters,
  type FilterState,
} from './FilterDrawer'
import CardView from './CardView'
import ListView from './ListView'

export type { PanelScope, GroupByField, FilterState, ViewMode }

interface SchedulingPanelProps {
  position: 'sidebar' | 'bottom'
  isFullscreen: boolean
  onToggleFullscreen: () => void
  scope: PanelScope
  onScopeChange: (scope: PanelScope) => void
  groupBy: GroupByField
  onGroupByChange: (groupBy: GroupByField) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  filtersOpen: boolean
  onToggleFilters: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export default function SchedulingPanel({
  position, isFullscreen, onToggleFullscreen,
  scope, onScopeChange, groupBy, onGroupByChange,
  viewMode, onViewModeChange,
  searchQuery, onSearchChange,
  filtersOpen, onToggleFilters,
  filters, onFiltersChange,
}: SchedulingPanelProps) {
  const activeFilters = checkActiveFilters(filters)

  const filteredOrders = useMemo(() => {
    let orders = filterByScope(mockOrders, scope)
    orders = filterBySearch(orders, searchQuery)
    orders = filterByTrade(orders, filters.trades)
    orders = filterByAge(orders, filters.age)
    orders = filterByMoney(orders, filters.hasMoney)
    orders = filterByCriteria(orders, filters.criteria)
    orders = filterByEventType(orders, filters.eventType)
    orders = filterByWodPhase(orders, filters.wodPhase)
    orders = filterByAwcPhase(orders, filters.awcPhase)
    return orders
  }, [scope, searchQuery, filters])

  const groups = useMemo(() => groupOrders(filteredOrders, groupBy), [filteredOrders, groupBy])

  const isSidebar = position === 'sidebar' && !isFullscreen
  const showViewToggle = !isSidebar
  const effectiveViewMode: ViewMode = isSidebar ? 'card' : viewMode

  function renderContent() {
    if (effectiveViewMode === 'list') {
      return <ListView orders={filteredOrders} />
    }
    if (isFullscreen || position === 'bottom') {
      return <CardView groups={groups} layout="kanban" />
    }
    return <CardView groups={groups} layout="stack" />
  }

  return (
    <div
      className={cn(
        'flex flex-col bg-[var(--accu-white)]',
        isFullscreen
          ? 'w-full h-full'
          : position === 'sidebar'
            ? 'w-[380px] h-full shrink-0'
            : 'w-full h-full',
      )}
      style={isFullscreen ? undefined : {
        borderRight: position === 'sidebar' ? '1px solid var(--accu-gray-2)' : undefined,
      }}
    >
      <PanelHeader
        scope={scope}
        onScopeChange={onScopeChange}
        count={filteredOrders.length}
        groupBy={groupBy}
        onGroupByChange={onGroupByChange}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        showViewToggle={showViewToggle}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />

      <PanelToolbar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        filtersOpen={filtersOpen}
        onToggleFilters={onToggleFilters}
        hasActiveFilters={activeFilters}
        isFullscreen={isFullscreen}
        position={position}
      />

      <FilterDrawer
        open={filtersOpen}
        filters={filters}
        onChange={onFiltersChange}
      />

      <FilterChips
        filters={filters}
        onChange={onFiltersChange}
        drawerOpen={filtersOpen}
      />

      <div className="flex-1 min-h-0 overflow-auto">
        {renderContent()}
      </div>
    </div>
  )
}
