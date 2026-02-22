import { useState } from 'react'
import { RadioButton } from '../../components/RadioButton'

export default function RadioButtonsPage() {
  const [selected, setSelected] = useState('option-1')

  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Radio Buttons</h1>

      <section className="mb-8">
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Interactive Group
        </h2>
        <div className="flex flex-col gap-3">
          {['option-1', 'option-2', 'option-3'].map((val, i) => (
            <RadioButton
              key={val}
              label={`Option ${i + 1}`}
              name="interactive-demo"
              value={val}
              checked={selected === val}
              onChange={() => setSelected(val)}
            />
          ))}
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
          <RadioButton label="Selected / Disabled" name="disabled-demo" checked disabled onChange={() => {}} />
          <RadioButton label="Unselected / Disabled" name="disabled-demo-2" disabled />
        </div>
      </section>
    </div>
  )
}
