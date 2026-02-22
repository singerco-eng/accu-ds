import { type ReactNode } from 'react'
import { type ComponentPropsWithoutRef } from 'react'

export type TextInputSize = 'default' | 'sm'

export interface TextInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  label?: string
  error?: string
  required?: boolean
  multiline?: boolean
  rows?: number
  active?: boolean
  rightAdornment?: ReactNode
  hideNativeValueText?: boolean
  size?: TextInputSize
}
