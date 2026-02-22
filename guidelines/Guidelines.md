This project has access to the AccuLynx Design System installed via the npm package `@al-ds/design-system`. Files in the guidelines directory show how to use the design system.

Always read:
- All files with a name that starts with `overview-`
- All files in the `design-tokens/` folder

Read the files in the `guidelines/components/` directory when you want to use the component with that name. For example, if you want to use Button, read `guidelines/components/button.md`.

## Setup

Every file that uses AccuLynx components must import the styles CSS once at the app root:

```tsx
import '@al-ds/design-system/styles.css'
```

Then import components as needed:

```tsx
import { Button, TextInput, Card } from '@al-ds/design-system'
```

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

Step 5: Plan what icons you need to use (REQUIRED)
Read overview-icons.md for icon usage patterns.

DO NOT write code using a component until you have read its specific guidelines.

## Design Principles

- All colors come from CSS custom properties prefixed with `--accu-*`. Never hard-code hex values.
- Roboto is the only font. It is loaded via Google Fonts.
- Use the design system's spacing, border radius, and shadow tokens for consistency.
- All components accept a `className` prop for extending styles via Tailwind.
- All components forward refs and extend their base HTML element's props.

## CSS Rules - READ THIS

- The styles CSS is **self-contained**. It includes all Tailwind utility classes used by components. You do NOT need to install Tailwind separately.
- Typography utility classes are namespaced with `accu-` prefix: use `accu-text-body-md`, NOT `text-body-md`. See design-tokens/typography.md for the full list.
- Use standard Tailwind weight classes: `font-normal` (400), `font-medium` (500), `font-bold` (700). Do NOT use `font-regular`.
- Do NOT add global CSS resets or base styles for `button`, `input`, or `label` elements. These will break component styling. If you must add base styles, wrap them in `@layer base` so they have lower cascade priority.
- For a Tailwind v4 theme preset with shorthand classes, add: `@import "@al-ds/design-system/preset.css";`
