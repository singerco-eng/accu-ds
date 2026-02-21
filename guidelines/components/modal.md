### Modal

**Purpose**: Displays a centered dialog overlay for focused user interactions such as confirmations, forms, or detailed content.

**Import**:
```tsx
import { Modal } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `open` | `boolean` | required |
| `onClose` | `() => void` | required |
| `title` | `string` | required |
| `size` | `'sm' \| 'lg' \| 'xl' \| 'fullscreen'` | `'sm'` |
| `footer` | `ReactNode` | — |
| `children` | `ReactNode` | required |
| `className` | `string` | — |

**Variants/Options**:
- **size**: `sm`, `lg`, `xl`, `fullscreen`—controls dialog width via design tokens
- **footer**: Optional footer with left-aligned and right-aligned content; use a Fragment with multiple children to split (first child = left, rest = right)

**Usage Example**:
```tsx
function ConfirmDelete() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Delete</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Item"
        size="sm"
        footer={
          <>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        }
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  )
}
```

**Do/Don't**:
- Do: Control visibility with `open` and `onClose`; the modal closes on Escape or backdrop click
- Do: Use the footer for primary actions (e.g. Cancel + Confirm)
- Don't: Nest modals; use a single modal at a time
- Don't: Use for long forms without scrollable content—the body scrolls when needed
