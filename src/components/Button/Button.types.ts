import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

export type ButtonVariant = 'default' | 'outline' | 'text' | 'warning' | 'danger' | 'success'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  iconLeft?: ReactNode
  iconRight?: ReactNode
  iconOnly?: boolean
}
