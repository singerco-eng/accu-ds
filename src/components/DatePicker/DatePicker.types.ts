export interface DatePickerProps {
  value?: Date | null
  onChange: (date: Date | null) => void
  label?: string
  placeholder?: string
  required?: boolean
  error?: string
  disabled?: boolean
  className?: string
}
