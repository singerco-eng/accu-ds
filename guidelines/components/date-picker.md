### DatePicker

**Purpose**: Provides a text input with a calendar dropdown for selecting a single date.

**Import**:
```tsx
import { DatePicker } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `value` | `Date \| null` | `null` |
| `onChange` | `(date: Date \| null) => void` | required |
| `label` | `string` | `'Date'` |
| `placeholder` | `string` | `'Select date'` |
| `required` | `boolean` | — |
| `error` | `string` | — |
| `disabled` | `boolean` | — |
| `className` | `string` | — |

**Variants/Options**:
- Uses `TextInput` internally with a read-only display; calendar opens on click
- Calendar shows month/year navigation, week day headers, and date cells (current month selectable, today highlighted)

**Usage Example**:
```tsx
function ScheduleForm() {
  const [date, setDate] = useState<Date | null>(null)
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      label="Start Date"
      placeholder="Choose a date"
      required
      error={errors.date}
    />
  )
}
```

**Do/Don't**:
- Do: Use for single-date selection in forms (start date, due date, etc.)
- Do: Pass `error` to show validation messages
- Don't: Use for date ranges—this component selects one date only
- Don't: Use for time selection; this is date-only
