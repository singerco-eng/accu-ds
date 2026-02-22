### Toast

**Purpose**: Displays a temporary notification with confirmation, warning, or error styling and auto-dismisses after a configurable duration.

**Import**:
```tsx
import { Toast } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `variant` | `'confirmation' \| 'warning' \| 'error'` | required |
| `message` | `string` | required |
| `duration` | `number` | `5000` |
| `onClose` | `() => void` | — |
| `className` | `string` | — |

**Variants/Options**:
- **confirmation**: Green accent, check icon—for success messages
- **warning**: Orange accent—for caution or non-critical issues
- **error**: Red accent—for errors or critical issues

**Usage Example**:
```tsx
function ToastExample() {
  const [showToast, setShowToast] = useState(false)

  return (
    <>
      <button onClick={() => setShowToast(true)}>Show Toast</button>
      {showToast && (
        <Toast
          variant="confirmation"
          message="Your changes have been saved successfully."
          duration={5000}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}
```

**Do/Don't**:
- Do: Use for transient feedback (save confirmations, validation errors)
- Do: Call `onClose` to remove the toast from the DOM after it auto-dismisses
- Do: Choose the variant that matches the message type (confirmation, warning, error)
- Don't: Use for critical blocking information—Toasts auto-dismiss and may be missed
- Don't: Stack many toasts; consider a toast queue or single-toast pattern
