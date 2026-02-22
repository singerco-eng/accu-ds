# Design Tokens: Typography

AccuLynx Design System typography uses **Roboto** as the primary font family. Typography tokens are provided as utility classes and CSS custom properties in `@al-ds/design-system/styles.css`.

## Import

Ensure the design system styles are loaded:

```tsx
import '@al-ds/design-system/styles.css'
```

---

## Font Family

| Token | Value |
|-------|-------|
| Font family | `'Roboto', sans-serif` |

Roboto is used for all display and body text. Ensure Roboto is loaded (e.g. via Google Fonts or your app's font setup).

---

## Typography Scale

IMPORTANT: Typography classes are prefixed with `accu-` to avoid conflicts with Tailwind's built-in classes.

### Display

| Class | Size | Line Height | Use Case |
|-------|------|-------------|----------|
| `accu-text-display-lg` | 42px | 42px | Hero headings |
| `accu-text-display-md` | 30px | 34px | Section headings |
| `accu-text-display-sm` | 18px | 22px | Subheadings |

### Body

| Class | Size | Line Height | Use Case |
|-------|------|-------------|----------|
| `accu-text-body-lg` | 16px | 18px | Primary body, inputs |
| `accu-text-body-md` | 14px | 16px | Secondary body, labels |
| `accu-text-body-sm` | 12px | 14px | Captions, metadata |

---

## Font Weight Classes

Use standard Tailwind font-weight classes. Do NOT use `font-regular` — use `font-normal` instead.

| Class | Weight |
|-------|--------|
| `font-light` | 300 |
| `font-normal` | 400 |
| `font-medium` | 500 |
| `font-bold` | 700 |

---

## Usage Examples

### Tailwind + Utility Classes

```tsx
<h1 className="accu-text-display-lg font-bold">Welcome</h1>
<h2 className="accu-text-display-md font-normal">Section Title</h2>
<p className="accu-text-body-lg font-normal">Primary body text.</p>
<span className="accu-text-body-sm font-light text-[var(--accu-gray-4)]">Caption</span>
```

### CSS Custom Properties (from typography.ts)

The `typography.ts` module defines a JavaScript object for programmatic use. The CSS utility classes map as follows:

| Utility Class | fontSize | lineHeight |
|---------------|----------|------------|
| `accu-text-display-lg` | 42px | 42px |
| `accu-text-display-md` | 30px | 34px |
| `accu-text-display-sm` | 18px | 22px |
| `accu-text-body-lg` | 16px | 18px |
| `accu-text-body-md` | 14px | 16px |
| `accu-text-body-sm` | 12px | 14px |

---

## Custom Typography (typography.ts)

Additional custom styles are defined in `typography.ts` for specific components:

| Name | Size | Line Height | Weight | Notes |
|------|------|-------------|--------|-------|
| `modalTitle` | 42px | 42px | 100 | Modal headers |
| `tabbedCardLabel` | 20px | 20px | 300 | Tab labels |
| `buttonLabel` | 18px | 20px | 400/500/700 | Button text |
| `breadcrumbHover` | 12px | 14px | 500 | Breadcrumb hover |
| `allCapsLight` | 12px | 14px | 300 | Uppercase, light |
| `allCapsRegular` | 10px | 10px | 400 | Uppercase |
| `allCapsBold` | 10px | 12px | 700 | Uppercase, bold |
| `historyText` | 10px | 12px | 400 | History/audit text |
| `italicSubtext` | 10px | 12px | 400 | Italic subtext |
| `italicDesc` | 14px | 14px | 400 | Italic description |

These are available via the `typography` export for programmatic use; equivalent CSS can be composed from the values above.

---

## Combining with Color Tokens

```tsx
<p className="accu-text-body-md font-normal text-[var(--accu-gray-6)]">
  Body text with design system color
</p>
<h2 className="accu-text-display-sm font-bold text-[var(--accu-primary-blue)]">
  Colored heading
</h2>
```

---

## Do/Don't

- Do: Use `accu-text-body-lg` for primary content and form inputs
- Do: Use `accu-text-body-sm` for captions, labels, and secondary info
- Do: Pair Tailwind weight classes (`font-light`, `font-normal`, `font-bold`) with accu size classes
- Do: Use `font-normal` (not `font-regular`) for weight 400
- Don't: Mix non-design-system fonts for UI text; stick to Roboto
- Don't: Use arbitrary font sizes when a token exists; prefer the scale for consistency
- Don't: Use unprefixed `text-body-md` or `text-display-lg` — always use the `accu-` prefix
