export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  variant?: 'default' | 'header'
  onSearch?: (value: string) => void
  className?: string
}
