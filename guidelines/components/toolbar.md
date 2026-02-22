### Toolbar

**Purpose**: Main navigation toolbar — the primary header on all AccuLynx pages. A two-row, full-width header with a dark navy top row (logo, location, notifications, user) and a blue bottom row (nav buttons, search, help). Responsive across desktop, tablet, and mobile.

**Import**:
```tsx
import { Toolbar } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `companyName` | `string` | — | **Required.** Company name shown in the top row location nav. |
| `userName` | `string` | — | **Required.** User's display name in the top row. |
| `navItems` | `ToolbarNavItem[]` | — | **Required.** Array of navigation buttons for the bottom row. |
| `logo` | `ReactNode` | AccuLynx logo | Custom logo element. Defaults to the built-in AccuLynx reversed logo. |
| `officeName` | `string` | — | Optional office/branch name shown beside the company name. |
| `onLocationClick` | `() => void` | — | Called when the location nav dropdown is clicked. |
| `onUserClick` | `() => void` | — | Called when the user name is clicked. |
| `onSettingsClick` | `() => void` | — | Called when the settings cog is clicked. |
| `activeNavItem` | `string` | — | Key of the currently active nav item (highlighted). |
| `onNavItemClick` | `(key: string) => void` | — | Called when a bottom-row nav button is clicked. |
| `notifications` | `ToolbarNotifications` | — | Badge counts for top row icons. |
| `searchPlaceholder` | `string` | `'Job #, Customer Name or Address'` | Placeholder text for the search bar. |
| `onSearch` | `(query: string) => void` | — | Called when search is submitted (Enter key). |
| `onHelpClick` | `() => void` | — | Called when the Help button is clicked. |
| `onReleaseNotesClick` | `() => void` | — | Called when the Release Notes button is clicked. |
| `className` | `string` | — | Optional CSS class on the root `<header>`. |

**Sub-types**:

```tsx
interface ToolbarNavItem {
  key: string           // Unique identifier for the nav item
  label: string         // Display text
  icon?: ReactNode      // Optional icon (use Lucide React icons)
  variant?: 'default' | 'accent'  // 'accent' = orange background
}

interface ToolbarNotifications {
  releaseNotes?: boolean   // Orange dot indicator on Release Notes
  tasks?: number           // Badge count on Tasks icon
  calendar?: number        // Badge count on Calendar icon
  notifications?: number   // Badge count on Notifications bell
  atMe?: number            // Badge count on @Me icon
}
```

**Usage Example**:
```tsx
import { Toolbar } from '@al-ds/design-system'
import {
  PlusCircle, Clock, LayoutDashboard, Users, Target,
  Briefcase, Camera, MapPin, BarChart3, Factory, Wrench,
} from 'lucide-react'

const navItems = [
  { key: 'new', label: 'New', icon: <PlusCircle size={16} />, variant: 'accent' as const },
  { key: 'recent', label: 'Recent', icon: <Clock size={16} />, variant: 'accent' as const },
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { key: 'contacts', label: 'Contacts', icon: <Users size={16} /> },
  { key: 'leads', label: 'Leads', icon: <Target size={16} /> },
  { key: 'jobs', label: 'Jobs', icon: <Briefcase size={16} /> },
  { key: 'photos', label: 'Photos', icon: <Camera size={16} /> },
  { key: 'track', label: 'Track', icon: <MapPin size={16} /> },
  { key: 'reports', label: 'ReportsPlus', icon: <BarChart3 size={16} /> },
  { key: 'production', label: 'Production', icon: <Factory size={16} /> },
  { key: 'tools', label: 'Tools', icon: <Wrench size={16} /> },
]

<Toolbar
  companyName="AccuLynx Roofing"
  officeName="Chicago Office"
  userName="John Smith"
  navItems={navItems}
  activeNavItem="dashboard"
  onNavItemClick={(key) => navigate(key)}
  notifications={{ releaseNotes: true, tasks: 3, notifications: 12 }}
  onSearch={(query) => performSearch(query)}
  onHelpClick={() => openHelp()}
/>
```

**Responsive Behavior**:
- **Desktop** (≥1024px): Full two-row layout with all nav buttons and search bar visible.
- **Tablet** (≥768px): Top row shows most icons; bottom row keeps nav buttons with a search icon (no full search bar).
- **Mobile** (<768px): Top row shows logo + key icons; bottom row collapses to a hamburger menu + search icon. The menu opens a dropdown with all nav items and a search field.

**Color Tokens Used**:
- Top row background: `--accu-blue-dark` (#24476C)
- Bottom row background: `--accu-primary-blue` (#4680BF)
- Accent buttons: `--accu-logo-orange` (#F4925D)
- Badge counts: `--accu-red` (#E54A48)
- All text: white

**Do/Don't**:
- Do: Always provide `companyName`, `userName`, and `navItems` — they are required for the toolbar to function.
- Do: Use the `variant: 'accent'` for action buttons like "New" and "Recent" to match the Figma design.
- Do: Pass `activeNavItem` to highlight the current page's nav button.
- Don't: Nest the Toolbar inside another container with padding — it should span full width.
- Don't: Duplicate navigation items that already exist in the toolbar in other parts of the page.
