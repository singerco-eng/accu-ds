import { ArrowDown, ArrowUp, ArrowUpDown, Info } from 'lucide-react'
import { forwardRef, type ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { type TableProps, type TableTabsProps } from './Table.types'

export function TableTabs({ tabs, activeTab, onTabChange, className }: TableTabsProps) {
  return (
    <div className={cn('flex', className)}>
      {tabs.map((tab, index) => {
        const isActive = tab.key === activeTab
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={cn(
              'relative flex h-[42px] items-center gap-1.5 px-[var(--accu-space-3)] text-[14px] transition-colors',
              isActive
                ? 'border-t-[2px] border-t-[var(--accu-blue-dark)] bg-[var(--accu-white)] font-bold text-[var(--accu-blue-dark)]'
                : 'bg-[var(--accu-gray-0)] font-regular text-[var(--accu-primary-blue)] hover:bg-[var(--accu-gray-1)]',
            )}
          >
            <span>{tab.label}</span>
            {tab.count != null ? (
              <span className={isActive ? 'text-[var(--accu-blue-dark)]' : 'text-[var(--accu-primary-blue)]'}>
                ({tab.count})
              </span>
            ) : null}
            {index < tabs.length - 1 ? (
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[var(--accu-gray-2)]"
                style={{ width: 1, height: 30 }}
                aria-hidden="true"
              />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { columns, data, onRowClick, sortColumn, sortDirection, onSort, bordered = true, className },
  ref,
) {
  return (
    <div className={cn('w-full overflow-x-auto bg-[var(--accu-white)]', bordered && 'border border-[var(--accu-gray-2)]', className)}>
      <table ref={ref} className="w-full border-collapse">
        <thead>
          <tr style={{ height: 'var(--accu-table-header-height)' }}>
            {columns.map((column) => {
              const sorted = sortColumn === column.key
              return (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'bg-[var(--accu-gray-1)] text-left align-middle text-[10px] uppercase leading-[10px] font-regular text-[var(--accu-gray-6)]',
                    column.sortable && 'cursor-pointer hover:bg-[var(--accu-gray-2)]',
                  )}
                  style={{
                    width: column.width,
                    padding: 'var(--accu-table-cell-pad-y) var(--accu-table-cell-pad-x)',
                  }}
                  onClick={() => column.sortable && onSort?.(column.key)}
                >
                  <div className="flex items-center gap-1">
                    <span>{column.header}</span>
                    <Info className="h-2.5 w-2.5 text-[var(--accu-primary-blue)]" />
                    {column.sortable ? (
                      sorted ? (
                        sortDirection === 'desc' ? (
                          <ArrowDown className="h-2.5 w-2.5 text-[var(--accu-primary-blue)]" />
                        ) : (
                          <ArrowUp className="h-2.5 w-2.5 text-[var(--accu-primary-blue)]" />
                        )
                      ) : (
                        <ArrowUpDown className="h-2.5 w-2.5 text-[var(--accu-gray-6)]" />
                      )
                    ) : null}
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={cn(
                'border-b border-[var(--accu-gray-1)] bg-[var(--accu-white)] hover:bg-[var(--accu-light-blue)]',
                onRowClick && 'cursor-pointer',
              )}
              style={{ height: 'var(--accu-table-row-height)' }}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => {
                const rawValue = (row as Record<string, unknown>)[column.key]
                const content: ReactNode = column.render ? column.render(rawValue, row) : String(rawValue ?? '')
                const stringValue = typeof rawValue === 'string' ? rawValue : ''
                const isEmail = stringValue.includes('@')
                return (
                  <td
                    key={column.key}
                    className="align-middle text-body-md font-regular text-[var(--accu-gray-6)]"
                    style={{ padding: 'var(--accu-table-cell-pad-y) var(--accu-table-cell-pad-x)' }}
                  >
                    {column.render ? (
                      content
                    ) : isEmail ? (
                      <a className="text-[var(--accu-primary-blue)] hover:underline" href={`mailto:${stringValue}`}>
                        {stringValue}
                      </a>
                    ) : (
                      <span>{content}</span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})
