### Table

**Purpose**: Renders tabular data with configurable columns, optional sorting, row click handlers, and automatic email linking.

**Import**:
```tsx
import { Table, TableTabs } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn<T>[]` | — | Column definitions (required) |
| `data` | `T[]` | — | Row data (required) |
| `onRowClick` | `(row: T) => void` | — | Optional callback when a row is clicked |
| `sortColumn` | `string` | — | Key of the currently sorted column |
| `sortDirection` | `'asc' \| 'desc'` | — | Sort direction |
| `onSort` | `(column: string) => void` | — | Called when a sortable column header is clicked |
| `bordered` | `boolean` | `true` | Whether to show outer border |
| `className` | `string` | — | Additional CSS classes |

**TableColumn**:
| Property | Type | Description |
|----------|------|-------------|
| `key` | `string` | Property key in row data |
| `header` | `string` | Column header text |
| `width` | `string` | Optional column width (e.g., `'120px'`) |
| `sortable` | `boolean` | Enables sort icon and `onSort` on click |
| `render` | `(value: any, row: T) => ReactNode` | Custom cell renderer |

**TableTabs** (related component):
| Prop | Type | Description |
|------|------|-------------|
| `tabs` | `TableTab[]` | `{ key, label, count? }` |
| `activeTab` | `string` | Active tab key |
| `onTabChange` | `(key: string) => void` | Tab change handler |
| `className` | `string` | Additional CSS classes |

**Variants/Options**:
- **bordered**: With or without outer border
- **sortable** columns: Per-column `sortable` flag

**Usage Example**:
```tsx
const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status', render: (val) => <Badge>{val}</Badge> },
]
const [sortCol, setSortCol] = useState<string | undefined>()
const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

<Table
  columns={columns}
  data={rows}
  onRowClick={(row) => openDetail(row)}
  sortColumn={sortCol}
  sortDirection={sortDir}
  onSort={(col) => { setSortCol(col); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }}
/>
```

**Do/Don't**:
- Do: Use `render` for custom cell content (badges, links, formatted dates)
- Do: Provide `onSort` when using `sortable` columns
- Don't: Use `key` values that don't exist on your row objects
- Don't: Forget to wire `sortColumn` and `sortDirection` to your sorted data—the Table only displays the UI, not the sorted result
