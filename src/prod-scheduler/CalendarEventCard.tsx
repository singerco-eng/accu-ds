import { DollarSign } from 'lucide-react'
import { type MockOrder } from './data/mock-orders'

interface CalendarEventCardProps {
  order: MockOrder
  viewType: string
}

export default function CalendarEventCard({ order, viewType }: CalendarEventCardProps) {
  const isDay = viewType === 'resourceTimelineDay'
  const isMonth = viewType === 'resourceTimelineMonth'

  if (isMonth) {
    return (
      <div className="cal-event-inner cal-event-month">
        <span className="cal-event-name">{order.customerName}</span>
      </div>
    )
  }

  if (isDay) {
    return (
      <div className="cal-event-inner cal-event-day">
        <div className="cal-event-row">
          <span className="cal-event-name">{order.customerName}</span>
          {order.hasMoney && <DollarSign className="cal-event-icon" />}
        </div>
        <span className="cal-event-address">{order.address}</span>
        <span className="cal-event-order">{order.orderName}</span>
      </div>
    )
  }

  return (
    <div className="cal-event-inner cal-event-week">
      <div className="cal-event-row">
        <span className="cal-event-name">{order.customerName}</span>
        {order.hasMoney && <DollarSign className="cal-event-icon" />}
      </div>
      <span className="cal-event-address">{order.address}</span>
    </div>
  )
}
