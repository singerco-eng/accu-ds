### Toggle

**Purpose**: A switch control for binary on/off states, styled as green (on) or red (off) with optional label.

**Import**:
```tsx
import { Toggle } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `label` | `string` | — |
| `checked` | `boolean` | — |
| `onCheckedChange` | `(checked: boolean) => void` | — |
| `className` | `string` | — |
| *(extends `input`)* | — | — |

All standard checkbox input props (e.g. `defaultChecked`, `disabled`, `id`, `onChange`) are supported.

**Variants/Options**:
- **checked**: Controlled mode—pass `checked` and `onCheckedChange` to control the state
- **defaultChecked**: Uncontrolled mode—use `defaultChecked` and `onCheckedChange` for initial state

**Usage Example**:
```tsx
function ToggleExample() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="space-y-4">
      <Toggle
        label="Enable notifications"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <Toggle label="Dark mode" defaultChecked onCheckedChange={(v) => console.log(v)} />
      <Toggle label="Disabled" disabled defaultChecked />
    </div>
  )
}
```

**Do/Don't**:
- Do: Use `onCheckedChange` for state updates—it provides the new boolean value directly
- Do: Use `label` for accessible, descriptive text next to the toggle
- Do: Use controlled (`checked` + `onCheckedChange`) when the state is managed elsewhere
- Don't: Use for multi-select options—Toggle is for a single binary choice
- Don't: Rely only on `onChange`; prefer `onCheckedChange` for cleaner boolean handling
