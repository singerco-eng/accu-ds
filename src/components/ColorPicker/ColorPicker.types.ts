export interface ColorPickerProps {
  value?: string
  onChange: (color: string) => void
  presetColors?: string[]
  className?: string
}
