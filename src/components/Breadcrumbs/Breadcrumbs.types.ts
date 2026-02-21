export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}
