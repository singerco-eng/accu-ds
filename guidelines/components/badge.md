### Badge

**Purpose**: Displays a small circular indicator, typically for counts or status (e.g., notification count).

**Import**:
```tsx
import { Badge } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'gray' \| 'grayBlue' \| 'warning' \| 'danger'` | `'gray'` | Visual style of the badge. |
| `children` | `ReactNode` | — | **Required.** Content (usually a number or short label). |
| `className` | `string` | — | Optional CSS class. |

**Variants/Options**:
- `gray` — Neutral gray background
- `grayBlue` — Gray-blue background
- `warning` — Orange (AccuLynx orange)
- `danger` — Red

**Usage Example**:
```tsx
// Notification count
<button className="relative">
  <BellIcon />
  <Badge variant="danger">3</Badge>
</button>

// Status indicator
<Badge variant="warning">!</Badge>
```

**Do/Don't**:
- Do: Use short content (numbers or 1–2 characters); the badge is fixed at 24×24px.
- Don't: Put long text in Badge; use Tag or another component for labels.
