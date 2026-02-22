import { useState } from 'react'
import { SearchBar } from '../../components/SearchBar'

export default function SearchBarsPage() {
  const [filterValue, setFilterValue] = useState('')
  const [headerValue, setHeaderValue] = useState('')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 accu-text-display-sm font-bold">Search Bars</h1>
        <p className="accu-text-body-md text-[var(--accu-gray-5)]">Filter and header search bar states from Figma primitives.</p>
      </div>

      <section className="space-y-4 rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Filter Search Bar</h2>
        <SearchBar
          value={filterValue}
          onChange={setFilterValue}
          placeholder="Search jobs..."
        />
      </section>

      <section className="space-y-4 rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Header Search Bar</h2>
        <SearchBar
          value={headerValue}
          onChange={setHeaderValue}
          placeholder="Search..."
          variant="header"
        />
      </section>
    </div>
  )
}
