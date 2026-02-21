import { type ComponentPropsWithoutRef } from 'react'

export interface ToggleProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  label?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}
