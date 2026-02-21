# Design Tokens: Typography

AccuLynx Design System typography uses **Roboto** as the primary font family. Typography tokens are provided as utility classes and CSS custom properties in `@acculynx/design-system/styles.css`.

## Import

Ensure the design system styles are loaded:

```tsx
import '@acculynx/design-system/styles.css'
```

---

## Font Family

| Token | Value |
|-------|-------|
| Font family | `'Roboto', sans-serif` |

Roboto is used for all display and body text. Ensure Roboto is loaded (e.g. via Google Fonts or your app's font setup).

---

## Typography Scale

### Display

| Class | Size | Line Height | Use Case |
|-------|------|-------------|----------|
| `.text-display-lg` | 42px | 42px | Hero headings |
| `.text-display-md` | 30px | 34px | Section headings |
| `.text-display-sm` | 18px | 22px | Subheadings |

### Body

| Class | Size | Line Height | Use Case |
|-------|------|-------------|----------|
| `.text-body-lg` | 16px | 18px | Primary body, inputs |
| `.text-body-md` | 14px | 16px | Secondary body, labels |
| `.text-body-sm` | 12px | 14px | Captions, metadata |

---

## Font Weight Classes

| Class | Weight |
|-------|--------|
| `.font-light` | 300 |
| `.font-regular` | 400 |
| `.font-medium` | 500 |
| `.font-bold` | 700 |

---

## Usage Examples

### Tailwind + Utility Classes

```tsx
<h1 className="text-display-lg font-bold">Welcome</h1>
<h2 className="text-display-md font-regular">Section Title</h2>
<p className="text-body-lg font-regular">Primary body text.</p>
<span className="text-body-sm font-light text-[var(--accu-gray-4)]">Caption</span>
```

### CSS Custom Properties (from typography.ts)

The `typography.ts` module defines a JavaScript object for programmatic use. The CSS utility classes map as follows:

| Utility Class | fontSize | lineHeight |
|---------------|----------|------------|
| `.text-display-lg` | 42px | 42px |
| `.text-display-md` | 30px | 34px |
| `.text-display-sm` | 18px | 22px |
| `.text-body-lg` | 16px | 18px |
| `.text-body-md` | 14px | 16px |
| `.text-body-sm` | 12px | 14px |

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
<p className="text-body-md font-regular text-[var(--accu-gray-6)]">
  Body text with design system color
</p>
<h2 className="text-display-sm font-bold text-[var(--accu-primary-blue)]">
  Colored heading
</h2>
```

---

## Do/Don't

- Do: Use `.text-body-lg` for primary content and form inputs
- Do: Use `.text-body-sm` for captions, labels, and secondary info
- Do: Pair weight classes (`.font-light`, `.font-regular`, `.font-bold`) with size classes
- Don't: Mix non–design-system fonts for UI text; stick to Roboto
- Don't: Use arbitrary font sizes when a token exists; prefer the scale for consistency
