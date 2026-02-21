# Design Tokens: Colors

AccuLynx Design System color tokens are exposed as CSS custom properties (`--accu-*`) in `@acculynx/design-system/styles.css`. Use them for consistent theming across components and custom UI.

## Import

Ensure the design system styles are loaded:

```tsx
import '@acculynx/design-system/styles.css'
```

---

## Primary Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--accu-primary-blue` | `#4680BF` | Primary actions, links, focus |
| `--accu-primary-orange` | `#F7AC4E` | Accents, warnings, highlights |

---

## Grays

| Token | Value | Usage |
|-------|-------|-------|
| `--accu-white` | `#FFFFFF` | Backgrounds, cards |
| `--accu-gray-0` | `#FAFAFA` | Subtle backgrounds |
| `--accu-gray-1` | `#EFEFEF` | Hover states, borders |
| `--accu-gray-2` | `#DCDCDC` | Dividers |
| `--accu-gray-3` | `#CCCCCC` | Disabled borders |
| `--accu-gray-4` | `#9D9D9D` | Placeholder, muted text |
| `--accu-gray-5` | `#777777` | Secondary text |
| `--accu-gray-6` | `#4D4D4D` | Body text |
| `--accu-black` | `#000000` | High-contrast text |
| `--accu-gray-bg` | `#F8F8F8` | Page backgrounds |

---

## Secondary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--accu-yellow` | `#F4C200` | Alerts, highlights |
| `--accu-red` | `#E54A48` | Errors, destructive actions |
| `--accu-green` | `#8BC541` | Success, positive states |
| `--accu-dark-green` | `#789A4D` | Success variants |
| `--accu-purple` | `#AB55A0` | Special categories |
| `--accu-cyan` | `#17A9E1` | Links, info |
| `--accu-gray-blue` | `#3D6380` | Secondary blue |
| `--accu-gold` | `#FAAE42` | Premium, badges |
| `--accu-search-highlight` | `#FFFF00` | Search result highlighting |
| `--accu-blue-dark` | `#24476C` | Dark blue accents |

---

## Light Tints

| Token | Value | Usage |
|-------|-------|-------|
| `--accu-light-red` | `#FFE3E3` | Error backgrounds |
| `--accu-light-blue` | `#EBF4FF` | Info backgrounds |
| `--accu-light-cyan` | `#D6EEF8` | Cyan-tinted backgrounds |
| `--accu-light-green` | `#ECF7DC` | Success backgrounds |
| `--accu-light-purple` | `#F2E2F0` | Purple-tinted backgrounds |
| `--accu-light-orange` | `#FFEEE3` | Warning/required backgrounds |

---

## Logo Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--accu-logo-orange` | `#F4925D` | Brand accent, milestones |
| `--accu-logo-blue` | `#1E4A6C` | Brand primary |
| `--accu-logo-gray` | `#929497` | Brand secondary |

---

## Button States

| Token | Value | Usage |
|-------|-------|-------|
| `--accu-btn-primary-hover` | `#6293C9` | Primary button hover |
| `--accu-btn-primary-disabled` | `#C7D9EC` | Primary button disabled |
| `--accu-btn-warning-hover` | `#F6A87D` | Warning button hover |
| `--accu-btn-warning-disabled` | `#FCDECE` | Warning button disabled |
| `--accu-btn-success-hover` | `#B3E16F` | Success button hover |
| `--accu-btn-success-disabled` | `#DCEEC6` | Success button disabled |
| `--accu-btn-error-hover` | `#F98482` | Error button hover |
| `--accu-btn-error-disabled` | `#F7C9C8` | Error button disabled |
| `--accu-btn-menu-blue` | `#DAEAFB` | Menu item background |
| `--accu-btn-menu-hover` | `#E1EEFC` | Menu item hover |

---

## Form

| Token | Value | Usage |
|-------|-------|-------|
| `--accu-input-bg` | `#F8F8F8` | Input background |
| `--accu-input-text` | `#313131` | Input text color |
| `--accu-focus-shadow` | `#007BFF` | Focus ring color |

---

## Disabled

| Token | Value | Usage |
|-------|-------|-------|
| `--accu-disabled-orange` | `#F6A87D` | Disabled orange elements |

---

## Using Tokens in Tailwind

Reference CSS custom properties in Tailwind using arbitrary values:

```tsx
// Background
<div className="bg-[var(--accu-primary-blue)]" />

// Text color
<p className="text-[var(--accu-gray-6)]" />

// Border
<div className="border border-[var(--accu-gray-2)]" />

// Shadow (focus ring)
<button className="focus:shadow-[var(--accu-focus-ring)]" />
```

---

## Using Tokens in CSS

```css
.my-card {
  background: var(--accu-white);
  border: 1px solid var(--accu-gray-2);
  color: var(--accu-gray-6);
}

.my-button:hover {
  background: var(--accu-btn-primary-hover);
}
```

---

## Effects (Shadows & Focus)

| Token | Value | Usage |
|-------|-------|-------|
| `--accu-focus-ring` | `0 0 0 3px rgba(0, 123, 255, 0.25)` | Focus outline for accessibility |
| `--accu-shadow-md` | `0 2px 8px rgba(0, 0, 0, 0.1)` | Medium shadow |
| `--accu-shadow-lg` | `0 4px 12px rgba(0, 0, 0, 0.1)` | Large shadow |
| `--accu-shadow-xl` | `0 0 13px rgba(0, 0, 0, 0.2)` | Extra large shadow |
| `--accu-backdrop` | `rgba(0, 0, 0, 0.5)` | Modal/drawer overlay |
