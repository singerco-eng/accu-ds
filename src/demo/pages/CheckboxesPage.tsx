import { useState } from 'react'
import { Checkbox } from '../../components/Checkbox'

function InteractiveCheckbox({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return <Checkbox label={label} checked={checked} onChange={(e) => setChecked(e.currentTarget.checked)} />
}

function InteractiveIndeterminate() {
  const [items, setItems] = useState([true, false, true])
  const allChecked = items.every(Boolean)
  const noneChecked = items.every((v) => !v)

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        label="Select All (indeterminate demo)"
        checked={allChecked}
        indeterminate={!allChecked && !noneChecked}
        onChange={() => setItems(allChecked ? [false, false, false] : [true, true, true])}
      />
      <div className="ml-6 flex flex-col gap-2">
        {['Item A', 'Item B', 'Item C'].map((name, i) => (
          <Checkbox
            key={name}
            label={name}
            checked={items[i]}
            onChange={(e) => {
              const next = [...items]
              next[i] = e.currentTarget.checked
              setItems(next)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function CheckboxesPage() {
  return (
    <div>
      <h1 className="text-display-sm font-bold mb-6">Checkboxes</h1>

      <section className="mb-8">
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Interactive
        </h2>
        <div className="flex flex-col gap-3">
          <InteractiveCheckbox label="Click to toggle" />
          <InteractiveCheckbox label="Starts checked" defaultChecked />
        </div>
      </section>

      <section className="mb-8">
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Indeterminate / Select All
        </h2>
        <InteractiveIndeterminate />
      </section>

      <section className="mb-8">
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Disabled States
        </h2>
        <div className="flex flex-col gap-3">
          <Checkbox label="Checked / Disabled" checked disabled onChange={() => {}} />
          <Checkbox label="Unchecked / Disabled" disabled />
          <Checkbox label="Indeterminate / Disabled" indeterminate disabled onChange={() => {}} />
        </div>
      </section>
    </div>
  )
}
