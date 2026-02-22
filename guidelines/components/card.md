### Card

**Purpose**: A flexible container for grouped content with optional header, body, footer, media, and selection state.

**Import**:
```tsx
import { Card } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:

**Card** (root):
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined'` | `'default'` | Visual style. |
| `selected` | `boolean` | `false` | Shows orange accent bar and selected background. |
| `interactive` | `boolean` | `false` | Enables hover/focus styles and cursor. |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Inner padding (use sub-components for finer control). |
| `as` | `'div' \| 'article' \| 'section' \| 'aside'` | `'div'` | Semantic HTML element. |
| `children` | `ReactNode` | — | **Required.** |
| `className` | `string` | — | Optional. |
| `onClick` | — | — | Makes card clickable when provided. |

**Card.Header**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** |
| `action` | `ReactNode` | — | Optional right-side content (e.g., menu). |
| `divider` | `boolean` | `false` | Adds bottom border. |

**Card.Title**:
| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | **Required.** Main heading. |
| `subtitle` | `string` | Optional subheading. |
| `children` | `ReactNode` | Optional. |

**Card.Body**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** |
| `scrollable` | `boolean` | `false` | Enables vertical scroll. |
| `maxHeight` | `number \| string` | — | Max height for scrollable content. |

**Card.Footer**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** |
| `divider` | `boolean` | `false` | Adds top border. |
| `align` | `'left' \| 'center' \| 'right' \| 'between'` | `'right'` | Alignment of footer content. |

**Card.Media**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL. |
| `alt` | `string` | — | Alt text for image. |
| `height` | `number \| string` | — | Height of media area. |
| `position` | `'top' \| 'bottom'` | `'top'` | Placement. |
| `children` | `ReactNode` | — | Custom content instead of image. |

**Card.Divider**: Horizontal rule between sections.

**Variants/Options**:
- **Card variant**: `default`, `elevated`, `outlined`
- **Padding**: `none`, `sm`, `md`, `lg`
- **Footer align**: `left`, `center`, `right`, `between`

**Usage Example**:
```tsx
<Card variant="elevated" interactive selected={isSelected} onClick={handleSelect}>
  <Card.Header action={<MenuButton />} divider>
    <Card.Title title="Project Alpha" subtitle="Last updated 2 hours ago" />
  </Card.Header>
  <Card.Body scrollable maxHeight={200}>
    <p>Card content goes here.</p>
  </Card.Body>
  <Card.Footer divider align="right">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </Card.Footer>
</Card>

// With media
<Card>
  <Card.Media src="/image.jpg" alt="Cover" height={120} />
  <Card.Header>
    <Card.Title title="Card with image" />
  </Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

**Do/Don't**:
- Do: Use `interactive` or `onClick` when the card is clickable.
- Don't: Nest Cards; use a single Card per logical unit.
