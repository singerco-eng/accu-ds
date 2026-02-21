### Slider

**Purpose**: A numeric range input that allows users to select a value by dragging a thumb along a track, with optional label and custom value formatting.

**Import**:
```tsx
import { Slider } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current value (required) |
| `onChange` | `(value: number) => void` | — | Called when value changes (required) |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `label` | `string` | — | Optional label text |
| `labelPosition` | `'top' \| 'left'` | `'top'` | Position of the label relative to the slider |
| `showValue` | `boolean` | `true` | Whether to display the current value above the thumb |
| `formatValue` | `(value: number) => string` | — | Custom formatter for the displayed value |
| `disabled` | `boolean` | — | Disables the slider |
| `className` | `string` | — | Additional CSS classes |

**Variants/Options**:
- **labelPosition**: `top` (label above) or `left` (label to the left)

**Usage Example**:
```tsx
// Basic slider
const [percent, setPercent] = useState(50)
<Slider value={percent} onChange={setPercent} />

// With label and custom range
<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={10}
  label="Volume"
  labelPosition="top"
/>

// Custom value formatting (e.g., currency, percentage)
<Slider
  value={budget}
  onChange={setBudget}
  min={0}
  max={100000}
  formatValue={(v) => `$${v.toLocaleString()}`}
/>
```

**Do/Don't**:
- Do: Use controlled state with `value` and `onChange`
- Do: Use `formatValue` for currency, percentages, or other custom displays
- Don't: Use uncontrolled mode—the component requires `value` and `onChange`
- Don't: Set `min` greater than `max`—behavior may be undefined
