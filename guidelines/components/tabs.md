### Tabs

**Purpose**: A tabbed navigation component that lets users switch between views or sections, with multiple visual variants.

**Import**:
```tsx
import { Tabs } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | — | Tab items (required) |
| `activeId` | `string` | — | ID of the active tab (required) |
| `onChange` | `(id: string) => void` | — | Called when a tab is selected (required) |
| `variant` | `'underline' \| 'table' \| 'pill'` | `'underline'` | Visual style of the tabs |
| `className` | `string` | — | Additional CSS classes |

**TabItem**:
| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique tab identifier |
| `label` | `string` | Tab label text |
| `disabled` | `boolean` | Optional; disables the tab |

**Variants/Options**:
- **underline**: Default style with underline on active tab, gray background on inactive
- **table**: Table-style tabs with bottom border on active, suited for data views
- **pill**: Rounded pill buttons, active tab filled with primary blue

**Usage Example**:
```tsx
const [active, setActive] = useState('overview')

<Tabs
  items={[
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'settings', label: 'Settings', disabled: true },
  ]}
  activeId={active}
  onChange={setActive}
/>

// Pill variant
<Tabs items={items} activeId={active} onChange={setActive} variant="pill" />

// Table variant (e.g., above a data table)
<Tabs items={items} activeId={active} onChange={setActive} variant="table" />
```

**Do/Don't**:
- Do: Use unique `id` values for each tab
- Do: Use `variant="table"` when tabs sit above tabular data
- Don't: Use `activeId` that doesn't match any item `id`—no tab will appear active
- Don't: Omit `onChange`—tabs require it for switching
