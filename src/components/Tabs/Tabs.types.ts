export interface TabItem {
  id: string
  label: string
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  activeId: string
  onChange: (id: string) => void
  variant?: 'underline' | 'table' | 'pill'
  className?: string
}
