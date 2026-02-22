import { useState } from 'react'
import { Toolbar } from '../../components/Toolbar'
import { type ToolbarNavItem } from '../../components/Toolbar/Toolbar.types'
import {
  CircleAddIcon,
  CircleArrowLeftIcon,
  DashboardIcon,
  DirectoryIcon,
  PersonIcon,
  HammerIcon,
  PhotosIcon,
  PawPrintIcon,
  PlusIcon,
  CalendarIcon,
  ToolsIcon,
} from '../../components/Toolbar/ToolbarIcons'

const defaultNavItems: ToolbarNavItem[] = [
  { key: 'new', label: 'New', icon: <CircleAddIcon size={18} />, variant: 'accent' },
  { key: 'recent', label: 'Recent', icon: <CircleArrowLeftIcon size={18} />, variant: 'accent' },
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon size={18} /> },
  { key: 'contacts', label: 'Contacts', icon: <DirectoryIcon size={18} /> },
  { key: 'leads', label: 'Leads', icon: <PersonIcon size={18} /> },
  { key: 'jobs', label: 'Jobs', icon: <HammerIcon size={18} /> },
  { key: 'photos', label: 'Photos', icon: <PhotosIcon size={18} /> },
  { key: 'track', label: 'Track', icon: <PawPrintIcon size={18} /> },
  { key: 'reports', label: 'ReportsPlus', icon: <PlusIcon size={18} /> },
  { key: 'production', label: 'Production', icon: <CalendarIcon size={18} /> },
  { key: 'tools', label: 'Tools', icon: <ToolsIcon size={18} /> },
]

export default function ToolbarPage() {
  const [activeNav, setActiveNav] = useState('dashboard')

  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Toolbar</h1>
      <p className="accu-text-body-md mb-6" style={{ color: 'var(--accu-gray-5)' }}>
        Main navigation toolbar — the primary header on all AccuLynx pages. Two-row layout with logo, location,
        notifications, user info on top and nav buttons with search on the bottom.
      </p>

      <section className="mb-8">
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Full Toolbar (resize browser to see responsive behavior)
        </h2>
        <div className="overflow-hidden shadow-lg" style={{ marginLeft: '-40px', marginRight: '-40px' }}>
          <Toolbar
            companyName="AccuLynx Roofing"
            officeName="Chicago Office"
            userName="John Smith"
            navItems={defaultNavItems}
            activeNavItem={activeNav}
            onNavItemClick={setActiveNav}
            notifications={{
              releaseNotes: true,
              tasks: 3,
              calendar: 1,
              notifications: 12,
              atMe: 2,
            }}
            onSearch={(q) => alert(`Search: ${q}`)}
            onHelpClick={() => alert('Help clicked')}
            onLocationClick={() => alert('Location clicked')}
            onUserClick={() => alert('User clicked')}
            onSettingsClick={() => alert('Settings clicked')}
            onReleaseNotesClick={() => alert('Release notes clicked')}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Minimal — No Notifications
        </h2>
        <div className="overflow-hidden shadow-lg" style={{ marginLeft: '-40px', marginRight: '-40px' }}>
          <Toolbar
            companyName="Demo Corp"
            userName="Jane Doe"
            navItems={defaultNavItems.slice(2)}
            activeNavItem="jobs"
            onNavItemClick={() => {}}
          />
        </div>
      </section>
    </div>
  )
}
