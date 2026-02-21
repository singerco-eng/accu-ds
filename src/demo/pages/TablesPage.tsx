import { useMemo, useState } from 'react'
import { Checkbox } from '../../components/Checkbox'
import { Table, TableTabs } from '../../components/Table'
import { type TableColumn, type TableTab } from '../../components/Table/Table.types'

type InvoiceRow = {
  title: string
  amount: string
  email: string
  contact: string
}

const invoiceTabs: TableTab[] = [
  { key: 'pending', label: 'Pending', count: 52 },
  { key: 'completed', label: 'Completed', count: 49 },
  { key: 'rejected', label: 'Rejected', count: 14 },
  { key: 'cancelled', label: 'Cancelled', count: 17 },
  { key: 'voided', label: 'Voided', count: 8 },
  { key: 'expired', label: 'Expired', count: 31 },
]

const invoiceData: Record<string, InvoiceRow[]> = {
  pending: [
    { title: 'Smith Residence Roof', amount: '$ 14,250.00', email: 'john.smith@gmail.com', contact: 'john.smith@gmail.com' },
    { title: 'Johnson Siding Repair', amount: '$ 8,900.00', email: 'aj.johnson@gmail.com', contact: 'aj.johnson@gmail.com' },
    { title: 'Williams Gutter Install', amount: '$ 3,200.00', email: 'mary.w@gmail.com', contact: 'mary.w@gmail.com' },
  ],
  completed: [
    { title: 'Davis Full Reroof', amount: '$ 22,500.00', email: 'bob.davis@gmail.com', contact: 'bob.davis@gmail.com' },
    { title: 'Martinez Window Trim', amount: '$ 6,750.00', email: 'rosa.m@gmail.com', contact: 'rosa.m@gmail.com' },
  ],
  rejected: [
    { title: 'Text', amount: '$ 00.00', email: 'sample@gmail.com', contact: 'sample@gmail.com' },
    { title: 'Text', amount: '$ 00.00', email: 'sample@gmail.com', contact: 'sample@gmail.com' },
  ],
  cancelled: [
    { title: 'Anderson Storm Damage', amount: '$ 5,100.00', email: 'mike.a@gmail.com', contact: 'mike.a@gmail.com' },
  ],
  voided: [],
  expired: [
    { title: 'Brown Skylight Install', amount: '$ 4,800.00', email: 'pat.brown@gmail.com', contact: 'pat.brown@gmail.com' },
  ],
}

const invoiceColumns: TableColumn<InvoiceRow>[] = [
  { key: 'title', header: 'Title', sortable: true, width: '30%' },
  { key: 'amount', header: 'Title', sortable: true },
  { key: 'email', header: 'Title', sortable: true },
  { key: 'contact', header: 'Title', sortable: true },
]

type ContactRow = {
  name: string
  email: string
  date: string
  phone: string
  selected: boolean
}

const contactRows: ContactRow[] = [
  { name: 'Alex Lee', email: 'alex.lee@example.com', date: '02/21/2026', phone: '(312) 555-0198', selected: true },
  { name: 'Morgan Hall', email: 'morgan.hall@example.com', date: '02/19/2026', phone: '(773) 555-0134', selected: false },
  { name: 'Chris Park', email: 'chris.park@example.com', date: '02/18/2026', phone: '(630) 555-0102', selected: true },
  { name: 'Jamie Rivera', email: 'jamie.rivera@example.com', date: '02/17/2026', phone: '(847) 555-0267', selected: false },
]

export default function TablesPage() {
  const [activeTab, setActiveTab] = useState('rejected')
  const [sortColumn, setSortColumn] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const tabData = invoiceData[activeTab] ?? []

  const [contactSort, setContactSort] = useState<keyof ContactRow>('name')
  const [contactDir, setContactDir] = useState<'asc' | 'desc'>('asc')

  const sortedContacts = useMemo(() => {
    return [...contactRows].sort((a, b) => {
      const left = String(a[contactSort])
      const right = String(b[contactSort])
      return contactDir === 'asc' ? left.localeCompare(right) : right.localeCompare(left)
    })
  }, [contactSort, contactDir])

  const contactColumns: TableColumn<ContactRow>[] = [
    { key: 'name', header: 'Name', sortable: true, width: '20%' },
    { key: 'email', header: 'Email', sortable: true, width: '25%' },
    { key: 'date', header: 'Date', sortable: true, width: '15%' },
    { key: 'phone', header: 'Phone', width: '20%' },
    {
      key: 'selected',
      header: 'Selected',
      render: (value) => <Checkbox checked={Boolean(value)} onChange={() => {}} />,
    },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2 text-display-sm font-bold">Tables</h1>
        <p className="text-body-md text-[var(--accu-gray-5)]">
          Table component with tabs, sortable columns, and styled headers matching Figma.
        </p>
      </div>

      {/* Figma-matching example: Tabs + Table */}
      <section>
        <h2 className="mb-3 text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Table Tabs + Data Table</h2>
        <div className="overflow-hidden rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)]">
          <TableTabs tabs={invoiceTabs} activeTab={activeTab} onTabChange={setActiveTab} />
          <Table
            columns={invoiceColumns}
            data={tabData}
            bordered={false}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          {tabData.length === 0 ? (
            <div className="flex h-[120px] items-center justify-center text-body-md text-[var(--accu-gray-4)]">
              No records found.
            </div>
          ) : null}
        </div>
      </section>

      {/* Contacts table – sortable, clickable */}
      <section>
        <h2 className="mb-3 text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Sortable Contact Table</h2>
        <Table
          columns={contactColumns}
          data={sortedContacts}
          sortColumn={contactSort}
          sortDirection={contactDir}
          onSort={(column) => {
            const key = column as keyof ContactRow
            if (key === contactSort) {
              setContactDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
            } else {
              setContactSort(key)
              setContactDir('asc')
            }
          }}
          onRowClick={(row) => console.log('Clicked:', row.name)}
        />
      </section>
    </div>
  )
}
