import { Badge } from '../../components/Badge'

export default function BadgesPage() {
  return (
    <div>
      <h1 className="text-display-sm font-bold mb-6">Badges</h1>
      <p className="text-body-md mb-6" style={{ color: 'var(--accu-gray-5)' }}>
        24x24 solid-colored number badges used for counts and status indicators.
      </p>

      <section className="mb-8">
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Variants
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Badge variant="gray">0</Badge>
            <span className="text-body-sm" style={{ color: 'var(--accu-gray-4)' }}>Gray</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Badge variant="grayBlue">1</Badge>
            <span className="text-body-sm" style={{ color: 'var(--accu-gray-4)' }}>Gray Blue</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Badge variant="warning">1</Badge>
            <span className="text-body-sm" style={{ color: 'var(--accu-gray-4)' }}>Due Today</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Badge variant="danger">3</Badge>
            <span className="text-body-sm" style={{ color: 'var(--accu-gray-4)' }}>Overdue</span>
          </div>
        </div>
      </section>

      <section>
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          In Context
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-body-md">Notifications</span>
          <Badge variant="danger">5</Badge>
        </div>
      </section>
    </div>
  )
}
