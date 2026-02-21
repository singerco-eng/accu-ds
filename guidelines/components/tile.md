### Tile

**Purpose**: Provides clickable action tiles and milestone tiles for dashboards, navigation, or status summaries.

**Import**:
```tsx
import { Tile, MilestoneTile } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

---

#### Tile (Action Tile)

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `subtitle` | `string` | — |
| `count` | `ReactNode` | — |
| `rightIcon` | `ReactNode` | — |
| `onClick` | `() => void` | — |
| `disabled` | `boolean` | — |
| `className` | `string` | — |

**Variants/Options**:
- **count**: Displays a number or node on the left (defaults to `0`)
- **rightIcon**: Custom icon on the right; defaults to a Check icon when not provided

**Usage Example**:
```tsx
function ActionTilesExample() {
  return (
    <div className="flex gap-2">
      <Tile title="Leads" count={12} onClick={() => {}} />
      <Tile title="Prospects" subtitle="In progress" count={5} onClick={() => {}} />
      <Tile title="Completed" count={0} disabled />
    </div>
  )
}
```

---

#### MilestoneTile

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `stage` | `'lead' \| 'prospect' \| 'approved' \| 'completed' \| 'invoice' \| 'unassigned' \| 'closed' \| 'cancelled'` | — |
| `icon` | `ReactNode` | — |
| `count` | `ReactNode` | — |
| `amount` | `string` | — |
| `onClick` | `() => void` | — |
| `disabled` | `boolean` | — |
| `className` | `string` | — |

**Variants/Options**:
- **stage**: Uses built-in milestone icons (lead, prospect, approved, etc.); use `icon` for custom icons when `stage` is not set
- **count**: Displays a number or placeholder (`##`) on the bottom
- **amount**: Optional secondary text below the count

**Usage Example**:
```tsx
function MilestoneTilesExample() {
  return (
    <div className="flex gap-2">
      <MilestoneTile stage="lead" count={24} amount="$12,400" onClick={() => {}} />
      <MilestoneTile stage="prospect" count={8} onClick={() => {}} />
      <MilestoneTile stage="completed" count={156} amount="$89,200" disabled />
    </div>
  )
}
```

**Do/Don't**:
- Do: Use `Tile` for action-oriented items (counts, navigation)
- Do: Use `MilestoneTile` for pipeline or workflow stages with built-in icons
- Do: Provide `onClick` for interactive tiles
- Don't: Use tiles for primary page content—they are for quick navigation or summaries
- Don't: Omit `stage` and `icon` on MilestoneTile; at least one is needed for visual context
