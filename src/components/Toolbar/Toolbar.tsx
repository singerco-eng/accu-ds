import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type ToolbarProps } from './Toolbar.types'
import { ToolbarTopRow } from './ToolbarTopRow'
import { ToolbarBottomRow } from './ToolbarBottomRow'
import AccuLynxLogo from '../../assets/acculynx-logo-reversed.svg'

export const Toolbar = forwardRef<HTMLElement, ToolbarProps>(function Toolbar(
  {
    logo,
    companyName,
    officeName,
    onLocationClick,
    userName,
    onUserClick,
    onSettingsClick,
    navItems,
    activeNavItem,
    onNavItemClick,
    notifications,
    searchPlaceholder,
    onSearch,
    onHelpClick,
    onReleaseNotesClick,
    className,
  },
  ref,
) {
  const logoElement = logo ?? (
    <img src={AccuLynxLogo} alt="AccuLynx" className="h-6 w-auto" />
  )

  return (
    <header ref={ref} className={cn('w-full', className)}>
      <ToolbarTopRow
        logo={logoElement}
        companyName={companyName}
        officeName={officeName}
        onLocationClick={onLocationClick}
        userName={userName}
        onUserClick={onUserClick}
        onSettingsClick={onSettingsClick}
        notifications={notifications}
        onReleaseNotesClick={onReleaseNotesClick}
      />
      <ToolbarBottomRow
        navItems={navItems}
        activeNavItem={activeNavItem}
        onNavItemClick={onNavItemClick}
        searchPlaceholder={searchPlaceholder}
        onSearch={onSearch}
        onHelpClick={onHelpClick}
      />
    </header>
  )
})
