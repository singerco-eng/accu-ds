# @al-ds/design-system

AccuLynx Design System — a React component library with design tokens, built from the AccuLynx Figma Master Design Library.

## Installation

```bash
npm install @al-ds/design-system
```

### Peer Dependencies

This package requires React 18+ as a peer dependency:

```bash
npm install react react-dom
```

## Usage

### 1. Load the Roboto font

Add this to your global CSS file (e.g. `index.css` or `globals.css`):

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
```

### 2. Import styles and components

```tsx
// In your app entry point (e.g. main.tsx) — import AFTER any Tailwind or app-level CSS
import '@al-ds/design-system/styles.css'

// Then import components as needed
import { Button, Badge, Toggle } from '@al-ds/design-system'
```

The CSS import is required — it provides all design tokens (CSS custom properties), Tailwind utilities, and component styles. The CSS is fully self-contained; consumers do NOT need Tailwind installed.

**Import order matters:** If your app uses Tailwind CSS, import `@al-ds/design-system/styles.css` **after** your Tailwind CSS so the design system classes take precedence.

### Tailwind Preset (Optional)

If your project uses Tailwind CSS v4, you can import the AccuLynx theme preset for shorthand token classes:

```css
@import "@al-ds/design-system/preset.css";
```

This enables classes like `bg-accu-primary-blue`, `rounded-accu-md`, `shadow-accu-lg` instead of `bg-[var(--accu-primary-blue)]`.

### Example

```tsx
import { Button, TextInput, Card } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'

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
import { colors, typography } from '@al-ds/design-system'
```

### Typography Utility Classes

The design system provides namespaced typography utilities (to avoid Tailwind class name conflicts):

| Class | Size | Use |
|-------|------|-----|
| `accu-text-display-lg` | 42px | Large display headings |
| `accu-text-display-md` | 30px | Medium display headings |
| `accu-text-display-sm` | 18px | Small display headings |
| `accu-text-body-lg` | 16px | Large body text |
| `accu-text-body-md` | 14px | Default body text |
| `accu-text-body-sm` | 12px | Small/caption text |

Standard Tailwind font-weight classes (`font-light`, `font-normal`, `font-medium`, `font-bold`) work as expected.

## CSS Notes

- The styles CSS is **self-contained** — it includes all Tailwind utilities used by components. No need to install or configure Tailwind.
- The CSS is not minified and ships with sourcemaps for easier debugging.
- Components use CSS custom properties for all colors, radii, and effects. No hard-coded hex values.
- If your project has base styles (e.g., Tailwind's preflight or global `button`/`input` resets), they may affect component internals. Use CSS layers (`@layer base`) for your global resets to ensure proper cascade ordering.

## Figma Make Integration

This package is designed to work with [Figma Make](https://developers.figma.com/docs/code/bring-your-design-system-package/). To use it:

1. Install the package in your Figma Make file (ask the AI chat: "install @al-ds/design-system")
2. Copy the `guidelines/` folder from this package into your Figma Make project's root
3. Figma Make's AI will read the guidelines to understand how to use your components correctly

The guidelines folder is included in the npm package. You can find it at:

```
node_modules/@al-ds/design-system/guidelines/
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
