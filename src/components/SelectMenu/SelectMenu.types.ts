export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export type SelectMenuSize = 'default' | 'sm'

export interface SelectMenuProps {
  options: SelectOption[]
  value?: string | string[]
  onChange: (value: string | string[]) => void
  placeholder?: string
  label?: string
  required?: boolean
  multiple?: boolean
  searchable?: boolean
  error?: string
  disabled?: boolean
  className?: string
  size?: SelectMenuSize
}
