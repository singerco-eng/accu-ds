import { useState } from 'react'
import { SelectMenu } from '../../components/SelectMenu'

const options = [
  { value: 'roof', label: 'Roof Inspection' },
  { value: 'siding', label: 'Siding' },
  { value: 'gutters', label: 'Gutters' },
  { value: 'windows', label: 'Windows' },
  { value: 'fence', label: 'Fence', disabled: true },
]

export default function SelectMenusPage() {
  const [singleValue, setSingleValue] = useState<string>('')
  const [multiValue, setMultiValue] = useState<string[]>(['roof'])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-display-sm font-bold">Select Menus</h1>
        <p className="text-body-md text-[var(--accu-gray-5)]">Dropdown menus with single, multi-select, searchable, required, and error states.</p>
      </div>

      <section className="grid gap-5 rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)] lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Single Select</h2>
          <SelectMenu
            label="Service Type"
            options={options}
            value={singleValue}
            onChange={(next) => {
              if (typeof next === 'string') setSingleValue(next)
            }}
          />
        </div>

        <div>
          <h2 className="mb-3 text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Multi Select + Search</h2>
          <SelectMenu
            label="Work Items"
            options={options}
            value={multiValue}
            onChange={(next) => {
              if (Array.isArray(next)) setMultiValue(next)
            }}
            multiple
            searchable
          />
        </div>

        <div>
          <h2 className="mb-3 text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Required</h2>
          <SelectMenu label="Required Field" options={options} value="" onChange={() => {}} required />
        </div>

        <div>
          <h2 className="mb-3 text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Error</h2>
          <SelectMenu label="Selection Error" options={options} value="" onChange={() => {}} error="Please choose an option." />
        </div>
      </section>
    </div>
  )
}
