import { useState } from 'react'
import { ColorPicker } from '../../components/ColorPicker'

export default function ColorPickerPage() {
  const [swatchValue, setSwatchValue] = useState('#A32C25')
  const [customValue, setCustomValue] = useState('#4C8CCC')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 accu-text-display-sm font-bold">Color Picker</h1>
        <p className="accu-text-body-md text-[var(--accu-gray-5)]">
          252×50 trigger with color rectangle, dropdown swatch grid (6 cols, 30 colors), and custom HSV picker mode.
        </p>
      </div>

      <section className="grid gap-8 rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)] lg:grid-cols-2">
        <div>
          <h2 className="mb-3 accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Default (30 Swatches)</h2>
          <ColorPicker value={swatchValue} onChange={setSwatchValue} />
          <p className="mt-2 accu-text-body-sm text-[var(--accu-gray-5)]">
            Selected: <span className="font-bold">{swatchValue}</span>
          </p>
        </div>

        <div>
          <h2 className="mb-3 accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Custom Color Mode</h2>
          <p className="mb-2 accu-text-body-sm text-[var(--accu-gray-5)]">
            Click "Create Custom Color" to open the HSV spectrum picker.
          </p>
          <ColorPicker value={customValue} onChange={setCustomValue} />
          <p className="mt-2 accu-text-body-sm text-[var(--accu-gray-5)]">
            Selected: <span className="font-bold">{customValue}</span>
          </p>
        </div>
      </section>
    </div>
  )
}
