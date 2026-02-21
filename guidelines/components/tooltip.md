### Tooltip

**Purpose**: Shows contextual help or additional information on hover or focus, positioned relative to a trigger element.

**Import**:
```tsx
import { Tooltip } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `content` | `ReactNode` | required |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| `children` | `ReactNode` | required |
| `className` | `string` | — |

**Variants/Options**:
- **position**: `top` (above), `bottom` (below), `left`, `right`—positions the tooltip relative to the trigger

**Usage Example**:
```tsx
function TooltipExample() {
  return (
    <div className="flex gap-4 p-8">
      <Tooltip content="Save your changes" position="top">
        <button>Save</button>
      </Tooltip>
      <Tooltip content="Delete this item" position="bottom">
        <button>Delete</button>
      </Tooltip>
      <Tooltip content="More options" position="right">
        <span className="cursor-help">?</span>
      </Tooltip>
    </div>
  )
}
```

**Do/Don't**:
- Do: Use for short, supplementary text (icons, abbreviations, truncated content)
- Do: Wrap the element that triggers the tooltip as `children`
- Do: Choose `position` based on available space to avoid clipping
- Don't: Put long paragraphs or critical information in tooltips—they are transient
- Don't: Use for interactive content; the tooltip is `pointer-events-none` and cannot be clicked
