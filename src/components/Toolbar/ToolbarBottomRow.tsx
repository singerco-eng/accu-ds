import { useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { ToolbarButton } from './ToolbarButton'
import { type ToolbarNavItem } from './Toolbar.types'
import { SearchIcon, CircleHelpIcon } from './ToolbarIcons'

interface ToolbarBottomRowProps {
  navItems: ToolbarNavItem[]
  activeNavItem?: string
  onNavItemClick?: (key: string) => void
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  onHelpClick?: () => void
}

export function ToolbarBottomRow({
  navItems,
  activeNavItem,
  onNavItemClick,
  searchPlaceholder = 'Job #, Customer Name or Address',
  onSearch,
  onHelpClick,
}: ToolbarBottomRowProps) {
  const [searchValue, setSearchValue] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(searchValue)
      }
    },
    [onSearch, searchValue],
  )

  return (
    <div className="relative bg-[var(--accu-primary-blue)]">
      <div className="flex h-[45px] w-full items-center">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="flex lg:hidden items-center justify-center h-[45px] w-11 text-white hover:bg-white/10 cursor-pointer"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Desktop nav items (Left frame) */}
        <div className="hidden lg:flex items-center h-full shrink-0">
          {navItems.map((item) => (
            <ToolbarButton
              key={item.key}
              label={item.label}
              icon={item.icon}
              variant={item.variant}
              active={activeNavItem === item.key}
              onClick={() => onNavItemClick?.(item.key)}
            />
          ))}
        </div>

        {/* Mobile spacer */}
        <div className="flex-1 lg:hidden" />

        {/* Desktop Right frame: search + help (right-aligned) */}
        <div className="hidden lg:flex items-center h-full ml-auto shrink-0">
          <div
            className="flex items-center justify-between h-full bg-[#F0F0F0]"
            style={{ padding: '4px 8px', width: '360px' }}
          >
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder={searchPlaceholder}
              className="bg-transparent text-[#9D9D9D] placeholder-[#9D9D9D] font-normal h-full flex-1 outline-none"
              style={{ fontSize: '14px', lineHeight: '18px' }}
            />
            <SearchIcon size={24} className="text-[var(--accu-primary-blue)] shrink-0 ml-[11px]" />
          </div>
          <ToolbarButton
            label="Help"
            icon={<CircleHelpIcon size={18} />}
            variant="accent"
            onClick={onHelpClick}
            className="shrink-0"
          />
        </div>

        {/* Mobile/tablet search icon */}
        <button
          type="button"
          onClick={() => onSearch?.('')}
          aria-label="Search"
          className="flex lg:hidden items-center justify-center h-[45px] w-10 text-white hover:bg-white/10 cursor-pointer"
        >
          <SearchIcon size={18} />
        </button>

        {/* Mobile help button */}
        <div className="lg:hidden">
          <ToolbarButton
            label="Help"
            icon={<CircleHelpIcon size={18} />}
            variant="accent"
            onClick={onHelpClick}
          />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[45px] left-0 w-full bg-[var(--accu-primary-blue)] shadow-lg z-50 lg:hidden">
          <div className="flex flex-col py-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onNavItemClick?.(item.key)
                  setMobileMenuOpen(false)
                }}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-white accu-text-body-md font-normal transition-colors cursor-pointer',
                  item.variant === 'accent'
                    ? 'bg-[var(--accu-logo-orange)]'
                    : activeNavItem === item.key
                      ? 'bg-white/15'
                      : 'hover:bg-white/10',
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile search within menu */}
          <div className="flex items-center bg-[#F0F0F0] mx-4 mb-3 h-[36px] px-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder={searchPlaceholder}
              className="bg-transparent text-[#9D9D9D] placeholder-[#9D9D9D] font-normal px-2 h-full w-full outline-none"
              style={{ fontSize: '14px', lineHeight: '18px' }}
            />
            <SearchIcon size={24} className="text-[var(--accu-primary-blue)] shrink-0" />
          </div>
        </div>
      )}
    </div>
  )
}
