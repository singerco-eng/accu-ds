### Panel

**Purpose**: Provides a collapsible section with a header and expandable content, useful for accordions or grouped settings.

**Import**:
```tsx
import { Panel } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `title` | `string` | required |
| `defaultOpen` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `children` | `ReactNode` | required |
| `className` | `string` | — |

**Variants/Options**:
- **defaultOpen**: When `true`, the panel starts expanded
- **disabled**: When `true`, the header is not clickable and appears dimmed

**Usage Example**:
```tsx
function SettingsAccordion() {
  return (
    <div className="space-y-2">
      <Panel title="General" defaultOpen>
        <p>General settings content.</p>
      </Panel>
      <Panel title="Notifications">
        <p>Notification preferences.</p>
      </Panel>
      <Panel title="Advanced" disabled>
        <p>Advanced options (disabled).</p>
      </Panel>
    </div>
  )
}
```

**Do/Don't**:
- Do: Use for accordion-style content or grouped form sections
- Do: Set `defaultOpen` for the first or most important section
- Don't: Nest panels deeply; keep hierarchy flat for clarity
- Don't: Use for primary navigation—Panel is for collapsible content, not menus
