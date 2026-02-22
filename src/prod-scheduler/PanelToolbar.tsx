import { Search, SlidersHorizontal } from 'lucide-react'
import { TextInput } from '../components/TextInput'
import { Button } from '../components/Button'

interface PanelToolbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  filtersOpen: boolean
  onToggleFilters: () => void
  hasActiveFilters: boolean
  isFullscreen?: boolean
  position?: 'sidebar' | 'bottom'
}

export default function PanelToolbar({
  searchQuery,
  onSearchChange,
  filtersOpen,
  onToggleFilters,
  hasActiveFilters,
  isFullscreen,
  position,
}: PanelToolbarProps) {
  const isWide = isFullscreen || position === 'bottom'

  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1"
      style={{ background: 'var(--accu-gray-0)', borderBottom: '1px solid var(--accu-gray-1)' }}
    >
      {isWide && <div className="flex-1" />}

      <div className="min-w-0" style={{ width: isWide ? 280 : undefined, flex: isWide ? undefined : '1 1 0%' }}>
        <TextInput
          size="sm"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          rightAdornment={<Search />}
        />
      </div>

      <div className="relative shrink-0">
        <Button
          size="sm"
          variant="outline"
          iconOnly
          iconLeft={<SlidersHorizontal />}
          onClick={onToggleFilters}
          className={filtersOpen ? '!bg-[var(--accu-light-blue)]' : '!bg-[var(--accu-white)]'}
        />
        {hasActiveFilters && !filtersOpen && (
          <span
            className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full"
            style={{ background: 'var(--accu-primary-blue)' }}
          />
        )}
      </div>
    </div>
  )
}
