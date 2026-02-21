import { type ComponentPropsWithoutRef, type ReactNode } from 'react'

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  selected?: boolean
  interactive?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  as?: 'div' | 'article' | 'section' | 'aside'
}

export interface CardHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  action?: ReactNode
  divider?: boolean
}

export interface CardBodyProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  scrollable?: boolean
  maxHeight?: number | string
}

export interface CardFooterProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  divider?: boolean
  align?: 'left' | 'center' | 'right' | 'between'
}

export interface CardMediaProps extends ComponentPropsWithoutRef<'div'> {
  src?: string
  alt?: string
  height?: number | string
  position?: 'top' | 'bottom'
  children?: ReactNode
}

export interface CardDividerProps extends ComponentPropsWithoutRef<'hr'> {}

export interface CardTitleProps extends ComponentPropsWithoutRef<'div'> {
  title: string
  subtitle?: string
  children?: ReactNode
}
