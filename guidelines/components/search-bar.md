### SearchBar

**Purpose**: A text input field for search queries with a search icon, clear button when text is present, and optional Enter-key search callback.

**Import**:
```tsx
import { SearchBar } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled input value (required) |
| `onChange` | `(value: string) => void` | — | Called when the input value changes (required) |
| `placeholder` | `string` | `'Search'` | Placeholder text |
| `variant` | `'default' \| 'header'` | `'default'` | Layout variant: `default` (filter width) or `header` (header width) |
| `onSearch` | `(value: string) => void` | — | Optional callback when user presses Enter |
| `className` | `string` | — | Additional CSS classes |

**Variants/Options**:
- **default**: Standard filter/search width, search icon on the right
- **header**: Compact header width, search icon on the left

**Usage Example**:
```tsx
// Basic search with controlled state
const [query, setQuery] = useState('')
<SearchBar value={query} onChange={setQuery} placeholder="Search projects..." />

// With Enter-key search
<SearchBar
  value={query}
  onChange={setQuery}
  onSearch={(value) => performSearch(value)}
  placeholder="Search..."
/>

// Header variant for app header
<SearchBar value={query} onChange={setQuery} variant="header" placeholder="Search" />
```

**Do/Don't**:
- Do: Use controlled state with `value` and `onChange` for the search input
- Do: Use `variant="header"` for compact header/navbar search bars
- Don't: Use uncontrolled mode—the component requires `value` and `onChange`
- Don't: Rely only on `onChange` for search—use `onSearch` if you want to trigger search on Enter
