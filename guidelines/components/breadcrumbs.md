### Breadcrumbs

**Purpose**: Shows navigation hierarchy with clickable links and separators; single-item shows a "Back to List" control.

**Import**:
```tsx
import { Breadcrumbs } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | — | **Required.** Array of breadcrumb items. |
| `className` | `string` | — | Optional CSS class. |

**BreadcrumbItem**:
| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | **Required.** Display text. |
| `href` | `string` | Optional. Renders as `<a>` when provided. |
| `onClick` | `() => void` | Optional. Click handler; used with `href` or as button. |
| `active` | `boolean` | Optional. Marks the current page (styled in primary blue). |

**Variants/Options**:
- **Single item**: Renders a "Back to List" pill with chevron and FileText icon.
- **Multiple items**: Renders each item with FileText icon and ChevronRight separators.

**Usage Example**:
```tsx
// Multiple levels
<Breadcrumbs
  items={[
    { label: 'Projects', href: '/projects' },
    { label: 'Project Alpha', href: '/projects/alpha' },
    { label: 'Details', active: true },
  ]}
/>

// Single item (Back to List)
<Breadcrumbs items={[{ label: 'Back', onClick: () => navigate(-1) }]} />
```

**Do/Don't**:
- Do: Set `active: true` on the current page item.
- Don't: Use more than 4–5 levels; consider collapsing middle items for long paths.
