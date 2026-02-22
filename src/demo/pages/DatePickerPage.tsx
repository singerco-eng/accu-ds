import { useState } from 'react'
import { DatePicker } from '../../components/DatePicker'

export default function DatePickerPage() {
  const [date, setDate] = useState<Date | null>(null)
  const [prefilled, setPrefilled] = useState<Date | null>(new Date())

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 accu-text-display-sm font-bold">Date Picker</h1>
        <p className="accu-text-body-md text-[var(--accu-gray-5)]">Date picker input and calendar grid aligned to the Figma day-cell states.</p>
      </div>

      <section className="grid gap-5 rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)] lg:grid-cols-2">
        <div>
          <h2 className="mb-3 accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Default</h2>
          <DatePicker value={date} onChange={setDate} label="Start Date" />
        </div>

        <div>
          <h2 className="mb-3 accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Pre-selected</h2>
          <DatePicker value={prefilled} onChange={setPrefilled} label="Inspection Date" />
        </div>

        <div>
          <h2 className="mb-3 accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Required</h2>
          <DatePicker value={null} onChange={() => {}} label="Required Date" required />
        </div>

        <div>
          <h2 className="mb-3 accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Disabled</h2>
          <DatePicker value={new Date()} onChange={() => {}} label="Disabled Date" disabled />
        </div>
      </section>
    </div>
  )
}
