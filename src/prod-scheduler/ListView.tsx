import { useState } from 'react'
import { DollarSign, AlertCircle, AlertTriangle } from 'lucide-react'
import { Table } from '../components/Table'
import { type TableColumn } from '../components/Table/Table.types'
import { type MockOrder } from './data/mock-orders'
import { getCrewById } from './data/crews'
import WodAwcIndicator, { hasOverdueStatus } from './WodAwcIndicator'

const CRITERIA_STYLES: Record<string, { bg: string; text: string }> = {
  rush:    { bg: 'var(--accu-red)', text: 'var(--accu-white)' },
  hold:    { bg: 'var(--accu-yellow)', text: 'var(--accu-gray-6)' },
  special: { bg: 'var(--accu-purple)', text: 'var(--accu-white)' },
}

const columns: TableColumn<MockOrder>[] = [
  {
    key: 'customerName',
    header: 'Customer',
    width: '180px',
    sortable: true,
    render: (_, row) => (
      <div className="flex flex-col">
        <span className="font-bold text-[var(--accu-gray-6)] truncate">{row.customerName}</span>
        <span className="text-[var(--accu-gray-4)]" style={{ fontSize: '11px' }}>{row.jobNumber}</span>
      </div>
    ),
  },
  {
    key: 'phone',
    header: 'Phone',
    width: '120px',
    sortable: true,
    render: (val) => (
      <span className="text-[var(--accu-gray-5)]" style={{ fontSize: '12px' }}>{val}</span>
    ),
  },
  {
    key: 'orderName',
    header: 'Order',
    width: '200px',
    sortable: true,
    render: (_, row) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[var(--accu-gray-6)] truncate">{row.orderName}</span>
          <span
            className="shrink-0 rounded-[2px] px-1.5 py-0.5 text-white font-bold uppercase"
            style={{ fontSize: '9px', lineHeight: '11px', background: 'var(--accu-gray-blue)' }}
          >
            {row.orderType}
          </span>
        </div>
        <span className="text-[var(--accu-gray-4)]" style={{ fontSize: '11px' }}>{row.poNumber}</span>
      </div>
    ),
  },
  {
    key: 'ageDays',
    header: 'Age',
    width: '55px',
    sortable: true,
    render: (val) => (
      <span className="font-bold" style={{ color: val > 30 ? 'var(--accu-red)' : 'var(--accu-gray-5)' }}>
        {val}d
      </span>
    ),
  },
  {
    key: 'hasMoney',
    header: '$',
    width: '36px',
    render: (val, row) => (
      <div className="flex items-center gap-1">
        {val && <DollarSign className="h-3.5 w-3.5 text-[var(--accu-green)]" />}
        {row.hasAlert && <AlertCircle className="h-3.5 w-3.5 text-[var(--accu-red)]" />}
      </div>
    ),
  },
  {
    key: 'wodStatus',
    header: 'Status',
    width: '200px',
    render: (_, row) => {
      const overdue = hasOverdueStatus(row.wodStatus, row.awcStatus)
      return (
        <div className="flex items-center gap-1.5">
          <WodAwcIndicator wodStatus={row.wodStatus} awcStatus={row.awcStatus} eventType={row.eventType} />
          {overdue && <AlertTriangle className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--accu-logo-orange)' }} />}
        </div>
      )
    },
  },
  {
    key: 'criteria',
    header: 'Flag',
    width: '65px',
    render: (val) => {
      if (val === 'none') return null
      const style = CRITERIA_STYLES[val]
      return (
        <span
          className="rounded-[2px] px-1.5 py-0.5 font-bold uppercase"
          style={{ fontSize: '9px', lineHeight: '11px', background: style.bg, color: style.text }}
        >
          {val}
        </span>
      )
    },
  },
  {
    key: 'deliveryDate',
    header: 'Delivery',
    width: '130px',
    render: (_, row) => {
      if (!row.deliveryDate && !row.supplier) return null
      return (
        <div className="flex flex-col" style={{ fontSize: '12px' }}>
          {row.deliveryDate && <span className="text-[var(--accu-gray-5)]">{row.deliveryDate}</span>}
          {row.supplier && <span className="text-[var(--accu-gray-4)]">{row.supplier}</span>}
        </div>
      )
    },
  },
  {
    key: 'crewId',
    header: 'Crew',
    width: '140px',
    render: (_, row) => {
      const crew = row.crewId ? getCrewById(row.crewId) : undefined
      if (!crew && !row.startDate) return null
      return (
        <div className="flex flex-col" style={{ fontSize: '12px' }}>
          {crew && (
            <span className="inline-flex items-center gap-1.5 text-[var(--accu-gray-5)]">
              <span className="inline-block h-2 w-2 rounded-full shrink-0" style={{ background: crew.color }} />
              {crew.name}
            </span>
          )}
          {row.startDate && row.endDate && (
            <span className="text-[var(--accu-gray-4)]">{row.startDate} – {row.endDate}</span>
          )}
        </div>
      )
    },
  },
]

interface ListViewProps {
  orders: MockOrder[]
}

export default function ListView({ orders }: ListViewProps) {
  const [sortColumn, setSortColumn] = useState<string | undefined>()
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (col: string) => {
    if (sortColumn === col) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(col)
      setSortDirection('asc')
    }
  }

  const sortedOrders = sortColumn
    ? [...orders].sort((a, b) => {
        const aVal = (a as unknown as Record<string, unknown>)[sortColumn]
        const bVal = (b as unknown as Record<string, unknown>)[sortColumn]
        let cmp = 0
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          cmp = aVal - bVal
        } else {
          cmp = String(aVal ?? '').localeCompare(String(bVal ?? ''))
        }
        return sortDirection === 'desc' ? -cmp : cmp
      })
    : orders

  return (
    <div className="h-full overflow-auto">
      <Table
        columns={columns}
        data={sortedOrders}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        bordered={false}
      />
    </div>
  )
}
