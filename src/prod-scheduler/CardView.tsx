import { cn } from '../lib/utils'
import { type MockOrder } from './data/mock-orders'
import TradeGroup from './TradeGroup'

interface CardViewProps {
  groups: Map<string, MockOrder[]>
  layout: 'stack' | 'kanban'
}

export default function CardView({ groups, layout }: CardViewProps) {
  const entries = Array.from(groups.entries())

  if (layout === 'kanban') {
    return (
      <div className="flex h-full overflow-x-auto">
        {entries.map(([name, orders]) => (
          <div
            key={name}
            className="flex flex-col shrink-0 h-full"
            style={{ width: 320, borderRight: '1px solid var(--accu-gray-1)' }}
          >
            <TradeGroup name={name} orders={orders} direction="horizontal" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col overflow-y-auto')}>
      {entries.map(([name, orders]) => (
        <TradeGroup key={name} name={name} orders={orders} direction="vertical" />
      ))}
    </div>
  )
}
