import { useState } from 'react'
import { Toggle } from '../../components/Toggle'

function InteractiveToggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return <Toggle label={label} checked={checked} onCheckedChange={setChecked} />
}

export default function TogglesPage() {
  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Toggles</h1>

      <section className="mb-8">
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Interactive
        </h2>
        <div className="flex flex-col gap-3">
          <InteractiveToggle label="Click to toggle (starts off)" />
          <InteractiveToggle label="Click to toggle (starts on)" defaultChecked />
        </div>
      </section>

      <section>
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Disabled States
        </h2>
        <div className="flex flex-col gap-3">
          <Toggle label="On / Disabled" checked disabled onChange={() => {}} />
          <Toggle label="Off / Disabled" disabled />
        </div>
      </section>
    </div>
  )
}
