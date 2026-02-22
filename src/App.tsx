import { NavLink, Route, Routes } from 'react-router-dom'
import AnnouncementsPage from './demo/pages/AnnouncementsPage'
import AvatarsPage from './demo/pages/AvatarsPage'
import BadgesPage from './demo/pages/BadgesPage'
import BreadcrumbsPage from './demo/pages/BreadcrumbsPage'
import ButtonsPage from './demo/pages/ButtonsPage'
import CardsPage from './demo/pages/CardsPage'
import CheckboxesPage from './demo/pages/CheckboxesPage'
import ColorPickerPage from './demo/pages/ColorPickerPage'
import ColorsPage from './demo/pages/ColorsPage'
import ContextMenusPage from './demo/pages/ContextMenusPage'
import DatePickerPage from './demo/pages/DatePickerPage'
import EffectsPage from './demo/pages/EffectsPage'
import FileUploaderPage from './demo/pages/FileUploaderPage'
import ModalDrawersPage from './demo/pages/ModalDrawersPage'
import ModalsPage from './demo/pages/ModalsPage'
import PanelsPage from './demo/pages/PanelsPage'
import ProgressPage from './demo/pages/ProgressPage'
import RadioButtonsPage from './demo/pages/RadioButtonsPage'
import SearchBarsPage from './demo/pages/SearchBarsPage'
import SelectMenusPage from './demo/pages/SelectMenusPage'
import SlidersPage from './demo/pages/SlidersPage'
import TablesPage from './demo/pages/TablesPage'
import TabsPage from './demo/pages/TabsPage'
import TagsPage from './demo/pages/TagsPage'
import TextInputsPage from './demo/pages/TextInputsPage'
import TilesPage from './demo/pages/TilesPage'
import ToastsPage from './demo/pages/ToastsPage'
import TogglesPage from './demo/pages/TogglesPage'
import TooltipsPage from './demo/pages/TooltipsPage'
import TypographyPage from './demo/pages/TypographyPage'

type NavItem = {
  label: string
  path: string
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: 'Foundations',
    items: [
      { label: 'Colors', path: '/' },
      { label: 'Typography', path: '/typography' },
      { label: 'Effects', path: '/effects' },
    ],
  },
  {
    title: 'Primitives',
    items: [
      { label: 'Buttons', path: '/buttons' },
      { label: 'Text Inputs', path: '/text-inputs' },
      { label: 'Checkboxes', path: '/checkboxes' },
      { label: 'Radio Buttons', path: '/radio-buttons' },
      { label: 'Toggles', path: '/toggles' },
      { label: 'Badges', path: '/badges' },
      { label: 'Tags', path: '/tags' },
    ],
  },
  {
    title: 'Feedback & Nav',
    items: [
      { label: 'Announcements', path: '/announcements' },
      { label: 'Toasts', path: '/toasts' },
      { label: 'Tooltips', path: '/tooltips' },
      { label: 'Breadcrumbs', path: '/breadcrumbs' },
      { label: 'Avatars', path: '/avatars' },
      { label: 'Tabs', path: '/tabs' },
      { label: 'Sliders', path: '/sliders' },
    ],
  },
  {
    title: 'Composite',
    items: [
      { label: 'Cards', path: '/cards' },
      { label: 'Modals', path: '/modals' },
      { label: 'Modal Drawers', path: '/modal-drawers' },
      { label: 'Select Menus', path: '/select-menus' },
      { label: 'Context Menus', path: '/context-menus' },
      { label: 'Panels', path: '/panels' },
      { label: 'Date Picker', path: '/date-picker' },
      { label: 'Color Picker', path: '/color-picker' },
    ],
  },
  {
    title: 'Data & Upload',
    items: [
      { label: 'Tables', path: '/tables' },
      { label: 'Progress', path: '/progress' },
      { label: 'Tiles', path: '/tiles' },
      { label: 'File Uploader', path: '/file-uploader' },
      { label: 'Search Bars', path: '/search-bars' },
    ],
  },
]

function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--accu-gray-bg)' }}>
      <aside
        className="fixed left-0 top-0 h-screen overflow-y-auto px-4 py-6"
        style={{
          width: '260px',
          background: 'var(--accu-white)',
          borderRight: '1px solid var(--accu-gray-2)',
        }}
      >
        <h1 className="accu-text-display-sm font-bold mb-6" style={{ color: 'var(--accu-primary-blue)' }}>
          AccuLynx DS
        </h1>

        <nav className="flex flex-col gap-6">
          {navGroups.map((group) => (
            <section key={group.title}>
              <h2
                className="font-bold mb-2"
                style={{ color: 'var(--accu-gray-5)', textTransform: 'uppercase', fontSize: '10px', lineHeight: '12px' }}
              >
                {group.title}
              </h2>
              <div className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `accu-text-body-md block rounded px-3 py-2 hover:bg-[var(--accu-light-blue)] ${isActive ? 'font-bold' : 'font-normal'}`
                    }
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--accu-primary-blue)' : 'var(--accu-gray-6)',
                      background: isActive ? 'var(--accu-light-blue)' : 'transparent',
                    })}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </aside>

      <main className="min-h-screen overflow-auto" style={{ marginLeft: '260px', padding: '40px', background: 'var(--accu-gray-bg)' }}>
        <Routes>
          <Route path="/" element={<ColorsPage />} />
          <Route path="/typography" element={<TypographyPage />} />
          <Route path="/effects" element={<EffectsPage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/text-inputs" element={<TextInputsPage />} />
          <Route path="/checkboxes" element={<CheckboxesPage />} />
          <Route path="/radio-buttons" element={<RadioButtonsPage />} />
          <Route path="/toggles" element={<TogglesPage />} />
          <Route path="/badges" element={<BadgesPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/toasts" element={<ToastsPage />} />
          <Route path="/tooltips" element={<TooltipsPage />} />
          <Route path="/breadcrumbs" element={<BreadcrumbsPage />} />
          <Route path="/avatars" element={<AvatarsPage />} />
          <Route path="/tabs" element={<TabsPage />} />
          <Route path="/sliders" element={<SlidersPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/modals" element={<ModalsPage />} />
          <Route path="/modal-drawers" element={<ModalDrawersPage />} />
          <Route path="/select-menus" element={<SelectMenusPage />} />
          <Route path="/context-menus" element={<ContextMenusPage />} />
          <Route path="/panels" element={<PanelsPage />} />
          <Route path="/date-picker" element={<DatePickerPage />} />
          <Route path="/color-picker" element={<ColorPickerPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/tiles" element={<TilesPage />} />
          <Route path="/file-uploader" element={<FileUploaderPage />} />
          <Route path="/search-bars" element={<SearchBarsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
