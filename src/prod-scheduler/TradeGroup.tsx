import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../lib/utils'
import { type MockOrder } from './data/mock-orders'
import OrderCard from './OrderCard'

interface TradeGroupProps {
  name: string
  orders: MockOrder[]
  defaultOpen?: boolean
  direction?: 'vertical' | 'horizontal'
}

export default function TradeGroup({ name, orders, defaultOpen = true, direction = 'vertical' }: TradeGroupProps) {
  const [open, setOpen] = useState(defaultOpen)

  const isHorizontal = direction === 'horizontal'

  return (
    <div className={cn(isHorizontal && 'flex flex-col h-full')}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-[var(--accu-gray-0)] transition-colors shrink-0"
        style={{ borderBottom: '1px solid var(--accu-gray-1)' }}
      >
        <span className="accu-text-body-md font-bold text-[var(--accu-gray-6)] flex-1">
          {name}
        </span>
        <span
          className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-white font-bold"
          style={{ fontSize: '11px', background: 'var(--accu-primary-blue)' }}
        >
          {orders.length}
        </span>
        <ChevronDown
          className={cn('h-4 w-4 text-[var(--accu-gray-4)] transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {isHorizontal ? (
        open && (
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="flex flex-col gap-2 p-2">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        )
      ) : (
        <div
          className={cn(
            'grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="min-h-0">
            <div className="flex flex-col gap-2 p-2">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
