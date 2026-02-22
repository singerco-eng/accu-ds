### ColorPicker

**Purpose**: Allows users to select a color from preset swatches or create a custom color via a spectrum picker and hex input.

**Import**:
```tsx
import { ColorPicker } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `value` | `string` | — |
| `onChange` | `(color: string) => void` | required |
| `presetColors` | `string[]` | Figma-style swatches (30 colors) |
| `className` | `string` | — |

**Variants/Options**:
- **Swatches mode**: 6-column grid of preset colors (default view)
- **Custom mode**: Spectrum canvas + hue slider + hex input for fine-grained color selection

**Usage Example**:
```tsx
function ColorField() {
  const [color, setColor] = useState('#A32C25')
  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      presetColors={['#FF0000', '#00FF00', '#0000FF', '#FFFF00']}
    />
  )
}
```

**Do/Don't**:
- Do: Provide an `onChange` handler to receive the selected hex color (e.g. `#A32C25`)
- Do: Use `presetColors` to customize the swatch palette for your use case
- Don't: Omit `onChange`—it is required for the component to function
- Don't: Use invalid hex values; the component expects 6-digit hex format
