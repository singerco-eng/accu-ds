# Toolbar Figma Audit Report

**Source of truth**: OLD Figma file `ohddXX6zSRxCwGVAhuEytZ`, node `3433:1126` ("Toolbar/Desktop")
**Snapshot file**: `figma_toolbar_desktop.json`
**Date**: 2026-02-22

---

## 1. Figma Spec (extracted from API snapshot)

### Overall Structure

```
Toolbar/Desktop (COMPONENT, 1440x90, vertical stack, no gap)
  ├── Toolbar - Top/Desktop (INSTANCE, 1440x45, fill: VariableID:3411:376)
  │     ├── Left (FRAME, horizontal, paddingL/R=16, itemSpacing=24)
  │     │     ├── Logo - Acculyhnx - Reversed (INSTANCE)
  │     │     └── Location Nav (INSTANCE, horizontal, paddingL/R=8, itemSpacing=4, h=45, HUG width)
  │     │           ├── "Royal Constuction LLC (Beloit Office)" (TEXT, 12px, Regular 400, white, lineHeight=14px, style=Caption/H6)
  │     │           └── arow filled (INSTANCE, 14x14, white filled arrow — NOT a chevron)
  │     └── Right Navigation (FRAME, horizontal, paddingL/R=8, itemSpacing=2)
  │           ├── Nav - Text -  "Release Notes" (INSTANCE, h=45, paddingL/R=8, itemSpacing=8)
  │           │     ├── "Release Notes" (TEXT, 12px, Regular 400, white, centered, lineHeight=14px, style=Caption/H6)
  │           │     └── dot-sm (INSTANCE, 22x22 bounding, 11x11 ellipse, fill=logo-orange #F6945D)
  │           ├── Right Nav - Icon+Number "Tasks" (INSTANCE, paddingL=8, paddingR=8, itemSpacing=2)
  │           │     ├── task (INSTANCE, 24x24, white fill)
  │           │     └── Icon Nav - Number (INSTANCE, badge oval + "#" text)
  │           ├── Right Nav - Icon+Number "Calendar" (INSTANCE, same structure)
  │           ├── Right Nav - Icon+Number "Notifications" (INSTANCE, same structure)
  │           ├── Nav - Text -  "@Me" (INSTANCE, h=45, paddingL/R=8, itemSpacing=8)
  │           │     ├── "Nav Title" (TEXT)
  │           │     └── Icon Nav - Number
  │           ├── Nav - Text -  "User Name" (INSTANCE, same text structure)
  │           └── cog (INSTANCE, settings icon)
  │
  └── Toolbar - Bottom/Desktop (INSTANCE, 1440x45, fill: VariableID:25:1184 → #4680BF)
        ├── Left (FRAME, horizontal)
        │     ├── Toolbar 01 "New"       (Version=A, orange bg, vertical, paddingL/R=8, paddingT/B=3, itemSpacing=2, w=40, h=45)
        │     ├── Toolbar 02 "Recent"    (Version=A, orange bg, same structure)
        │     ├── Toolbar 03 "Dashboard" (Version=B, no bg, same layout)
        │     ├── Toolbar 04 "Contacts"  (Version=B)
        │     ├── Toolbar 05 "Leads"     (Version=B)
        │     ├── Toolbar 06 "Jobs"      (Version=B)
        │     ├── Toolbar 07 "Photos"    (Version=B)
        │     ├── Toolbar 08 "Track"     (Version=B)
        │     ├── Toolbar 09 "ReportsPlus" (Version=B)
        │     ├── Toolbar 10 "Production"(Version=B)
        │     └── Toolbar 11 "Tools"     (Version=B)
        └── Right (FRAME, horizontal, FILL width, h=45)
              ├── Search - Toolbar (INSTANCE, FILL width, paddingL/R=8, paddingT/B=4, bg=#F0F0F0, itemSpacing=11)
              │     ├── "Job #, Customer Name or Address" (TEXT, 14px, Regular 400, #9D9D9D, lineHeight=18px, style=Caption/H5)
              │     └── icon-search (INSTANCE, 24x24, fill=#4680BF)
              └── Toolbar Button A "Help" (Version=A, orange bg, same as Toolbar 01 structure)
```

### Key Figma Measurements

| Element | Property | Figma Value |
|---------|----------|-------------|
| **Toolbar/Desktop** | width x height | 1440 x 90 |
| **Toolbar/Desktop** | layout | VERTICAL stack, no gap |
| **Top row** | height | 45px |
| **Top row** | background | bound variable (dark navy) |
| **Top row > Left** | padding L/R | 16px |
| **Top row > Left** | item spacing | 24px (between logo and location) |
| **Location Nav** | padding L/R | 8px |
| **Location Nav** | item spacing | 4px |
| **Location Nav** | text | 12px / Regular 400 / white / lineHeight 14px |
| **Location Nav** | arrow icon | Filled arrow (custom), NOT Lucide ChevronDown |
| **Right Navigation** | padding L/R | 8px |
| **Right Navigation** | item spacing | 2px |
| **Release Notes text** | font | 12px / Regular 400 / white / centered / lineHeight 14px |
| **Release Notes dot** | size | 11x11 ellipse |
| **Release Notes dot** | color | #F6945D (logo-orange) |
| **Top row icon buttons** | icon bounding box | 24x24 |
| **Badge (Icon Nav - Number)** | shape | red oval with "#" text |
| **User/Settings** | no border-left separator shown | — |
| **Nav - Text "@Me"** | structure | text label + badge — NOT an icon-only button |
| **Bottom row** | height | 45px |
| **Bottom row** | background | #4680BF (primary-blue) |
| **Bottom row** | layout | HORIZONTAL, SPACE_BETWEEN, item-spacing=411 (forces left/right split) |
| **Nav button (Version A, "New/Recent/Help")** | layout | VERTICAL, centered |
| **Nav button (Version A)** | bg | #F6945D (logo-orange) |
| **Nav button (Version A)** | padding L/R | 8px |
| **Nav button (Version A)** | padding T/B | 3px |
| **Nav button (Version A)** | item spacing | 2px (between icon and text) |
| **Nav button (Version A)** | width x height | 40 x 45 (HUG x FIXED) |
| **Nav button text** | font | 10px / Regular 400 / white / centered / lineHeight 12px |
| **Nav button icon** | size | 24x24 (bounding), 18x18 (inner vector) |
| **Nav button (Version B, default)** | bg | none (transparent) |
| **Search bar** | bg | #F0F0F0 (light gray, VariableID:3411:254) |
| **Search bar** | padding L/R | 8px |
| **Search bar** | padding T/B | 4px |
| **Search bar** | sizing | FILL (stretches to available width) |
| **Search bar text** | font | 14px / Regular 400 / #9D9D9D / lineHeight 18px |
| **Search bar icon** | color | #4680BF (primary-blue) |
| **Search bar icon** | size | 24x24 |

### Figma Icons (custom SVG, NOT Lucide)

All icons in the Figma toolbar are **custom AccuLynx SVG icons**, not Lucide React. They are:
- `circle-add` (New)
- `circle-arrow-left` (Recent)
- `dashboard`, `directory`, `person`, `hammer`, `photos`, `paw-print`, `plus`, `calendar`, `tools` (nav)
- `circle-help` (Help)
- `task`, `calendar-blank`, `notification`, `cog` (top row)
- `search` (search bar)
- `arow filled` (location dropdown arrow — custom filled triangle)
- `dot-sm` (release notes indicator)

---

## 2. Mismatch Map (Figma vs. Implementation)

### TOP ROW (`ToolbarTopRow.tsx`)

| # | Area | Figma Spec | Current Code | File:Line |
|---|------|-----------|--------------|-----------|
| T1 | **Location arrow icon** | Custom filled triangle arrow ("arow filled", 14x14) | Lucide `ChevronDown` (14px) | ToolbarTopRow.tsx:72 |
| T2 | **Location nav padding** | paddingL/R = 8px, itemSpacing = 4px | `gap-4` (16px gap), `px-4` (16px padding) applied to parent `div`, not to Location Nav itself | ToolbarTopRow.tsx:60 |
| T3 | **Location text style** | 12px / 400 / `Caption/H6` | `accu-text-body-md` = 14px/16px | ToolbarTopRow.tsx:66 |
| T4 | **Right Navigation spacing** | itemSpacing = 2px between icon groups | No gap between icon buttons; each is w-10 with no explicit gap | ToolbarTopRow.tsx:78 |
| T5 | **Release Notes text size** | 12px / Caption/H6 | `accu-text-body-sm` = 12px (correct size, but line-height is 14px in Figma vs 14px in CSS — matches) | ToolbarTopRow.tsx:82 |
| T6 | **Release Notes dot size** | 11x11 ellipse | `h-2 w-2` = 8x8 | ToolbarTopRow.tsx:87 |
| T7 | **Top row icon size** | 24x24 bounding box (18x18 inner vector) | 18px Lucide icons in 40px-wide buttons | ToolbarTopRow.tsx:92,99,106,113 |
| T8 | **Top row icons** | Custom AccuLynx SVGs: `task`, `calendar-blank`, `notification`, `cog` | Lucide: `ClipboardList`, `Calendar`, `Bell`, `AtSign`, `Settings`, `FileText` | ToolbarTopRow.tsx:2 |
| T9 | **@Me in Figma** | "Nav - Text - " component with text label + badge (same as "Release Notes" pattern) | Icon-only button with `AtSign` icon + badge | ToolbarTopRow.tsx:112-117 |
| T10 | **User/Settings divider** | No visible border/separator in Figma spec (no stroke, backgroundColor = transparent) | `border-l border-white/20` separator | ToolbarTopRow.tsx:119 |
| T11 | **Icon button height** | 45px (full row height) | `h-[45px]` (correct) | ToolbarTopRow.tsx:36 |
| T12 | **Icon button text opacity** | White fills with no opacity on icons (fully opaque white) | `text-white/80` (80% opacity default) | ToolbarTopRow.tsx:36 |
| T13 | **Top row background** | Bound to variable (dark navy, expected `--accu-blue-dark`) | `bg-[var(--accu-blue-dark)]` (correct) | ToolbarTopRow.tsx:58 |

### BOTTOM ROW (`ToolbarBottomRow.tsx`)

| # | Area | Figma Spec | Current Code | File:Line |
|---|------|-----------|--------------|-----------|
| B1 | **Nav button layout** | VERTICAL: icon on top, text below, centered, 40x45, paddingL/R=8, paddingT/B=3, itemSpacing=2 | HORIZONTAL: icon and text side by side, `gap-1.5` (6px), `px-3` (12px), full row height | ToolbarButton.tsx:18-27 |
| B2 | **Nav button text** | 10px / Regular 400 / centered / lineHeight 12px | `accu-text-body-md` = 14px/16px | ToolbarButton.tsx:19 |
| B3 | **Nav button icon size** | 24x24 container, 18x18 inner vector | Demo uses 16px Lucide icons | ToolbarPage.tsx:19-30 |
| B4 | **Nav button icons** | Custom AccuLynx SVGs: `circle-add`, `circle-arrow-left`, `dashboard`, etc. | Lucide icons: `PlusCircle`, `Clock`, `LayoutDashboard`, etc. | ToolbarPage.tsx:3-15 |
| B5 | **Accent button bg** | #F6945D (logo-orange, rgb 0.964/0.580/0.317) | `var(--accu-logo-orange)` = #F4925D (close but different hex) | ToolbarButton.tsx:22, tokens/index.css:39 |
| B6 | **Search bar background** | #F0F0F0 (solid gray, rgb 0.941/0.941/0.941) | `bg-white/20` (20% white overlay on blue) | ToolbarBottomRow.tsx:67 |
| B7 | **Search bar text style** | 14px / Regular 400 / #9D9D9D / lineHeight 18px (Caption/H5) | `accu-text-body-sm` = 12px, `placeholder-white/50` (white at 50%, not gray) | ToolbarBottomRow.tsx:75 |
| B8 | **Search bar text color** | Input text: #9D9D9D gray | `text-white` (white text on transparent bg) | ToolbarBottomRow.tsx:75 |
| B9 | **Search bar icon** | Custom `search` SVG, 24x24, fill = #4680BF (primary-blue) | Lucide `Search` 14px, `text-white/60` | ToolbarBottomRow.tsx:68 |
| B10 | **Search bar sizing** | FILL available width (stretches) | Fixed `w-[220px]` | ToolbarBottomRow.tsx:75 |
| B11 | **Search bar height** | 45px (FILL height of row) with paddingT/B=4 | `h-[30px]` (shorter than row) | ToolbarBottomRow.tsx:66 |
| B12 | **Search bar border-radius** | None (no cornerRadius in Figma) | `rounded-[var(--accu-radius-sm)]` = 3px | ToolbarBottomRow.tsx:67 |
| B13 | **Help button** | "Toolbar Button A" with Version=A (orange bg, VERTICAL layout, same as "New") | Rendered via `ToolbarButton` with `variant='accent'` but HORIZONTAL layout | ToolbarBottomRow.tsx:91-96 |
| B14 | **Bottom row layout** | HORIZONTAL, SPACE_BETWEEN (left nav + right search/help) | `flex` with `flex-1` spacer (similar effect, but not identical spacing model) | ToolbarBottomRow.tsx:37-63 |
| B15 | **Active nav state** | No active state visible in default Figma spec (only Default and Hover variants) | `bg-white/15` active state added | ToolbarButton.tsx:24 |

### DOCS/API (`toolbar.md`, `Toolbar.types.ts`)

| # | Area | Figma Spec | Current Docs/API | File |
|---|------|-----------|-----------------|------|
| D1 | **Badge color in docs** | Red oval (matches `--accu-red`) | Docs say `--accu-red` (correct) | toolbar.md:94 |
| D2 | **Responsive behavior** | Figma only shows Desktop variant — no tablet/mobile specs | Docs describe tablet/mobile breakpoints; code implements responsive hamburger menu | toolbar.md:86-88, ToolbarBottomRow.tsx:39-47 |
| D3 | **Nav item icons in docs** | Custom AccuLynx SVGs | Docs show Lucide React icons as examples | toolbar.md:53-70 |
| D4 | **Accent token in docs** | `--accu-logo-orange` (#F4925D in DS) vs Figma #F6945D | Docs say #F4925D | toolbar.md:93 |

---

## 3. Severity Rankings

### Critical (visually wrong / would fail design review)

| ID | Issue | Rationale |
|----|-------|-----------|
| **B1** | Nav buttons are HORIZONTAL (icon + text side by side) instead of VERTICAL (icon above text) | Completely different button layout; most obvious visual difference |
| **B2** | Nav button text is 14px instead of 10px | Text is 40% larger than spec, changes the whole bottom row proportion |
| **B6** | Search bar is translucent white overlay instead of solid #F0F0F0 gray | Completely different visual treatment — gray box vs see-through tint |
| **B7** | Search placeholder is 12px white instead of 14px gray | Wrong size AND wrong color |
| **B10** | Search bar is fixed 220px instead of FILL | Search bar should stretch to fill available space |
| **B11** | Search bar is 30px tall instead of filling the 45px row | Noticeably shorter than Figma |
| **T8** | All top row icons are Lucide replacements, not AccuLynx custom SVGs | Visual identity mismatch |
| **B4** | All bottom row icons are Lucide replacements, not AccuLynx custom SVGs | Visual identity mismatch |

### Major (noticeable but usable)

| ID | Issue | Rationale |
|----|-------|-----------|
| **T1** | Location arrow is Lucide ChevronDown instead of custom filled triangle | Different icon shape |
| **T2** | Location nav padding/spacing is 16px/16px instead of 8px/4px | Wider spacing than designed |
| **T3** | Location text is 14px instead of 12px | Slightly larger than spec |
| **T6** | Release Notes dot is 8x8 instead of 11x11 | Smaller indicator dot |
| **T9** | @Me rendered as icon-only button instead of text label + badge | Different component pattern |
| **T12** | Icon default opacity is 80% instead of 100% | Icons appear slightly dimmed |
| **B3** | Nav button icons are 16px instead of 24x24/18x18 | Smaller icons than designed |
| **B9** | Search icon is 14px white instead of 24px primary-blue | Wrong size and color |
| **B12** | Search bar has 3px border-radius not in Figma | Added rounded corners |
| **B13** | Help button is horizontal layout instead of vertical | Same issue as B1 but isolated to one button |

### Minor (polish / doc only)

| ID | Issue | Rationale |
|----|-------|-----------|
| **T4** | Right nav spacing not explicitly 2px | Functional but spacing differs |
| **T5** | Release Notes text size matches (12px) | Already correct |
| **T10** | User/Settings divider exists in code but not in Figma | Could be intentional product addition |
| **T11** | Icon button height is correct at 45px | No action needed |
| **T13** | Top row background color is correct | No action needed |
| **B5** | Accent orange is #F4925D vs Figma #F6945D | 2-unit hex difference, nearly imperceptible |
| **B14** | Bottom row flex layout achieves similar result to SPACE_BETWEEN | Functionally equivalent |
| **B15** | Active nav state exists in code but not in Figma default | Likely intentional product addition |
| **D2** | Responsive behavior is code-only (no Figma mobile spec) | Not auditable from Figma |
| **D3** | Docs show Lucide icons | Should be updated when icons are fixed |
| **D4** | Accent token hex is close but not exact | May need Figma variable resolution |

---

## 4. Remediation Backlog

### Phase 1: Non-breaking visual/token parity fixes

Priority order (quick wins first):

| Priority | ID(s) | Fix | File(s) | Effort |
|----------|-------|-----|---------|--------|
| P1 | B1, B13 | Change `ToolbarButton` layout from horizontal to vertical: icon on top, text below, `flex-col items-center justify-center`, width ~40px, paddingL/R=8, paddingT/B=3, itemSpacing=2 | `ToolbarButton.tsx` | S |
| P2 | B2 | Change nav button text from `accu-text-body-md` (14px) to inline `fontSize: 10px; lineHeight: 12px` or add a new `accu-text-caption` utility | `ToolbarButton.tsx` | XS |
| P3 | B6, B7, B8, B10, B11, B12 | Rework search bar: remove `bg-white/20`, `rounded-*`, and `h-[30px]`; apply solid `bg-[#F0F0F0]` or `bg-[var(--accu-gray-1)]`, height=FILL (remove explicit h), width=FILL (`flex-1`), placeholder color = `text-[var(--accu-gray-4)]`, font = 14px, remove border-radius | `ToolbarBottomRow.tsx` | M |
| P4 | B9 | Change search icon to 24px, color = `text-[var(--accu-primary-blue)]` | `ToolbarBottomRow.tsx` | XS |
| P5 | T3 | Change location text from `accu-text-body-md` (14px) to `accu-text-body-sm` (12px) | `ToolbarTopRow.tsx:66` | XS |
| P6 | T2 | Change location nav area: inner padding to 8px, gap to 4px (currently 16px/16px) | `ToolbarTopRow.tsx:60` | XS |
| P7 | T6 | Change release notes dot from `h-2 w-2` (8px) to `h-[11px] w-[11px]` | `ToolbarTopRow.tsx:87` | XS |
| P8 | T12 | Change icon default color from `text-white/80` to `text-white` | `ToolbarTopRow.tsx:36` | XS |
| P9 | B3 | Update demo/guidelines to use 18px icons (not 16px) for nav buttons | `ToolbarPage.tsx` | XS |
| P10 | B5 | Verify `--accu-logo-orange` against Figma variable resolution; update if needed | `tokens/index.css:39` | XS |

### Phase 2: Icon system alignment

| Priority | ID(s) | Fix | File(s) | Effort |
|----------|-------|-----|---------|--------|
| P11 | T8, B4 | Export AccuLynx custom toolbar icons from Figma as SVG components. Replace Lucide icons in: ToolbarTopRow (task, calendar-blank, notification, cog, FileText), ToolbarPage demo (circle-add, circle-arrow-left, dashboard, directory, etc.) | New icon files + `ToolbarTopRow.tsx` + `ToolbarPage.tsx` | L |
| P12 | T1 | Replace Lucide `ChevronDown` with custom "arow filled" SVG from Figma | `ToolbarTopRow.tsx:72` | S |
| P13 | T9 | Refactor @Me from icon-only to text+badge pattern matching "Nav - Text -" Figma component | `ToolbarTopRow.tsx:112-117` | S |

### Phase 3: API/docs cleanup and edge cases

| Priority | ID(s) | Fix | File(s) | Effort |
|----------|-------|-----|---------|--------|
| P14 | T10 | Evaluate: keep or remove User/Settings border-left divider (not in Figma, may be intentional) | `ToolbarTopRow.tsx:119` | XS |
| P15 | D3, D4 | Update `toolbar.md` guidelines: correct icon references, token hex values, and nav button layout description | `guidelines/components/toolbar.md` | S |
| P16 | B15 | Evaluate: keep active nav state (`bg-white/15`) as product addition or remove (not in Figma default) | `ToolbarButton.tsx:24` | XS |
| P17 | D2 | Note: responsive behavior is implementation-only (no Figma spec). Flag for separate design spec request. | N/A | — |

---

## Summary

**8 Critical** issues dominate: the bottom-row nav buttons have the wrong layout direction (horizontal vs vertical), the search bar is completely different (transparent tint vs solid gray, wrong size), text sizing is wrong, and all icons are Lucide replacements instead of AccuLynx custom SVGs.

**10 Major** issues involve spacing, sizing, and component pattern differences.

**11 Minor** items are polish, documentation, or intentional product divergences.

Phase 1 (visual parity) can be completed without icon asset work. Phase 2 requires exporting SVGs from Figma. Phase 3 is docs/cleanup.
