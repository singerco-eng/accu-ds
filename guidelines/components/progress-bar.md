### ProgressBar

**Purpose**: Displays a horizontal bar indicating progress toward a maximum value, with optional color variants for different states (e.g., success, error).

**Import**:
```tsx
import { ProgressBar, ProgressSteps } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Note**: The same module exports `ProgressSteps` for step-based progress (e.g., multi-step forms). Use `steps: string[]` and `currentStep: number` for that component.

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Current progress value (required) |
| `max` | `number` | `100` | Maximum value for the progress bar |
| `color` | `'blue' \| 'green' \| 'red' \| 'gray'` | `'blue'` | Color of the progress fill |
| `className` | `string` | — | Additional CSS classes |

**Variants/Options**:
- **color**: `blue` (primary), `green` (success), `red` (error), `gray` (neutral)

**Usage Example**:
```tsx
<ProgressBar value={75} max={100} color="blue" />
<ProgressBar value={30} color="green" />
<ProgressBar value={90} color="red" className="my-4" />
```

**Do/Don't**:
- Do: Use `value` between 0 and `max`; the component clamps values automatically
- Do: Use `green` for success states, `red` for errors or warnings
- Don't: Use negative values or values exceeding `max` without understanding they will be clamped
- Don't: Omit the `value` prop—it is required
