## Components

Always prefer components from the `@al-ds/design-system` package (imported from `@al-ds/design-system`) if they are available. Each component has a guidelines file that contains helpful examples and additional context. You must follow all relevant instructions.

Here are the guidelines files and descriptions for the AccuLynx components:

| Component | Description | Guidelines file |
|-----------|-------------|-----------------|
| Announcement | System-wide announcement banners with type variants (info, success, warning, error) and optional dismiss | [announcement.md](components/announcement.md) |
| Avatar | User avatar displaying an image or initials fallback in multiple sizes | [avatar.md](components/avatar.md) |
| Badge | Small circular status indicator or count badge | [badge.md](components/badge.md) |
| Breadcrumbs | Navigation breadcrumb trail with clickable items | [breadcrumbs.md](components/breadcrumbs.md) |
| Button | Clickable button with 6 variants: default (blue), outline, text, warning, danger, success | [button.md](components/button.md) |
| Card | Container card with compound sub-components (Header, Title, Body, Footer, Media, Divider) | [card.md](components/card.md) |
| Checkbox | Checkbox input with label, indeterminate state, and error validation | [checkbox.md](components/checkbox.md) |
| ColorPicker | Color selection with predefined swatches and custom hex input | [color-picker.md](components/color-picker.md) |
| ContextMenu | Right-click context menu with nested sub-menus and keyboard navigation | [context-menu.md](components/context-menu.md) |
| DatePicker | Calendar-based date selection with month/year navigation | [date-picker.md](components/date-picker.md) |
| FileUploader | Drag-and-drop file upload area with progress indicators | [file-uploader.md](components/file-uploader.md) |
| Modal | Dialog overlay with customizable size and content | [modal.md](components/modal.md) |
| ModalDrawer | Slide-in drawer panel from the right side of the screen | [modal-drawer.md](components/modal-drawer.md) |
| Panel | Collapsible content panel with header and expand/collapse | [panel.md](components/panel.md) |
| ProgressBar | Determinate and indeterminate progress indicators with color options | [progress-bar.md](components/progress-bar.md) |
| RadioButton | Radio button group for mutually exclusive selections | [radio-button.md](components/radio-button.md) |
| SearchBar | Search input field with clear button and loading state | [search-bar.md](components/search-bar.md) |
| SelectMenu | Dropdown select supporting single and multi-select modes | [select-menu.md](components/select-menu.md) |
| Slider | Range slider with single or dual thumb support | [slider.md](components/slider.md) |
| Table | Data table with sorting, row selection, and pagination | [table.md](components/table.md) |
| Tabs | Tabbed content panels for organizing related content | [tabs.md](components/tabs.md) |
| Tag | Removable tag/chip labels with color variants | [tag.md](components/tag.md) |
| TextInput | Text input with floating label, helper text, error state, and multiline | [text-input.md](components/text-input.md) |
| Tile | Content tile with a milestone tile variant for pipeline stages | [tile.md](components/tile.md) |
| Toast | Brief notification alerts with auto-dismiss and action buttons | [toast.md](components/toast.md) |
| Toggle | On/off toggle switch | [toggle.md](components/toggle.md) |
| Tooltip | Hover/focus tooltip with configurable position | [tooltip.md](components/tooltip.md) |

## General Component Usage and Best Practices

### Common Props

Most AccuLynx components accept these common props:
- `className`: String for additional Tailwind CSS classes
- `ref`: React ref forwarding is supported on all components
- Components extend their base HTML element's props (e.g., Button extends `<button>`, TextInput extends `<input>`)

### Styling

- All colors use CSS custom properties: `var(--accu-primary-blue)`, `var(--accu-red)`, etc.
- Use Tailwind's arbitrary value syntax to reference tokens: `bg-[var(--accu-primary-blue)]`
- Never hard-code hex color values — always use design tokens
- The Roboto font is automatically applied via the styles CSS import

### Controlled vs Uncontrolled

- **Controlled**: Component receives `value`/`checked` and `onChange`/`onCheckedChange` props
- **Uncontrolled**: Component manages its own state with optional `defaultValue`/`defaultChecked`
- Prefer controlled components for form data that needs to be submitted or validated
- Toggle and RadioButton support both controlled (`checked` prop) and uncontrolled (`defaultChecked` prop) patterns

### onChange Signatures — READ THIS CAREFULLY

Components use different `onChange` signatures depending on their type. You MUST check the specific component's guidelines before wiring up event handlers.

| Component | Prop | Receives | Example |
|-----------|------|----------|---------|
| TextInput | `onChange` | `React.ChangeEvent<HTMLInputElement>` | `(e) => setValue(e.target.value)` |
| Checkbox | `onChange` | `React.ChangeEvent<HTMLInputElement>` | `(e) => setChecked(e.target.checked)` |
| RadioButton | `onChange` | `React.ChangeEvent<HTMLInputElement>` | `(e) => setSelected(e.target.value)` |
| Toggle | `onCheckedChange` | `boolean` | `(checked) => setEnabled(checked)` |
| SelectMenu | `onChange` | `string \| string[]` | `(value) => setSelected(value)` |
| SearchBar | `onChange` | `string` | `(query) => setSearch(query)` |
| Slider | `onChange` | `number` | `(value) => setSlider(value)` |
| DatePicker | `onChange` | `Date` | `(date) => setDate(date)` |

**Key differences:**
- TextInput, Checkbox, RadioButton pass React **events** — use `e.target.value` or `e.target.checked`
- Toggle uses `onCheckedChange` (not `onChange`) and passes a **boolean** directly
- SelectMenu, SearchBar, Slider, DatePicker pass **raw values** directly (no event wrapper)

### Form Components

For form inputs (TextInput, Checkbox, RadioButton, SelectMenu, Toggle, DatePicker):
- Always provide a `label` prop for accessibility
- Use `error` and `helperText` for validation feedback
- Use `required` to indicate mandatory fields
- Use `disabled` for non-interactive states
