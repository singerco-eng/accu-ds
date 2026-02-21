import { type ComponentPropsWithoutRef } from 'react'

export interface RadioButtonProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label?: string
}
