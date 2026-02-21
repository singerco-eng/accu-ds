### Checkbox

**Purpose**: A form control for binary or indeterminate selection, with optional label.

**Import**:
```tsx
import { Checkbox } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Optional label text (rendered to the right of the checkbox). |
| `indeterminate` | `boolean` | `false` | Shows indeterminate state (horizontal bar instead of check). |
| `labelClassName` | `string` | — | Optional CSS class for the label. |
| `className` | `string` | — | Optional CSS class for the wrapper. |
| All native `<input type="checkbox">` props | — | — | `checked`, `disabled`, `onChange`, `name`, `id`, etc. |

**Variants/Options**:
- **States**: checked, unchecked, indeterminate
- **Disabled**: Uses muted orange styling

**Usage Example**:
```tsx
// Controlled
<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>

// Uncontrolled
<Checkbox label="Subscribe to newsletter" name="subscribe" defaultChecked />

// Indeterminate (e.g., "select all" when some items selected)
<Checkbox
  label="Select all"
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={(e) => setAllSelected(e.target.checked)}
/>

// Without label
<Checkbox aria-label="Toggle option" checked={value} onChange={handleChange} />
```

**Do/Don't**:
- Do: Provide `label` or `aria-label` for accessibility.
- Don't: Use `indeterminate` without controlling it via the prop; the native `indeterminate` is not reflected in the `checked` attribute.
