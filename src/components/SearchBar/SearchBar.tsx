import { Search, X } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { type SearchBarProps } from './SearchBar.types'

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  { value, onChange, placeholder = 'Search', variant = 'default', onSearch, className },
  ref,
) {
  const [focused, setFocused] = useState(false)
  const isHeader = variant === 'header'

  return (
    <label
      className={cn(
        'inline-flex items-center bg-[var(--accu-gray-0)]',
        focused && !isHeader && 'bg-[var(--accu-input-bg)] shadow-[var(--accu-focus-ring)]',
        className,
      )}
      style={{
        width: isHeader ? 'var(--accu-search-header-width)' : 'var(--accu-search-filter-width)',
        height: isHeader ? 'var(--accu-search-header-height)' : 'var(--accu-search-filter-height)',
        paddingLeft: '10px',
        paddingRight: '8px',
      }}
    >
      {isHeader ? <Search className="h-5 w-5 text-[var(--accu-gray-4)]" /> : null}

      <input
        ref={ref}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => onChange(event.currentTarget.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSearch?.(value)
        }}
        className="ml-[var(--accu-space-2)] w-full flex-1 bg-transparent accu-text-body-md font-normal text-[var(--accu-gray-6)] outline-none"
        placeholder={placeholder}
      />

      {!isHeader ? <Search className="h-6 w-6 text-[var(--accu-gray-4)]" /> : null}

      {value.length > 0 ? (
        <button
          type="button"
          className="ml-[var(--accu-space-1)] rounded-[var(--accu-radius-sm)] p-[var(--accu-space-1)] text-[var(--accu-gray-4)] hover:bg-[var(--accu-gray-1)]"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </label>
  )
})
