## Icon Library

AccuLynx Design System uses [Lucide React](https://lucide.dev/) for all icons. Lucide provides a comprehensive set of open-source icons as React components.

### Installation

Lucide React is included as a dependency of `@acculynx/design-system`, so it is available automatically.

### Usage Pattern

```tsx
import { Search, ChevronDown, X, Check, AlertTriangle } from 'lucide-react'

// Standalone icon
<Search className="h-5 w-5 text-[var(--accu-gray-5)]" />

// Icon in a Button
<Button variant="default" iconLeft={<Search />}>
  Search
</Button>

// Icon-only Button
<Button variant="text" iconOnly>
  <X />
</Button>
```

### Icon Sizing

- Default size: 24x24px (Lucide's default)
- Use Tailwind classes to resize: `className="h-4 w-4"` for 16px, `className="h-5 w-5"` for 20px
- Button components automatically size icons via wrapper spans

### Icon Colors

- Icons inherit text color by default
- Use Tailwind text color utilities with design tokens: `text-[var(--accu-primary-blue)]`
- For disabled states: `text-[var(--accu-gray-4)]`

### Common Icons Used in AccuLynx

| Purpose | Icon | Import |
|---------|------|--------|
| Search | Search | `import { Search } from 'lucide-react'` |
| Close/Dismiss | X | `import { X } from 'lucide-react'` |
| Dropdown arrow | ChevronDown | `import { ChevronDown } from 'lucide-react'` |
| Navigation back | ChevronLeft | `import { ChevronLeft } from 'lucide-react'` |
| Success/Check | Check | `import { Check } from 'lucide-react'` |
| Warning | AlertTriangle | `import { AlertTriangle } from 'lucide-react'` |
| Error | AlertCircle | `import { AlertCircle } from 'lucide-react'` |
| Info | Info | `import { Info } from 'lucide-react'` |
| Settings | Settings | `import { Settings } from 'lucide-react'` |
| User | User | `import { User } from 'lucide-react'` |
| Calendar | Calendar | `import { Calendar } from 'lucide-react'` |
| Upload | Upload | `import { Upload } from 'lucide-react'` |
| Download | Download | `import { Download } from 'lucide-react'` |
| Edit | Pencil | `import { Pencil } from 'lucide-react'` |
| Delete | Trash2 | `import { Trash2 } from 'lucide-react'` |
| Add | Plus | `import { Plus } from 'lucide-react'` |
| More options | MoreVertical | `import { MoreVertical } from 'lucide-react'` |

### Finding More Icons

Browse the full Lucide icon set at [lucide.dev/icons](https://lucide.dev/icons). All icons follow the naming convention of PascalCase React component names (e.g., `AlertTriangle`, `ChevronDown`).

### Do/Don't

- Do: Use Lucide icons consistently throughout the application
- Do: Use the `iconLeft` and `iconRight` props on Button rather than nesting icons as children
- Don't: Mix icon libraries — stick to Lucide React for all icons
- Don't: Modify `strokeWidth` on icons as it breaks visual consistency
