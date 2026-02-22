### Avatar

**Purpose**: Displays a user's profile image or initials in a circular container.

**Import**:
```tsx
import { Avatar } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Optional image URL. When provided, shows the image instead of initials. |
| `alt` | `string` | `'Avatar'` | Optional alt text for the image. |
| `initials` | `string` | `''` | Optional. When no `src`, displays up to 2 characters (uppercase) as fallback. |
| `size` | `24 \| 32 \| 50 \| 128` | `32` | Pixel dimensions for the avatar. |
| `className` | `string` | — | Optional CSS class for the container. |

**Variants/Options**:
- **Sizes**: `24`, `32`, `50`, `128` (in pixels)

**Usage Example**:
```tsx
// With image
<Avatar src="/user.jpg" alt="Jane Doe" size={50} />

// With initials fallback
<Avatar initials="JD" size={32} />

// In a list
<div className="flex items-center gap-2">
  <Avatar initials="AB" size={24} />
  <span>Alice Brown</span>
</div>
```

**Do/Don't**:
- Do: Provide `initials` when `src` may be missing (e.g., loading or no photo).
- Don't: Use Avatar for non-person entities; use Badge or Icon for counts/status.
