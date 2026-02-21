### Announcement

**Purpose**: Displays contextual alerts with a title, optional message, and action buttons for info, success, warning, or error states.

**Import**:
```tsx
import { Announcement } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | — | **Required.** Visual style and icon for the announcement. |
| `title` | `string` | — | **Required.** Main heading text. |
| `message` | `string` | — | Optional supporting message. |
| `primaryAction` | `{ label: string; onClick: () => void }` | — | Optional primary button. |
| `secondaryAction` | `{ label: string; onClick: () => void }` | — | Optional secondary (outline) button. |
| `onDismiss` | `() => void` | — | Optional. When provided, shows a dismiss (X) button. |
| `className` | `string` | — | Optional CSS class for the container. |

**Variants/Options**:
- `info` — Blue accent, Info icon
- `success` — Green accent, CheckCircle icon
- `warning` — Orange accent, AlertTriangle icon
- `error` — Red accent, AlertTriangle icon

**Usage Example**:
```tsx
<Announcement
  variant="warning"
  title="Scheduled maintenance"
  message="The system will be unavailable from 2–4 AM EST."
  primaryAction={{ label: 'View details', onClick: () => {} }}
  secondaryAction={{ label: 'Dismiss', onClick: () => {} }}
  onDismiss={() => {}}
/>
```

**Do/Don't**:
- Do: Use the variant that matches the severity (info for neutral, error for critical).
- Don't: Use `error` for non-critical messages; reserve it for failures or blocking issues.
