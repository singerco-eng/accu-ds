### TextInput

**Purpose**: A text field with floating label, error states, and optional multiline support for forms and data entry.

**Import**:
```tsx
import { TextInput } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `error` | `string` | — |
| `required` | `boolean` | — |
| `multiline` | `boolean` | — |
| `rows` | `number` | `4` |
| `active` | `boolean` | `false` |
| `rightAdornment` | `ReactNode` | — |
| `hideNativeValueText` | `boolean` | `false` |
| `className` | `string` | — |
| *(extends `input`)* | — | — |

All standard HTML input props (e.g. `value`, `defaultValue`, `onChange`, `onFocus`, `onBlur`, `placeholder`, `disabled`, `id`) are supported.

**Variants/Options**:
- **multiline**: Renders a `<textarea>` instead of `<input>` when `true`; use `rows` to control height
- **active**: Keeps the floating label in the floated (small) position even when empty; useful for pre-filled or programmatic focus
- **rightAdornment**: Renders an icon or element on the right side of the input (single-line only)
- **hideNativeValueText**: Hides the visible text while keeping the value (e.g. for masked inputs)

**Usage Example**:
```tsx
function FormExample() {
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <form className="space-y-4">
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextInput
        label="Email"
        error="Please enter a valid email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        label="Notes"
        multiline
        rows={5}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </form>
  )
}
```

**Do/Don't**:
- Do: Use `label` or `placeholder` for accessible floating labels
- Do: Show `error` when validation fails; the input will display error styling
- Do: Set `required` for required fields; empty required fields show orange validation styling
- Don't: Use both `value` and `defaultValue`; choose controlled or uncontrolled
- Don't: Use `rightAdornment` with `multiline`—it only applies to single-line inputs
