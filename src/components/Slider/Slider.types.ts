export interface SliderProps {
  min?: number
  max?: number
  value: number
  onChange: (value: number) => void
  label?: string
  labelPosition?: 'top' | 'left'
  showValue?: boolean
  formatValue?: (value: number) => string
  disabled?: boolean
  className?: string
}
