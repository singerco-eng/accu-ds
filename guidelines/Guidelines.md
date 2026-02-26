This project has access to the AccuLynx Design System installed via the npm package `@al-ds/design-system`. Files in the guidelines directory show how to use the design system.

Always read:
- All files with a name that starts with `overview-`
- All files in the `design-tokens/` folder

Read the files in the `guidelines/components/` directory when you want to use the component with that name. For example, if you want to use Button, read `guidelines/components/button.md`.

## Quick Start

```bash
# 1. Install
npm install @al-ds/design-system
```

```css
/* 2. Load Roboto font — add to your global CSS file (e.g. index.css / globals.css) */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
```

```tsx
// 3. Import styles — add ONCE at your app entry point (e.g. main.tsx or App.tsx)
// This MUST come after any Tailwind or app-level base styles.
import '@al-ds/design-system/styles.css'
```

```tsx
// 4. Import and use components
import { Button, Card, TextInput } from '@al-ds/design-system'
```

## Setup Details

### Font Loading (REQUIRED)

The design system uses the **Roboto** font family at weights 100, 300, 400, 500, and 700. You MUST load Roboto before using any components. Add this to your global CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
```

### CSS Import Order (IMPORTANT)

The `@al-ds/design-system/styles.css` file is **self-contained** — it includes all Tailwind utility classes used by components. Import it **after** any Tailwind or app-level base styles so the design system classes take precedence:

```css
/* Correct order in your global CSS: */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

/* If using Tailwind v4 in your consuming app: */
@import "tailwindcss";

/* Design system styles LAST so they win the cascade: */
```

```tsx
// In your app entry (e.g. main.tsx):
import './index.css'                         // your global styles / Tailwind
import '@al-ds/design-system/styles.css'     // design system — import AFTER your styles
```

If using `@tailwindcss/vite`, the design system styles import in your JS entry must come after your own CSS import.

## Component Usage Guidelines - READ THIS FIRST

IMPORTANT: Always prefer to use components from `@al-ds/design-system` if they exist. For example, prefer to use a Button component from the design system rather than a regular HTML button.

IMPORTANT: Follow these steps IN ORDER before writing any code:

Step 1: Read Overview Files (REQUIRED)
Read ALL files with a name that starts with "overview-" in the guidelines directory:
- overview-components.md
- overview-icons.md

Step 2: Read Design Tokens (REQUIRED)
Read ALL files in the design-tokens/ folder:
- design-tokens/colors.md
- design-tokens/typography.md
Do NOT skip this step.

Step 3: Plan what components you need to use (REQUIRED)

Step 4: Read Component Guidelines BEFORE Using Components (REQUIRED)
BEFORE using ANY component, you MUST read its guidelines file first:
- Using Button? Read guidelines/components/button.md FIRST
- Using Modal? Read guidelines/components/modal.md FIRST
- Using TextInput? Read guidelines/components/text-input.md FIRST
- Using Table? Read guidelines/components/table.md FIRST
- Using Toolbar? Read guidelines/components/toolbar.md FIRST

Step 5: Plan what icons you need to use (REQUIRED)
Read overview-icons.md for icon usage patterns.

DO NOT write code using a component until you have read its specific guidelines.

## Design Principles

- All colors come from CSS custom properties prefixed with `--accu-*`. Never hard-code hex values.
- **Roboto** is the only font. You must load it via Google Fonts (see Quick Start above).
- Use the design system's spacing, border radius, and shadow tokens for consistency.
- All components accept a `className` prop for extending styles via Tailwind.
- All components forward refs and extend their base HTML element's props.

## CSS Rules - READ THIS

- The styles CSS is **self-contained**. It includes all Tailwind utility classes used by components. You do NOT need to install Tailwind separately.
- Typography utility classes are namespaced with `accu-` prefix: use `accu-text-body-md`, NOT `text-body-md`. See design-tokens/typography.md for the full list.
- Use standard Tailwind weight classes: `font-normal` (400), `font-medium` (500), `font-bold` (700). Do NOT use `font-regular`.
- Do NOT add global CSS resets or base styles for `button`, `input`, or `label` elements. These will break component styling. If you must add base styles, wrap them in `@layer base` so they have lower cascade priority.
- For a Tailwind v4 theme preset with shorthand classes, add: `@import "@al-ds/design-system/preset.css";`

## Tailwind Compatibility

If your consuming app also uses Tailwind CSS (especially v4), follow these rules:

1. **Import order matters**: Import `@al-ds/design-system/styles.css` AFTER your Tailwind CSS import so the DS classes win the cascade.
2. **Typography classes are namespaced**: The DS uses `accu-text-display-lg`, `accu-text-body-md`, etc. — these do NOT collide with Tailwind's `text-*` utilities. Always use the `accu-` prefix.
3. **Do NOT set base heading styles**: Avoid global CSS that sets `font-size`, `font-weight`, or `line-height` on `h1`–`h6` elements. The DS typography classes are the source of truth. If you must, wrap them in `@layer base`.
4. **Do NOT mix sizing utilities on the same element**: Don't combine `accu-text-body-md` with Tailwind's `text-sm` or `leading-5` on the same element — the DS class sets font-size, line-height, and font-family together.
5. **Font weights are standard Tailwind**: `font-normal`, `font-medium`, `font-bold` work as-is alongside DS typography classes.
