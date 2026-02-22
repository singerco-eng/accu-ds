### SelectMenu

**Purpose**: A dropdown select input that supports single or multiple selection, optional search/filter, and displays options with labels.

**Import**:
```tsx
import { SelectMenu } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | — | Array of options (required) |
| `value` | `string \| string[]` | — | Selected value(s); `string[]` when `multiple` is true |
| `onChange` | `(value: string \| string[]) => void` | — | Called when selection changes (required) |
| `placeholder` | `string` | `'Select an option'` | Placeholder when nothing is selected |
| `label` | `string` | — | Label above the select |
| `required` | `boolean` | — | Marks the field as required |
| `multiple` | `boolean` | — | Enables multi-select with "Select All" option |
| `searchable` | `boolean` | — | Enables filtering options by typing |
| `error` | `string` | — | Error message to display |
| `disabled` | `boolean` | — | Disables the select |
| `className` | `string` | — | Additional CSS classes |

**SelectOption**:
| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | Unique value for the option |
| `label` | `string` | Display text |
| `disabled` | `boolean` | Optional; disables this option |

**Variants/Options**:
- **multiple**: Single vs. multi-select mode
- **searchable**: Enables inline search/filter when dropdown is open

**Usage Example**:
```tsx
// Single select
const [status, setStatus] = useState('')
<SelectMenu
  options={[
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'closed', label: 'Closed' },
  ]}
  value={status}
  onChange={setStatus}
  placeholder="Select status"
  label="Status"
/>

// Multi-select with search
const [tags, setTags] = useState<string[]>([])
<SelectMenu
  options={[
    { value: 'roofing', label: 'Roofing' },
    { value: 'siding', label: 'Siding' },
    { value: 'gutters', label: 'Gutters' },
  ]}
  value={tags}
  onChange={setTags}
  multiple
  searchable
  placeholder="Select categories"
/>
```

**Do/Don't**:
- Do: Use `value` as `string[]` when `multiple` is true
- Do: Use `searchable` when the option list is long
- Don't: Use duplicate `value` strings in options—each must be unique
- Don't: Forget to handle `onChange`—the component is controlled
