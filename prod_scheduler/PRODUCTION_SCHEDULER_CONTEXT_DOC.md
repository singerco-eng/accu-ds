# Production Scheduler Context Doc

# Introduction

Transform the AccuLynx Production Scheduler from a legacy timeline tool into a **unified production command center**. Users will manage the full lifecycle of production work — from unscheduled orders to completed jobs — in one place, with the information and views they need to make scheduling decisions without clicking through multiple pages.

**What the Production Scheduler manages:**

- Crew scheduling across trades and locations
- Material delivery tracking (WOD: Waiting → Ordered → Delivered)
- Labor progress tracking (AWC: Assigned → Working → Completed)
- Unscheduled work queue (to-be-scheduled drawer)
- Scheduled work oversight (currently on a separate Order Manager page)

---

## Core Concepts

| Concept | Definition |
|---------|-----------|
| **Job** | A customer project (e.g., a roof replacement). A job can have multiple orders. |
| **Trade Order** | The order container, scoped to a single trade (Roofing, Siding, Solar, Gutters, etc.). AccuLynx uses "order" to refer to this container. A trade order contains a material component, a labor component, or both. |
| **Order Types** | An order can be created as **Material and Labor** (most common), **Material Delivery Only**, or **Labor Only**. The type determines which components exist inside the order. |
| **Order Status** | Every order moves through a lifecycle: **Draft** → **Submitted** → **Approved** → material/labor tracking → **Completed**. Only Approved orders enter the Production Scheduler. See the Order Lifecycle section for details. |
| **Material Order** | The material side of an order: supplier, delivery date, line items, pricing. Tracked via WOD status (Waiting → Ordered → Delivered). |
| **Labor Ticket** | The labor side of an order: crew assignment, start/end dates, contacts, instructions, checklists. Tracked via AWC status (Assigned → Working → Completed). |
| **Crew** | A named group of workers assigned to labor tickets. Crews have a trade, a color, and an available/unavailable flag. |
| **Appointment** | Created automatically when a labor ticket has all required fields (crew, start date, end date). Appears on the calendar timeline. |
| **PO Number** | The order identifier. Format: `{job number}-{sequence}` (e.g., RC-7015-2 = second order on job RC-7015). Visible across the scheduler, drawers, and Order Manager. |
| **Production Overview** | A drawer that shows job-level context: customer info, payment history, all associated orders, production notes, and order flags. Accessible from any calendar item or the to-be-scheduled drawer. |

---

## Features (by document order)

The following development features appear in this document in the order listed. The list is sourced from the [Production Scheduler Roadmap](docs/research/PRODUCTION_SCHEDULER_ROADMAP.md); any feature in this doc that was missing from the roadmap has been added there (except WOD/AWC status changes, which are documented as context only).

| # | Feature | Description |
|---|---------|-------------|
| F1 | **Full Calendar Integration** (Calendar Timeline) | Replace the current Viz.js-powered calendar with Full Calendar to achieve parity with the main AccuLynx Calendar and enable modern scheduling features (day/week/month views, native drag-and-drop, resource grouping, overlap prevention). |
| F2 | **Priority List Drawer / Scheduling Panel** (To-Be-Scheduled Drawer & Order Manager) | Redesign the scheduling drawer and unify it with the Order Manager into a single Scheduling Panel on the Production Scheduler page — list/table and card view, panel mode alongside calendar and full-screen mode, shared filters and bulk actions. |
| F3 | **Crew Calendars in Labor Ticket** | When scheduling a crew via the labor ticket, show crew calendar availability so users can see existing appointments and avoid conflicts without switching to the Production Scheduler. |
| F4 | **User/Attendee Assignment** | Allow assigning AccuLynx users (sales reps, project managers) as attendees on labor appointments, separate from the crew — address "sales rep calendar clogged" and support optional notification/blocking. |
| F5 | **Non-Working Days / Holiday Blocking** | Allow companies to mark specific days as non-working for production (holidays, company closures). Full days only; visual indicator on calendar; soft warning when scheduling on a blocked day. |
| F6 | **Weather Integration** | Show weather forecasts (icon, temp, precipitation, AM/PM) for scheduled labor appointments based on job address to support planning and rescheduling decisions. |
| F7a | **Customizable Appointment Previews** | Let users configure what information appears on calendar appointment blocks (title, subtitle, details) — e.g. PO#, customer, address, time, trade — per user, across all calendar views. |
| F9 | **Customizable Scheduling Panel** | Let users configure the Scheduling Panel: which columns appear, order, show/hide; optional card view with customizable fields; distinct from calendar appointment preview configuration. |
| F7b | **Saved View Presets** | Save a named preset that captures calendar filters, date range, appointment preview configuration, and Scheduling Panel configuration; quick-switch and persist across sessions. |
| F10 | **Map View** | Geographic view of scheduled appointments as pins on an interactive map, color-coded by crew. Combined with weather overlay (precipitation, forecast) to visualize which crews and jobs are in weather-affected areas. Leverages geocoded appointment data in Elasticsearch. |
| F11 | **Crew Availability in Production Scheduler** | Surface the existing crew available/unavailable flag on the Production Scheduler timeline, Scheduling Panel, and crew selection flows. Flag exists today but is invisible during scheduling — unavailable crews show as normal rows with no indicator. |

---

# Order Lifecycle

The Production Scheduler does not create orders — it receives them. Understanding where orders come from, what they contain, and how they progress through the system is essential context for everything that follows.

---

## Where Orders Are Created

Orders are created on the **job page** inside AccuLynx. A user navigates to a specific customer job and creates a new order using the **Order Builder** — the form where materials, labor, pricing, and supplier are configured.

**Starting points for the Order Builder:**

| Starting Point | Description |
|----------------|-------------|
| **Blank** | Empty order — user builds from scratch |
| **Estimate** | Import the salesperson's estimate as a starting point. The estimate is a customized version of the materials and pricing created during the sales process. |
| **Template** | Pre-built item list with calculations tied to measurement fields. Companies set these up for repeatable order types. |

## Order Creation Flow

The Order Builder walks the user through the following steps:

1. **Choose pricing source / supplier** — integrated suppliers (e.g., SRS) pull live pricing via API; non-integrated suppliers use manual entry
2. **Choose order type** — Material and Labor, Material Delivery Only, or Labor Only. This determines which sections of the order appear.
3. **Choose trade** — Roofing, Siding, Solar, Gutters, etc. This determines how the order is grouped on the Production Scheduler timeline.
4. **Choose starting point** — Blank, Estimate, or Template (see above)
5. **Build material order** — select products, colors, quantities, pricing. Integrated suppliers show live product catalogs. Incomplete items are flagged (must complete or delete before saving).
6. **Build labor order** — add labor items, crew notes (item-level and overall), set labor pricing
7. **Schedule delivery** — delivery method (delivery vs. pickup), delivery date, time window (AM / PM / Anytime), delivery instructions
8. **Schedule crew** — select crew, set start and end dates. System warns if crew has a schedule conflict (soft warning, does not block save).
9. **Save** — choose a status (see below)

Steps 7 and 8 (delivery and crew scheduling) can be completed during order creation or deferred and handled later via the Production Scheduler.

## Order Status Lifecycle

Every order has a status that progresses through a defined lifecycle. The order detail page displays this as a visual progress bar:

**Draft → Submitted → Approved → Material (W-O-D) → Labor (A-W-C) → Completed**

**Save options and what they mean:**

| Status | Meaning | Who typically sets it |
|--------|---------|----------------------|
| **Draft** | Still building the order, incomplete | Salesperson or production staff |
| **Submitted** | Salesperson handing off to production for review | Salesperson |
| **Approved** | Ready for production scheduling | Production manager or salesperson |
| **Send to Supplier** | Locks the material order permanently — no further edits to materials. Moves material status to Ordered. | Production staff |

**Gate for the Production Scheduler:**

An order appears in the to-be-scheduled drawer ONLY when both conditions are met:

1. The **job** is in an approved milestone (not prospect)
2. The **order** is saved as **Approved**

Draft and Submitted orders never enter the Production Scheduler. This is the handoff point between sales and production.

## Status Transitions: Automatic vs. Manual

Once an order is Approved and enters the Production Scheduler, its material and labor components are tracked via the WOD/AWC system (see the WOD / AWC Status System section for visual states and color coding). The following table covers every status transition across the full order lifecycle:

| Transition | Auto / Manual | Details |
|------------|---------------|---------|
| Draft → Submitted → Approved | Manual | User explicitly saves as each status |
| W → O (Waiting to Ordered) | Manual | Triggered by "Place Order" or "Send to Supplier" action. Emailing a supplier alone does not change the status — the user must formally place the order. |
| O → D (Ordered to Delivered) | Both | Manual by default — production staff marks delivery confirmed on site. Integrated suppliers (e.g., SRS) can auto-update delivery status via webhook, pushing delivery confirmation, photos, and bills. This is supplier-dependent and not universal. |
| A → W (Assigned to Working) | Automatic | System assumes the crew starts on the scheduled start date. This is the only fully automatic status transition. |
| W → C (Working to Completed) | Manual only | System never auto-completes labor. The Mobile Crew App allows crews to signal they are done, but this is informational only — a back-office user must still manually confirm completion. |
| Order → Completed | Automatic | Fires when both Material D (Delivered) and Labor C (Completed) are set. Cannot be set manually — it is derived from the two sub-statuses. |

## How an Order Reaches the Calendar

```
Job Created → Order Created (on job page via Order Builder)
                    │
            Save as Approved
            (+ job in approved milestone)
                    │
                    ▼
    Missing required fields → TO-BE-SCHEDULED DRAWER
                                        │
                              Fill all 4 fields:
                              1. Supplier
                              2. Delivery Date
                              3. Crew
                              4. Start/End Date
                                        │
                                        ▼
                              CALENDAR TIMELINE
                              (appointment created)
```

An order exits the to-be-scheduled drawer and appears on the calendar once all four scheduling fields are populated. This can happen during order creation (steps 7-8 above) or later via the "Add Event to Scheduler" modal on the Production Scheduler page.

---

# Calendar Timeline

The calendar is the primary interface of the Production Scheduler. It displays scheduled work as appointment blocks on a crew-by-time grid.

---

## Current State

| Component | Technology | Details |
|-----------|-----------|---------|
| Calendar engine | Viz.js (custom implementation) | Custom timeline code with known performance issues |
| Time axis | Horizontal | Left-to-right, one week visible at a time |
| Resource axis | Vertical rows | Grouped by Trade → Crew |
| View options | Week only | Up to 3-week zoom-out. No day view, no month view. |
| Navigation | Custom buttons | Previous/Next week, Today, date range picker |
| Appointment cards | Custom rendering | Icon + customer name. Color-coded by assigned crew. No PO#, address, trade, time, or WOD/AWC status visible on the card. No user configuration. See card visual states below. |
| Click behavior | Two-step: select then act | Click puts item into a **selected state** with an eye icon. User can only drag the item once it is in this selected state. Clicking the eye icon on a material item opens the Material Order Drawer. Clicking the eye icon on a labor item opens the Labor Ticket Drawer. |
| Drag-and-drop | Move appointments | Only available after item is selected (clicked first). Can move between crews and dates. Cross-trade restriction not enforced. Dragging from the to-be-scheduled drawer onto the calendar opens the "Add Event to Scheduler" modal — dropping on a date pre-fills the delivery date but does **not** auto-fill the crew. |
| Filters | Modal-based | Event Type, Trades, Crews. No search. No persistence. Resets on reload. |
| Full screen | Supported | Hides top nav bar |
| Condensed view | Supported | Hides the crew name column on the left and collapses empty space between appointments. Blocks stack tightly under their trade group header. Crew identity is conveyed through block color only. Trade headers (Decking, Gutters, Repair, Roofing- Asphalt Shingles, etc.) remain visible as row group labels. |
| Print agenda | Modal | Date range, order types, location filter, PDF export |

**Appointment Card Visual States:**

| Visual Indicator | Meaning |
|-----------------|---------|
| Truck icon | Material Order |
| Wrench icon | Labor Order |
| Crew color bar (left edge) | Identifies the assigned crew |
| Gray stripe background | Material order with no associated labor order |
| Gray dot background | Assigned crew has been overridden and is not found in the labor manager |
| Eye icon (on selected card) | Card is in selected state — click the eye to open the Material Order or Labor Ticket drawer |
| Checkmark icon | Job has been closed |

Cards show only the icon and customer name. There is no WOD/AWC status, PO#, address, trade, or time on the card. The only way to distinguish order type is the icon (truck vs. wrench), and the only way to identify the crew is the color bar.

**Three drawer types on the Production Scheduler:**

| Drawer | Purpose | Contents |
|--------|---------|----------|
| **Production Overview** | Job-level context for an order. The starting point when a user wants to see what's going on with a job. | Job header (linked to full job page), Customer (name, phone, address), Payment History (sales rep, job value, money received), Associated Orders table (all orders on this job: PO#, trade, order name, status, status date), Production Note (editable, per-order), Criteria/Order Flag (editable, per-order: Rush/Hold/Special/None). |
| **Material Order** | Detail view for a material delivery. Everything about getting materials to the job site. | Job header, Delivery (date, time, method, confirmation person — editable), Delivery Instructions (editable), Supplier (name, order date — editable), Material Order Table (line items: quantity, unit, cost, total). Includes a Production Overview button to see job-level context. |
| **Labor Ticket** | Detail view for a labor assignment. Everything about getting a crew to the job site and tracking their work. | Job header, Dates (status, start/end — editable), Crew Assignment (crew, contacts, Mobile Crew App link — editable), Labor Contacts (editable), Labor Order (status + line items — editable), Crew Instructions (editable), Shared Documents, Shared Photos, Checklist, Disclaimer. Action buttons: Production Overview, Copy Ticket, Email/Print/PDF. |

**What opens what:**

| Trigger | Opens |
|---------|-------|
| Click a PO# / job row (from to-be-scheduled drawer) | Production Overview |
| Click a timeline item → select → click eye icon (material) | Material Order |
| Click a timeline item → select → click eye icon (labor) | Labor Ticket |
| Click "Production Overview" button from Material Order or Labor Ticket | Production Overview |

### Production Overview Drawer

**Accessible from:** PO# click in drawer, job row click on calendar, "Production Overview" button in Material Order or Labor Ticket drawers.

**Sections (all collapsible):**

| Section | Content | Editable |
|---------|---------|:--------:|
| Job Header | Job number + customer name. Link to full job page. | No |
| Customer | Name, phone, address | No |
| Payment History | Sales rep, approved job value, money received | No |
| Associated Orders | Table: PO#, Trade, Order Name, Status, Status Date | No |
| Production Note | Free-text note per order | Yes |
| Criteria - Order Flag | Rush / Hold / Special / None + description | Yes |

The Production Overview is job-scoped at the top (shows all orders) and order-scoped at the bottom (note and flag are per-order).

### Material Order Drawer

**Accessible from:** Clicking a truck icon (material delivery) on the calendar, or clicking the DELIVERY date column in the to-be-scheduled drawer.

| Section | Content | Editable |
|---------|---------|:--------:|
| Job Header | Job number + customer name | No |
| Delivery | Date, time, method, confirmation person | Yes |
| Delivery Instructions | Free-text | Yes |
| Supplier | Supplier name, order date | Yes |
| Material Order Table | Line items: quantity, unit, cost, total | View only |

Includes a Production Overview button to see job-level context.

### Labor Ticket Drawer

**Accessible from:** Clicking the eye icon on a labor order in the calendar, or clicking the START/END DATE columns in the to-be-scheduled drawer.

| Section | Content | Editable |
|---------|---------|:--------:|
| Job Header | Job number + customer name | No |
| Dates | Labor progress status, start date, end date | Yes |
| Crew Assignment | Crew name, contacts, Mobile Crew App link | Yes |
| Labor Contacts | Name, job role, phone/email | Yes |
| Labor Order | Order status + line items | Yes |
| Crew Instructions | Free-text, shared via Mobile Crew App | Yes |
| Shared Documents | Attached documents | Yes |
| Shared Photos | Attached photos | Yes |
| Checklist | Checklist items for crew | Yes |
| Disclaimer | Legal text + signature requirements | Yes |

Action buttons: Production Overview, Copy Ticket, Email / Print / PDF.

**Current Limitations:**

- Week-only view limits planning for multi-week and multi-trade projects
- Card content is fixed — users cannot see Order Number #, address, trade, or WOD/AWC status without clicking into the order
- Filters do not persist across sessions
- No saved view presets
- Viz.js is legacy technology
- Two-step interaction (click to select, then click eye or drag) adds friction to every action

---

## Future State

**Technology Change:** Replace Viz.js with Full Calendar (Premium, $480/year). Full Calendar natively supports timeline views, resource grouping, drag-and-drop, custom event rendering, and a Vue 3 component.

| Component | Change |
|-----------|--------|
| Calendar engine | Full Calendar |
| View options | Week, month, custom date range — native view switching. No-overlap setting on week/month views. |
| Resource grouping | Trade → Crew grouping — same model as current |
| Appointment cards | Fully customizable — users configure what fields display on each card |
| Click vs. drag | Single-step interaction. Click opens drawer directly. Drag moves the appointment. No intermediate selected state needed. |
| Overlap prevention | Configurable overlap rules per crew — prevent double-booking |
| Cross-trade drag restriction | System checks target crew's trade before allowing a drop |
| Date navigation | Native prev/next/today + jump-to-date |
| Now indicator | Current time line on the calendar |

**Migration:** Full replacement of Viz.js. The Vue 3 component can be introduced alongside existing Angular code during transition. All existing business logic (appointment creation, status updates, drawer interactions) is preserved — only the rendering engine changes.

**Streamlined scheduling flow:** The current "Add Event to Scheduler" modal introduces friction — the user drags an order to a specific crew row and date on a drag-and-drop calendar, yet the system does not auto-fill the crew and still requires a full form. With Full Calendar's native drop handling, the system could infer both the target crew (from the row dropped on) and the date (from the column dropped on), reducing or eliminating the modal for simple scheduling actions. Material delivery date and supplier could auto-fill from existing order data. The modal could be reserved for cases that genuinely require user input (e.g., "Never Schedule," "Add Dates Later," "Other" crew, or overriding defaults). Design should determine what a streamlined drag-to-schedule interaction looks like.

**Spike Required:** Confirm overlap prevention works correctly in the timeline resource view (same crew + same time = blocked).

---

# To-Be-Scheduled Drawer & Order Manager → Scheduling Panel

The to-be-scheduled drawer and Order Manager are two legacy interfaces that serve different phases of the same workflow. The drawer shows unscheduled work. The Order Manager shows scheduled work. They live on different pages. The future state unifies these into a single **Scheduling Panel** on the Production Scheduler page. The Order Manager page could be maintained as a full scheduled view, but ideally the Scheduling Panel itself should incorporate both scheduled and to-be-scheduled work — and support a full-screen mode to replace the need for a separate page.

---

## Current State

### 1. To-Be-Scheduled Drawer

**Location:** Bottom panel of the Production Scheduler page.
**Purpose:** Shows orders missing one or more of the 4 required fields (supplier, delivery date, crew, start/end date).

**Columns:**

| Column | Data |
|--------|------|
| + icon | Add to priority list subset |
| REP | Sales rep initials |
| TRADE | Trade type (Roofing, Decking, Solar, etc.) |
| PO | Order number — clickable, opens order details |
| CUSTOMER | Customer name |
| PHONE | Customer phone number |
| LOCATION ADDRESS | Full job address |
| AGE (default sort) | Days since order created |
| HAS $ | Deposit received (yes/no) |
| CRITERIA | Order flags: Rush, Hold, Special, None |
| WOD | Material status (Waiting / Ordered / Delivered) |
| DELIVERY | Material delivery date |
| SUPPLIER | Supplier name |
| AWC | Labor status (Assigned / Working / Completed) |
| START DATE | Crew start date |
| END DATE | Crew end date |
| CREW | Assigned crew (colored bar). Hovering the color block shows the crew name in a tooltip. |

**Search:** The drawer has a search field that filters by customer name, address, PO#, and trade.

**Interactions:**

| Action | Result |
|--------|--------|
| Drag row | Drop onto calendar — opens the "Add Event to Scheduler" modal (see below) |
| Click PO# | Opens Production Overview for that order |
| Click CUSTOMER | Opens the full job page |
| Click DELIVERY date | Opens Material Order Drawer |
| Click START/END DATE | Opens Labor Ticket Drawer |
| Click CRITERIA | Not clickable — display only |
| Click SUPPLIER | Not clickable — display only |
| Sort by column header | Reorders the table |
| Click + icon | Adds row to priority list subset |

**Current Limitations:**

- Takes up 600-800px of vertical space
- Calendar filters are in a separate modal — no persistence (the drawer itself does have a search field)
- No saved sort/filter preferences
- Shows only unscheduled work — no visibility into scheduled work from this page
- No indicator distinguishing "almost ready" (3 of 4 fields) from "barely started" (1 of 4)

#### "Add Event to Scheduler" Modal

When a user drags an order from the to-be-scheduled drawer onto the calendar, or initiates scheduling from the to-be-scheduled list, the **"Add Event to Scheduler" modal** appears. This is the primary mechanism for moving an order onto the calendar.

**Modal structure:**

The modal begins with a job header (customer name, PO#, address, phone, sales rep, trade) and a "Please Note" banner: "All items on this form must be provided in order to move this job out of the To Be Scheduled drawer."

**"What are you scheduling?" — event type selection:**

The user chooses one of three options. This determines which sections of the form appear:

- **Material and Labor** — shows both Material Order and Labor Order sections in a single combined form.
- **Material Delivery Only** — shows only the Material Order section.
- **Labor Only** — shows only the Labor Order section.

**Material Order section:**

| Field | Details |
|-------|---------|
| Supplier | Dropdown, pre-filled if supplier was selected during order creation. Override checkbox allows typing a custom supplier name. |
| Material Delivery Date | Date picker, pre-filled from the calendar date the item was dropped on. Can be changed. |
| Time | Dropdown with delivery windows: **AM** (morning), **PM** (afternoon), **Anytime**. These are supplier delivery windows, not exact times — suppliers operate in time slots, not specific hours. |

**Labor Order section:**

| Field | Details |
|-------|---------|
| Crew | Dropdown of available crews. **Not auto-filled** — even when dragging onto a specific crew row, the user must manually select a crew. Unavailable crews are hidden from this dropdown. |
| "Other" checkbox | Allows entering a custom/one-off crew name (e.g., a specialist or ad-hoc labor) that is not formally set up in the system. |
| Date options | Three radio buttons: **Add Dates Later** (know the crew but not the date — leaves it pending), **Never Schedule** (see below), **Add Start & End Dates** (standard date/time picker with start date, start time, end date, end time, and "All Day" checkbox). |
| Crew busy warning | If the selected crew already has work scheduled on the chosen dates, a warning appears: "Your crew is busy during these dates and times." This is a **soft warning** — does not block the save. |

**Combined form:** When "Material and Labor" is selected, both sections appear in a single scrollable modal. The user fills out supplier + delivery date + time for materials, then crew + dates for labor, all in one pass. This is the most common flow.

**"Never Schedule" use case:**

The "Never Schedule" option exists for orders where a specific date cannot or will not be assigned. The primary use case is crews that manage their own schedule — particularly gutter crews and repair technicians. The workflow is: the production scheduler hands the crew a batch of jobs (e.g., "here are 10 jobs, complete them in the next two weeks"), and the crew decides when to do each one. The company cannot say whether it will be Monday, Wednesday, or Friday.

"Never Schedule" satisfies the system requirement for a date selection by explicitly overriding it. The order is removed from the to-be-scheduled drawer. However, it does not appear on the calendar (there is no date to place it on), making these orders harder to find later. They can be located via the Order Manager using the "Without Dates" filter.

**UX oddity:** The Production Scheduler has a drag-and-drop calendar, yet dragging an order onto it still requires filling out a form. Dropping an order on a specific date pre-fills the delivery date but does not auto-fill the crew — even if dropped directly onto a crew's row. The modal adds friction to what could be a more direct interaction.

### 2. Order Manager

**Location:** Separate page from the Production Scheduler.
**Purpose:** List/table view of all scheduled orders with status tracking and bulk actions.

**Structure:**

| Tab | Status Columns | Actions Menu |
|-----|---------------|-------------|
| Material | Waiting to Order → Ordered → Delivered | Email supplier, Place orders, Mark delivered |
| Labor | Assigned → Working → Completed | Bulk Reassignment, Email Selected Orders, Print Selected Orders, Working Status, Completed Status |

**Show toggle:** Material / Labor selector at the top of the page switches between tabs.

**Filter Order Manager (modal):**

| Filter Section | Options |
|---------------|---------|
| Age | > 0 days old, > 5 days old, > 10 days old, > 20 days old (radio buttons) |
| Show Orders | With Dates, Without Dates (checkboxes) |
| Trades | Collapsible — trade type selection |
| Criteria | Rush, Hold, Special (checkboxes) |
| Has Money | Has Money, None (checkboxes) |

Filters are in a modal with Cancel / Apply buttons. "Without Dates" is the only way to find orders that have been scheduled without a start date.

**Automation:** Labor auto-moves from Assigned → Working on crew start date. Working → Completed never auto-completes.

**Labor Bulk Reassignment:**

Two modes, accessed from Actions → Bulk Reassignment:

| Mode | What It Does | Configuration |
|------|-------------|---------------|
| **Date reassignment** | Moves selected orders forward by a set number of days | Amount of Days dropdown: 1 day, 2 days, 3 days, 4 days, 5 days, 6 days, a week, or Custom |
| **Crew reassignment** | Reassigns selected orders to a different crew | Crew dropdown organized by crew lead name (e.g., Appleton, Ricky → Commercial Crew, Dan's Exteriors Co, Gussie's Gutters) |

Both modes show a confirmation table before saving:

| Date Reassignment Columns | Crew Reassignment Columns |
|--------------------------|--------------------------|
| Trade | Trade |
| PO | PO |
| Last Name | Last Name |
| First Name | First Name |
| Crew Name | Crew Name (current) |
| Start Date (current) | New Crew |
| Crew Availability | Start Date |
| New Start Date (calculated) | |

**"Crew Availability" in this context is a schedule conflict check**, not the available/unavailable flag. Green checkmark = the crew has no conflicting appointments on the target dates. Red exclamation = the crew already has work scheduled on those dates. The warning "Crew NOT AVAILABLE for all assignments!" means the crew has schedule conflicts, not that they are marked unavailable in the crew management system. The user can still save — it's a soft warning, not a block.

Note: The crew available/unavailable flag (set on the separate crew management page) does **not** surface in Bulk Reassignment. This is purely a schedule overlap check.

**Hidden Feature:** "Orders Without Dates" checkbox — the only way to find orders scheduled without a start date. Not discoverable.

**Current Limitations:**

- Lives on a separate page from the Production Scheduler
- Users navigate between two pages to manage one workflow
- Order is automatically marked completed when Material D + Labor C are both set (see WOD/AWC section), but the Order Manager has no dedicated filter for "completed orders" — users cannot filter to show only orders that are fully done.
- The "Orders Without Dates" filter is hidden behind a checkbox
- The crew available/unavailable flag does not surface anywhere in the Order Manager — not in bulk reassignment, not when viewing orders, not when scheduling individual assignments. The "Crew Availability" column in bulk reassignment is a schedule conflict check, not the availability flag.

---

## Future State

**Unify the to-be-scheduled drawer and Order Manager into the Scheduling Panel on the Production Scheduler page.** All orders — scheduled and unscheduled — visible in one place with material and labor filters across all statuses.

**Two modes, one component:**

| Mode | Layout | Use Case |
|------|--------|----------|
| **Panel mode** (default) | Lives alongside the calendar timeline. Compact rows, essential columns. | Quick reference while scheduling. Drag-to-calendar. Scanning what's next. Day-to-day scheduling workflow. |
| **Full-screen mode** | Expands to take over the viewport. Calendar is hidden or minimized. Wider columns, more visible rows, full bulk action toolbar. | Bulk operations (reassignment, status updates, email). Detailed status review across many orders. End-of-day / end-of-week audits. The "Order Manager" experience. |

**Single toggle** between panel and full-screen. Same data, same filters, same active preset — the view just scales up. No page navigation, no lost context, no re-applying filters.

The Order Manager is not a separate product — it is the Scheduling Panel in full-screen mode. One component, two layouts. This eliminates the need for a separate Order Manager page entirely.

| Data Set | Current Location | Scheduling Panel |
|----------|-----------------|---------------|
| Unscheduled orders | To-Be-Scheduled drawer | Filter: "To Be Scheduled" |
| Scheduled orders (list view) | Order Manager page | Filter: "Scheduled" |
| Materials by status | Order Manager, Materials tab | Filter by material status |
| Labor by status | Order Manager, Labor tab | Filter by labor status |
| Flagged orders | Criteria column in drawer | Filter by flag |
| Orders without dates | Hidden checkbox on Order Manager | Surfaced as a filter |
| Completed orders (D + C) | Order is auto-marked completed when Material D and Labor C are both set (system-derived; cannot be set manually). Order Manager has no dedicated "Completed" filter — completed orders exist as a state but are not filterable as a single dataset. | Filter: "Completed" (surfaces existing derived state) |

**View Modes:** List/table (default) and card view. Same data, different presentation. The card view is a standalone component inside the Scheduling Panel, not part of the calendar library.

**Drag-to-calendar:** Items in the Scheduling Panel are draggable onto the calendar timeline. Full Calendar supports external drag natively.

**Bulk actions** from the Order Manager (email supplier, place orders, mark delivered, mark complete) move into the Scheduling Panel.

**Clickable addresses:** Location addresses in the Scheduling Panel should be clickable, opening Google Maps in a new tab for the job address.

**Ideas explored but design-dependent:**
- Kanban view: cards organized into columns by status (material, labor, or derived order health)
- Tying material delivery status to labor timing as a combined readiness indicator
- Order readiness indicator showing which of the 4 required fields are filled vs. empty
- Combined "order complete" state (Material D + Labor C)

---

# WOD / AWC Status System

WOD (material) and AWC (labor) are three-letter status indicators that track order progress. They appear in the to-be-scheduled drawer and on the Order Manager. They do **not** appear on calendar appointment cards. For the full order lifecycle — from creation through to these statuses — see the **Order Lifecycle** section above.

---

## Current State

### Material Status: WOD

**Progression:** W (Waiting to Order) → O (Ordered) → D (Delivered)

Each letter has four visual states:

| State | Color | Trigger |
|-------|-------|---------|
| Pending | White / empty box | Step not completed |
| Complete | Grey filled box | Step done |
| Scheduled for today | Peach / salmon background | Delivery date = today, step not yet confirmed |
| Past due | Red background | Delivery date < today, step not yet confirmed |

Color logic applies to the next incomplete letter. If materials are at O (ordered) and delivery date is today, D shows peach. If delivery date has passed, D shows red.

**Status updates:** W → O is manual — triggered by the "Place Order" or "Send to Supplier" action. O → D is manual by default — production staff confirms delivery on site. However, integrated suppliers (e.g., SRS) can auto-update delivery status via webhook, pushing delivery confirmation, photos, and bills. This supplier integration path is the one exception to manual material updates; it is supplier-dependent and not universal.

### Labor Status: AWC

**Progression:** A (Assigned) → W (Working) → C (Completed)

Same four visual states and colors per letter:

| State | Color | Trigger |
|-------|-------|---------|
| Pending | White / empty box | Step not completed |
| Complete | Grey filled box | Step done |
| Scheduled for today | Peach / salmon background | Crew start date = today |
| Past due | Red background | End date < today, not marked complete |

Additional Mobile Crew App indicators:

| Indicator | Meaning |
|-----------|---------|
| Green wrench | Crew has Mobile Crew App |
| Green checkmark | Crew checked in (on site) |
| Grey exclamation | Expected on site, not checked in |
| Red exclamation | Late checking in |
| Blue checkmark | Labor complete via app |

**Status updates:**
- A → W: **Automatic** on crew start date. This is the only automatic WOD/AWC letter transition.
- W → C: **Always manual.** Someone on the production team must mark labor as completed. The Mobile Crew App allows crews to signal they are done, but this does NOT mark labor as completed — it is informational only. Production staff must still manually update the status.

**Crew check-in is a real-time on-site confirmation.** It is only relevant once the crew should be Working. It is not a planning signal.

**Order Completed:** The overall trade order is marked completed automatically when Material D (delivered) AND Labor C (completed) are both set. This cannot be selected manually — it is derived from the two sub-statuses.

### Crew Availability

Crews have a binary available/unavailable flag set on a separate crew management page. Unavailable crews still appear as rows on the Production Scheduler timeline with no visual indicator of their status. They are hidden from the crew dropdown in the "Add Event to Scheduler" modal, preventing direct assignment. The flag does not surface anywhere else in the production scheduling workflow — not on the timeline, not in the to-be-scheduled drawer, not in the Order Manager, and not in Bulk Reassignment (which checks schedule conflicts, not the availability flag). See the **Crew Available/Unavailable Flag** section for full details, including the Pause Subcontractor feature.

---

## Current Limitations

- **No forward-looking signal.** System reacts on the day (today state) or after the fact (past due). No "approaching" state exists.
- **WOD and AWC are independent.** No logic connects material readiness to labor timing. The question "are materials delivered before the crew arrives?" requires manual column cross-referencing.
- **Crew unavailability is partially invisible in scheduling context.** Unavailable crews are hidden from the "Add Event to Scheduler" modal crew dropdown (preventing direct assignment), but they still appear as rows on the timeline with no visual indicator. Users have no way to know a crew is unavailable by looking at the calendar.
- **Working status has no mid-range signal.** While a job is within its scheduled date range, there is no visual difference between day 1 and day 2 of a 2-day build. Once the end date passes, the C letter does turn red (past due), but there is no "approaching end date" or "running long" signal before that threshold.
- **No filter for "order complete."** The order is automatically marked completed when D + C (derived state exists), but Material D and Labor C are tracked and displayed independently. There is no way in the Order Manager or to-be-scheduled drawer to filter for "orders that are fully done."
- **No readiness indicator for unscheduled work.** Orders with 3 of 4 fields filled look the same as orders with 1 of 4.
- **Working column accumulates indefinitely.** Because A → W is automatic but W → C is manual, the Working column in the Order Manager fills up with orders that finished but were never formally closed. This distorts reporting (e.g., average crew build time) and makes it difficult to distinguish active work from stale entries.

---

# Crew Calendars in Labor Ticket

When scheduling a crew via labor ticket, users currently cannot see the crew's existing schedule. They must switch to the Production Scheduler to check availability, then come back.

---

## Current State

```
Labor Ticket Form → Pick Crew → Pick Dates → Save → Appointment Created
                                    ↑
                        Busy/free check only — no calendar view
```

- Labor ticket picks dates and crew independently
- The system does check crew availability: after selecting a crew and dates, a message indicates whether the crew is free or busy during those dates and times (e.g., "Your crew is busy during these dates and times" or confirmation that the crew is free). This same busy/free check also appears in:
  - **Order Manager → Bulk Reassignment (Labor)** — warns when reassigning to a crew that is busy
  - **"Add Event to Scheduler" modal** on the Production Scheduler — warns when the selected crew has conflicts
- The check is a **soft warning only** — it does not block the save. The user can proceed regardless.
- Crew scheduling also exists in: Order Builder, Orders List, Job View
- Each touchpoint is a separate implementation

**Current Limitations:**

- Busy/free text warning only — no visual calendar showing the crew's existing schedule, open slots, or what they're already doing that day/week
- User must switch to Production Scheduler to see the full crew calendar context
- Multiple scheduling touchpoints with no shared component

---

## Future State

```
Labor Ticket Form → Pick Crew → See Crew Calendar → Pick Dates → Save
                                       ↑
                           Embedded scheduler component
                           shows existing appointments
```

- Embed a calendar component in the labor ticket scheduling flow
- Shows selected crew's existing appointments as read-only
- Filtered to the selected crew — same data as the main scheduler, scoped down
- Reusable component — build once, deploy to all scheduling touchpoints (Order Builder, Orders List, Job View)

---

# User/Attendee Assignment

Labor appointments are currently auto-assigned to the sales rep on the job. This blocks the sales rep's calendar for production work they may not attend.

---

## Current State

- Labor appointments auto-assign the sales rep as attendee
- Sales rep's AccuLynx calendar shows production appointments as busy time
- Cannot add additional attendees (PMs, foremen)
- Cannot remove the auto-assigned sales rep
- No choice in who gets notified or calendar-blocked

**Current Limitations:**

- Sales reps lose availability for production appointments they don't attend
- New leads see the sales rep as "busy" during production blocks
- No way to assign the PM or foreman who actually needs to be there

---

## Future State

- Pick crew and dates (for the labor order)
- Then optionally pick AccuLynx user attendees for the appointment
- Remove auto-assignment of sales rep
- Users appear on the appointment; crews are on the appointment separately (different mechanism)
- The scheduler component that powers crew calendar visibility also powers attendee selection — unified scheduling experience

```
Pick Crew → Pick Dates → Pick User Attendees (optional) → Save
```

**Cross-team dependency:** Auto-assign logic lives in the monolith. Marcia's team owns order business logic and needs to sign off.

**Open question:** Does this apply to material deliveries too, or just labor? Labor confirmed. Material TBD.

---

# Non-Working Days / Holiday Blocking

No concept of non-working days exists in the Production Scheduler today. Users manually avoid scheduling on holidays.

---

## Current State

- No non-working days data model
- No visual indicator on calendar for holidays or closures
- Users manually avoid scheduling on those days
- No warning if a user schedules on a holiday

---

## Future State

- Add non-working days at the company/location level
- Full days only (not partial days)
- Visual indicator on calendar for non-working days
- Soft UI warning if user schedules on a non-working day — not a hard block
- Labor only for Phase 1. Material non-working days deferred.
- Propagate warning to all scheduling touchpoints: Production Scheduler, Order Builder, Orders List, Labor Ticket

**Not in Phase 1:** Recurring non-working days (e.g., every Sunday). Partial days. Material delivery blocking.

---

# Weather Integration

No weather information exists in AccuLynx today. Users check external weather apps manually when making scheduling decisions.

---

## Current State

- No weather data anywhere in AccuLynx
- Users reference external weather apps for scheduling decisions
- No automation around weather-affected schedules

---

## Future State

- Weather icon + data on each scheduled labor item
- Based on job address zip code
- Temperature and precipitation chance (AM/PM split)
- 10-day forecast horizon
- Store weather data (don't fetch live) — refresh on a cadence
- Weather displayed on appointment cards and/or day column headers

**Open questions:**

| Question | Status |
|----------|--------|
| Which weather API? (IBM/Weather Channel — existing relationship) | Needs investigation |
| API cost structure | Needs investigation |
| Where to store weather data? | Needs decision |
| Update frequency | Needs investigation |
| Is this an add-on feature or included? | Needs business decision |

---

# Map View

A geographic view of scheduled appointments on an interactive map. Crew pins are color-coded and positioned by geocoded job address. Weather forecast layers overlay the same map, letting production schedulers see which crews and jobs fall in weather-affected areas without checking individual appointments.

---

## Current State

- No geographic visualization of production work anywhere in AccuLynx
- Users have no way to see where crews are geographically on a given day
- To understand geographic distribution, users must read addresses line by line in the to-be-scheduled drawer or Order Manager
- Weather is checked externally per-job — no way to see weather impact across a region
- Job addresses exist on orders but are not geocoded or plotted on a map

---

## Future State

**View toggle on the Production Scheduler page** alongside the calendar timeline. Same filters apply to both views — switching between timeline and map does not reset date, crew, or trade selections.

**Appointment pins:**

- Each scheduled appointment appears as a pin on the map at the geocoded job address
- Pin color matches the crew's assigned color (same color system as the calendar timeline)
- Pin icon distinguishes order type: labor (wrench) vs. material delivery (truck)
- Pins cluster at low zoom levels — a numbered circle represents grouped appointments. Zooming in expands clusters into individual pins.
- Click a pin to see appointment details: customer name, PO#, trade, crew, dates, WOD/AWC status
- From the pin popup, open the same drawers as the calendar: Production Overview, Material Order, or Labor Ticket

**Weather overlay:**

- Precipitation forecast and radar as a translucent tile layer over the map
- Toggle weather on/off
- Weather layer syncs to the selected date — see tomorrow's forecast overlaid on tomorrow's appointments
- Additional layers (temperature, cloud cover) as secondary toggles
- Transforms weather from a per-appointment data point (icon on a card) into a geographic pattern — "it's raining across this entire zone, all five crews there are affected"

**Scheduling Panel interaction:**

- The Scheduling Panel remains visible alongside the map view, same as with the timeline
- Unscheduled orders with geocoded addresses could appear as a different pin style (e.g., hollow or grey) to show where pending work is relative to scheduled crews

**Data source:**

- Appointment data indexed in Elasticsearch with a geocoded coordinate field per job address
- Map viewport queries use geo-bounding-box filtering — Elastic returns only appointments visible in the current map area
- Geocoding happens at index time from the existing job address

**Use cases:**

- See all crews in a geographic area on a given day — spot clustering, gaps, or scheduling inefficiencies
- When weather threatens, see which crews and jobs are in the affected area and need rescheduling
- When assigning new work, identify the geographically closest available crew
- Identify logistically awkward schedules (crew driving long distances between jobs on the same day)

---

# Customizable Appointment Previews

Appointment blocks on the calendar timeline currently show fixed content. Users cannot configure what information is visible on each block without clicking into the order.

---

## Current State

- Fixed fields on every appointment block: wrench/tool icon + customer name (truncated if long)
- Color-coded by assigned crew
- No time, PO#, address, or trade visible on the block
- To see any detail, user must click to select, then click the eye icon to open a drawer
- All users see the same content — no per-user configuration

---

## Future State

**Appointment Preview Configuration:**
- User-defined fields in block slots: title, subtitle, detail line(s)
- Field options: job name, PO#, customer name, address, time, trade, crew, order status, flags
- Per-user preference — each user configures their own view
- Same config applies across all calendar views (day, week, month, timeline)

---

# Customizable Scheduling Panel

The Scheduling Panel and the calendar appointment previews are two separate surfaces with different information needs. They should be customizable independently.

---

## Current State

- To-be-scheduled drawer is a table with fixed columns (see To-Be-Scheduled Drawer section for full column list)
- Order Manager is a table with fixed tabs and columns
- No card view exists anywhere for production work
- No Kanban-style organization of work by status
- Column set cannot be changed, reordered, or hidden per user
- No card view alternative

---

## Future State

**Panel customization (table view):**
- User-configurable columns — choose which fields appear, reorder, show/hide
- Different users may want to see different columns based on their role (e.g., a production manager may want deposit status prominently; a scheduler may want crew and dates)
- Configured separately from calendar appointment previews

**Panel customization (card view):**
- Card view as an optional view mode inside the Scheduling Panel (alongside list/table)
- Each order displayed as a card with customizable fields
- Cards show key decision-making info: PO#, customer, trade, address, status indicators, flags
- Standalone component inside the panel, not part of the calendar library
- Drag-to-calendar from cards (same interaction as list rows)

**Ideas explored but design-dependent:**
- Kanban layout: cards organized into columns by a status attribute (material status, labor status, or derived order health)
- Kanban makes status accumulation visible — a large pile in "Working" vs. nothing in "Completed" is immediately obvious
- Column grouping could be user-selectable (group by material status, labor status, trade, flag)

---

# Saved View Presets

Saved presets bring together filters and customization across both the calendar and the Scheduling Panel into a single named view that persists across sessions.

---

## Current State

- Calendar filters (Event Type, Trades, Crews) exist in a modal
- Filters do not persist — reset on every page load
- No saved presets
- No search within filters
- Users rebuild their preferred view every session

---

## Future State

- Save a named preset that captures: calendar filters + date range + appointment preview configuration + Scheduling Panel configuration (visible columns or card layout)
- Quick-switch between presets
- Persist across sessions
- Calendar appointment previews and the Scheduling Panel are configured separately within the preset — each has its own settings, but both are saved together under one preset name
- Similar pattern to existing Job Search saved views
- Extended date views (month, 14-week planning horizon) are part of the preset's date range setting

---

# Crew Availability in Production Scheduler

Crews have a binary available/unavailable flag that exists in the system today but is effectively invisible during production scheduling. The flag is managed on a separate crew management page. The Production Scheduler does not show whether a crew is available or unavailable — the only signal is that unavailable crews are silently hidden from the crew dropdown in the scheduling modal.

---

## Current State

### Where Crew Availability Is Managed

Crew availability is managed on a **separate crew management page**, not on the Production Scheduler. The rules are:

- "Available" crews can be assigned work.
- "Unavailable" crews cannot be assigned new work or reassignments.
- Crews made "Unavailable" while in the middle of a Labor Order are permitted to complete their current orders.
- Visual indicators on the crew management page: green checkmark = Available, circle-with-line icon = Unavailable.

### Pause Subcontractor

A related feature exists for companies using the Mobile Crew App with seasonal labor. "Pausing" a subcontractor:

- Suspends Mobile Crew App charges and sharing of job information for the subcontractor and their linked Crew Leads.
- **All crews under the paused subcontractor become "Unavailable"** — they can no longer be assigned work.
- Any open Labor Orders on those crews must be reassigned to available crews.
- "Resume" restores the Mobile Crew App connection and crew availability at any time.

This does not directly affect the Production Scheduler interface, but it does make those crews unavailable system-wide.

### Where Crew Availability Surfaces (and Does Not)

- **Does NOT appear on the Production Scheduler timeline.** Unavailable crews still show as rows on the left side of the calendar — there is no visual indicator that they are unavailable.
- **Does NOT appear in the to-be-scheduled drawer or Scheduling Panel.**
- **Does NOT appear on individual order views or drawers.**
- **Is hidden from the "Add Event to Scheduler" modal.** When dragging a labor order onto the calendar or scheduling via the modal, unavailable crews are **not shown** in the crew dropdown. The user cannot select them. This is the only place the flag has any effect in the scheduler.
- **Does NOT appear in Order Manager → Labor → Bulk Reassignment.** The "Crew Availability" column in Bulk Reassignment checks for **schedule conflicts** (does the crew have work on those dates), not the available/unavailable flag. Green check = no scheduling conflict. Red exclamation = scheduling conflict exists. This is a common source of confusion.

**Current Limitations:**

- A production scheduler sees unavailable crews as rows on the timeline but has no indicator they are unavailable
- The crew row persists on the calendar with no visual distinction, which causes confusion
- When a crew is made unavailable, there is no way to see "all work assigned to this crew" to plan reassignment — the scheduler must manually scan for their jobs
- The availability flag is invisible during all scheduling workflows except the crew dropdown (where unavailable crews are silently excluded)
- The Bulk Reassignment "Crew Availability" column checks schedule conflicts, not the availability flag — users confuse these two concepts

---

## Future State

- **Surface the crew availability flag on the Production Scheduler timeline.** Unavailable crew rows should have a visual indicator (e.g., dimmed, labeled, or collapsed) so the scheduler can see at a glance which crews are not accepting new work.
- **Surface the flag in the Scheduling Panel.** Filter by crew availability to see all orders assigned to unavailable crews — lets the scheduler identify work that may need reassignment.
- **Surface the flag in crew selection flows.** When assigning a crew (scheduling modal, Bulk Reassignment), clearly distinguish between "crew is unavailable" (flag) and "crew has a schedule conflict" (busy on those dates). These are different signals that currently look the same or are conflated.
- **No new data needed.** The available/unavailable flag already exists in the system. This feature is about displaying it where scheduling decisions are made.
- **Unavailable crews can still complete current work.** Surfacing the flag is informational, not a block — the system rule that unavailable crews finish existing orders does not change.

---

# INVESTIGATIONS

**Full Calendar Spike:**
- Confirm overlap prevention works correctly in timeline resource view (same crew + same time = blocked)

**Scheduling Touchpoint Inventory:**
- Where does crew scheduling exist today? (Production Scheduler, Order Builder, Orders List, Job View, Labor Ticket)
- Needed to scope: Crew Calendar embedding, Non-Working Day warnings, Attendee Assignment

**Auto-Assign Sales Rep Logic:**
- Where does this live? Monolith confirmed.
- Who else modifies orders outside the monolith?
- Cross-team coordination with Marcia's team required

**Weather API:**
- API selection, cost structure, storage approach, refresh cadence
- Business decision: add-on vs. included

---

# OPEN QUESTIONS

1. **Overlap prevention in timeline view:** Does the calendar library prevent same-crew same-time overlap natively? (Spike answers this)
2. **Shared crew calendar component:** Can we build one reusable component for all scheduling touchpoints?
3. **Weather API cost approval:** Blocking weather integration
4. **Material non-working days:** Labor confirmed for Phase 1. Material TBD.
5. **Attendee assignment for material deliveries:** Labor confirmed. Material TBD.
6. **Recurring non-working days:** Deferred from Phase 1. Future scope.

---

# REFERENCE

## Feature Priority Matrix

| Feature | Value | Complexity | Size |
|---------|:-----:|:----------:|:----:|
| Full Calendar Migration | 10 | 9 | L |
| Customizable Appointment Previews | 9 | 4 | S-M |
| Saved View Presets | 9 | 3 | S |
| Non-Working Days | 9 | 5 | M |
| Extended Date Views | 8 | 2 | S |
| Crew Calendars in Labor Ticket | 8 | 4 | S-M |
| User/Attendee Assignment | 8 | 5 | M |
| Scheduling Panel (replaces To-Be-Scheduled + Order Manager) | 8 | 5 | M |
| Weather Integration | 7 | 7 | M+? |
| Customizable Scheduling Panel | 7 | 4 | S-M |
| Crew Available/Unavailable Flag | 6 | 2 | S |

## Cross-Team Dependencies

| Feature | Team | What's Needed |
|---------|------|---------------|
| User/Attendee Assignment | Marcia's team (Order) | Sign-off on auto-assign removal, flow changes |
| User/Attendee Assignment | Material team | Notification behavior for attendees (if Material applies) |

## Deferred Work (Out of Phase 1)

| Feature | Reason |
|---------|--------|
| Trade Dependency Tracking | Needs deep discovery. Separate project. |
| Conflict Notification System | Needs role mapping discovery. |
| Crew Date-Range Unavailability | Requires Mobile Crew App changes. Currently binary flag only. |
| Material Non-Working Days | Labor only for Phase 1. |
| Mobile Production Scheduler | Different product area. |
| Downstream Reschedule Queue | Depends on dependency tracking. |
