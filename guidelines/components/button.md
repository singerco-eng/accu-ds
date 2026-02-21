### Button

**Purpose**: Triggers actions with configurable variants, optional icons, and full button semantics.

**Import**:
```tsx
import { Button } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'outline' \| 'text' \| 'warning' \| 'danger' \| 'success'` | `'default'` | Visual style. |
| `iconLeft` | `ReactNode` | — | Optional icon before the label. |
| `iconRight` | `ReactNode` | — | Optional icon after the label. |
| `iconOnly` | `boolean` | `false` | When true, hides children and shows only icons (square 40×40px). |
| `className` | `string` | — | Optional CSS class. |
| All native `<button>` props | — | — | `disabled`, `onClick`, `type`, `children`, etc. |

**Variants/Options**:
- `default` — Primary blue filled
- `outline` — Blue border, transparent background
- `text` — No border, blue text, underline on hover
- `warning` — Orange filled
- `danger` — Red filled
- `success` — Green filled

**Usage Example**:
```tsx
import { Plus, ChevronRight } from 'lucide-react'

// Primary action
<Button variant="default" onClick={handleSave}>Save</Button>

// With icons
<Button iconLeft={<Plus className="h-6 w-6" />}>Add item</Button>
<Button iconRight={<ChevronRight className="h-6 w-6" />}>Next</Button>

// Icon-only
<Button iconOnly iconLeft={<Plus className="h-6 w-6" />} aria-label="Add" />

// Destructive
<Button variant="danger" onClick={handleDelete}>Delete</Button>
```

**Do/Don't**:
- Do: Use `aria-label` when `iconOnly` is true for accessibility.
- Don't: Use `danger` for non-destructive actions; reserve it for delete/remove.
