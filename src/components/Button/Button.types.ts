import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

export type ButtonVariant = 'default' | 'outline' | 'text' | 'warning' | 'danger' | 'success'
export type ButtonSize = 'default' | 'sm'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
  iconOnly?: boolean
}
