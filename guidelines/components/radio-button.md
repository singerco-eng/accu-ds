### RadioButton

**Purpose**: A single-selection input control that allows users to choose one option from a group, styled with AccuLynx branding (orange accent).

**Import**:
```tsx
import { RadioButton } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Optional label text displayed next to the radio |
| `checked` | `boolean` | — | Controlled checked state |
| `disabled` | `boolean` | — | Disables the radio button |
| `id` | `string` | — | Custom id (auto-generated if not provided) |
| `className` | `string` | — | Additional CSS classes (applied to the label) |
| `...props` | `Omit<ComponentPropsWithoutRef<'input'>, 'type'>` | — | All standard HTML input props except `type` |

**Variants/Options**:
- No visual variants; supports `disabled` and `checked` states

**Usage Example**:
```tsx
// Single radio with label
<RadioButton label="Option A" name="choice" value="a" checked={selected === 'a'} onChange={(e) => setSelected(e.target.value)} />

// Radio group
<div>
  <RadioButton label="Small" name="size" value="small" checked={size === 'small'} onChange={(e) => setSize(e.target.value)} />
  <RadioButton label="Medium" name="size" value="medium" checked={size === 'medium'} onChange={(e) => setSize(e.target.value)} />
  <RadioButton label="Large" name="size" value="large" checked={size === 'large'} onChange={(e) => setSize(e.target.value)} />
</div>

// Disabled state
<RadioButton label="Disabled option" disabled />
```

**Do/Don't**:
- Do: Use the same `name` for all radios in a group so only one can be selected
- Do: Use controlled mode with `checked` and `onChange` for React state management
- Don't: Use multiple RadioButtons with different `name` values when they should be mutually exclusive
- Don't: Forget to provide `name` when building a radio group—it's required for proper behavior
