### ContextMenu

**Purpose**: Displays a dropdown menu of actions triggered by a vertical ellipsis (more) button, typically for row-level or item-level actions.

**Import**:
```tsx
import { ContextMenu } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `items` | `ContextMenuItem[]` | required |
| `className` | `string` | — |

**ContextMenuItem**:
| Property | Type | Default |
|----------|------|---------|
| `label` | `string` | required |
| `onClick` | `() => void` | required |
| `icon` | `ReactNode` | — |
| `dividerAfter` | `boolean` | — |
| `disabled` | `boolean` | — |

**Variants/Options**:
- Each item can have an optional `icon`, `dividerAfter` (adds a divider below the item), and `disabled` state

**Usage Example**:
```tsx
<ContextMenu
  items={[
    { label: 'Edit', onClick: () => handleEdit(), icon: <Pencil className="h-4 w-4" /> },
    { label: 'Duplicate', onClick: () => handleDuplicate(), icon: <Copy className="h-4 w-4" /> },
    { label: 'Delete', onClick: () => handleDelete(), icon: <Trash className="h-4 w-4" />, dividerAfter: true },
    { label: 'Archive', onClick: () => handleArchive(), disabled: true },
  ]}
/>
```

**Do/Don't**:
- Do: Use for secondary or tertiary actions on a row or card (Edit, Delete, Duplicate, etc.)
- Do: Add `dividerAfter` to visually separate destructive or distinct actions
- Don't: Use for primary actions—prefer a visible button instead
- Don't: Nest context menus; keep the action list flat and concise
