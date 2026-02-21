### ModalDrawer

**Purpose**: Displays a slide-in panel from the right side of the screen for secondary content, settings, or detail views.

**Import**:
```tsx
import { ModalDrawer } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `title` | `string` | required |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` |
| `children` | `ReactNode` | required |
| `footer` | `ReactNode` | — |
| `className` | `string` | — |

**Variants/Options**:
- **size**: `sm`, `md`, `lg`—controls drawer width via design tokens
- **footer**: Optional footer with left-aligned and right-aligned content; use a Fragment with multiple children to split (first child = left, rest = right)

**Usage Example**:
```tsx
function ItemDetails() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>View Details</button>
      <ModalDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="Item Details"
        size="md"
        footer={
          <>
            <button onClick={() => setOpen(false)}>Close</button>
            <button onClick={handleSave}>Save Changes</button>
          </>
        }
      >
        <p>Detail content goes here.</p>
      </ModalDrawer>
    </>
  )
}
```

**Do/Don't**:
- Do: Use for detail panels, settings, or supplementary content that slides in from the right
- Do: Prefer Modal for centered dialogs and ModalDrawer for side panels
- Don't: Use for critical confirmations—Modal is better for focused attention
- Don't: Nest drawers; keep a single drawer open at a time
