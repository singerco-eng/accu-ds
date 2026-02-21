# @acculynx/design-system

AccuLynx Design System — a React component library with design tokens, built from the AccuLynx Figma Master Design Library.

## Installation

```bash
npm install @acculynx/design-system
```

### Peer Dependencies

This package requires React 18+ as a peer dependency:

```bash
npm install react react-dom
```

## Usage

Import components and the required CSS:

```tsx
import { Button, Badge, Toggle } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'
```

The CSS import is required — it provides all design tokens (CSS custom properties) and component styles.

### Example

```tsx
import { Button, TextInput, Card } from '@acculynx/design-system'
import '@acculynx/design-system/styles.css'

function LoginForm() {
  return (
    <Card>
      <TextInput label="Email" placeholder="you@acculynx.com" />
      <TextInput label="Password" type="password" />
      <Button variant="default">Sign In</Button>
      <Button variant="text">Forgot Password?</Button>
    </Card>
  )
}
```

## Components

| Component | Description |
|-----------|-------------|
| Announcement | System-wide announcement banners with dismiss |
| Avatar | User avatar with initials or image fallback |
| Badge | Status indicators and count badges |
| Breadcrumbs | Navigation breadcrumb trail |
| Button | Primary, outline, text, warning, danger, and success variants |
| Card | Container card with optional header and sections |
| Checkbox | Checkbox input with label and indeterminate state |
| ColorPicker | Color selection with swatches and custom input |
| ContextMenu | Right-click context menu with nested items |
| DatePicker | Calendar-based date selection |
| FileUploader | Drag-and-drop file upload with progress |
| Modal | Dialog overlay with customizable content |
| ModalDrawer | Slide-in drawer panel from the edge |
| Panel | Collapsible panel with header and content |
| ProgressBar | Determinate and indeterminate progress indicators |
| RadioButton | Radio button group with labels |
| SearchBar | Search input with clear and loading states |
| SelectMenu | Dropdown select with single and multi-select |
| Slider | Range slider with single and dual thumbs |
| Table | Data table with sorting, selection, and pagination |
| Tabs | Tabbed content panels |
| Tag | Removable tags and chips |
| TextInput | Text input with label, helper text, and validation |
| Tile | Content tile with milestone variant |
| Toast | Notification toasts with auto-dismiss |
| Toggle | On/off toggle switch |
| Tooltip | Hover/focus tooltip with positioning |

## Design Tokens

All components use CSS custom properties prefixed with `--accu-*`. These are automatically included when you import the styles CSS. Tokens are also available as TypeScript objects:

```tsx
import { colors, typography } from '@acculynx/design-system'
```

## Figma Make Integration

This package is designed to work with [Figma Make](https://developers.figma.com/docs/code/bring-your-design-system-package/). To use it:

1. Install the package in your Figma Make file (ask the AI chat: "install @acculynx/design-system")
2. Copy the `guidelines/` folder from this package into your Figma Make project's root
3. Figma Make's AI will read the guidelines to understand how to use your components correctly

The guidelines folder is included in the npm package. You can find it at:

```
node_modules/@acculynx/design-system/guidelines/
```

### Guidelines Structure

```
guidelines/
  Guidelines.md              — Top-level intro for Figma Make AI
  overview-components.md     — Component catalog with descriptions
  overview-icons.md          — Icon usage with Lucide React
  components/                — Per-component usage docs (27 files)
  design-tokens/             — Color and typography token reference
```

## Development

```bash
# Start the demo app
npm run dev

# Build the library
npm run build:lib

# Build the demo app
npm run build:demo

# Lint
npm run lint
```

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS 4 (styling)
- Lucide React (icons)
- CSS Custom Properties (design tokens)

## License

UNLICENSED — proprietary to AccuLynx.
