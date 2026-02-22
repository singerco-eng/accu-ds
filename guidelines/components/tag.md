### Tag

**Purpose**: Displays a compact label or badge for categorization, status, or removable metadata.

**Import**:
```tsx
import { Tag } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `variant` | `'blue' \| 'darkBlue' \| 'gray'` | `'gray'` |
| `weight` | `'light' \| 'regular'` | `'regular'` |
| `removable` | `boolean` | `false` |
| `onRemove` | `() => void` | — |
| `children` | `ReactNode` | required |
| `className` | `string` | — |

**Variants/Options**:
- **variant**: `blue` (cyan background), `darkBlue` (dark blue background), `gray` (gray background)
- **weight**: `light` (font-weight 300) or `regular` (font-weight 400)
- **removable**: When `true`, shows an X button; provide `onRemove` to handle removal

**Usage Example**:
```tsx
function TagExample() {
  const [tags, setTags] = useState(['Roofing', 'Siding', 'Gutters'])

  return (
    <div className="flex gap-2">
      <Tag variant="blue">Active</Tag>
      <Tag variant="darkBlue" weight="light">Draft</Tag>
      <Tag variant="gray">Completed</Tag>
      {tags.map((tag) => (
        <Tag
          key={tag}
          variant="blue"
          removable
          onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Tag>
      ))}
    </div>
  )
}
```

**Do/Don't**:
- Do: Use for status indicators, categories, or filter chips
- Do: Provide `onRemove` when `removable` is true so users can dismiss tags
- Don't: Use for primary actions—Tag is for labels, not buttons
- Don't: Put long text in tags; keep content short (1–3 words)
