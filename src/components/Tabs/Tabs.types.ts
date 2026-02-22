export interface TabItem {
  id: string
  label: string
  disabled?: boolean
}

export type TabsSize = 'default' | 'sm'
export type TabsColorScheme = 'blue' | 'neutral'

export interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
  variant?: 'underline' | 'table' | 'pill'
  size?: TabsSize
  colorScheme?: TabsColorScheme
  className?: string
}
