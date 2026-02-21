import { type ReactNode } from 'react'

export interface TableColumn<T = any> {
  key: string
  header: string
  width?: string
  sortable?: boolean
  render?: (value: any, row: T) => ReactNode
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  sortColumn?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (column: string) => void
  bordered?: boolean
  className?: string
}

export interface TableTab {
  key: string
  label: string
  count?: number
}

export interface TableTabsProps {
  tabs: TableTab[]
  activeTab: string
  onTabChange: (key: string) => void
  className?: string
}
