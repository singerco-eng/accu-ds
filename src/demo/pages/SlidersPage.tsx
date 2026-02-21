import { useState } from 'react'
import { Slider } from '../../components/Slider'

export default function SlidersPage() {
  const [percentage, setPercentage] = useState(50)
  const [budget, setBudget] = useState(2500)

  return (
    <div>
      <h1 className="text-display-sm font-bold mb-6">Sliders</h1>
      <div className="grid gap-8">
        <section>
          <h2 className="text-display-sm font-bold mb-3">Label Top (Percentage)</h2>
          <Slider
            label="Completion"
            value={percentage}
            onChange={setPercentage}
            labelPosition="top"
            showValue
            formatValue={(value) => `${value}%`}
          />
        </section>

        <section>
          <h2 className="text-display-sm font-bold mb-3">Label Left (Currency)</h2>
          <Slider
            label="Budget"
            min={0}
            max={5000}
            value={budget}
            onChange={setBudget}
            labelPosition="left"
            showValue
            formatValue={(value) => `$${value}`}
          />
        </section>

        <section>
          <h2 className="text-display-sm font-bold mb-3">Disabled</h2>
          <Slider
            label="Disabled Slider"
            value={70}
            onChange={() => undefined}
            labelPosition="top"
            showValue
            formatValue={(value) => `${value}%`}
            disabled
          />
        </section>
      </div>
    </div>
  )
}
