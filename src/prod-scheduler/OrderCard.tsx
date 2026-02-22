import { MapPin, AlertCircle, DollarSign, AlertTriangle, Truck, Calendar } from 'lucide-react'
import { type MockOrder } from './data/mock-orders'
import { getCrewById, getCrewColor } from './data/crews'
import WodAwcIndicator, { hasOverdueStatus } from './WodAwcIndicator'

const CRITERIA_STYLES: Record<string, { bg: string; text: string }> = {
  rush:    { bg: 'var(--accu-red)', text: 'var(--accu-white)' },
  hold:    { bg: 'var(--accu-yellow)', text: 'var(--accu-gray-6)' },
  special: { bg: 'var(--accu-purple)', text: 'var(--accu-white)' },
}

interface OrderCardProps {
  order: MockOrder
}

export default function OrderCard({ order }: OrderCardProps) {
  const overdue = hasOverdueStatus(order.wodStatus, order.awcStatus)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`
  const crewColor = getCrewColor(order.crewId)
  const crew = order.crewId ? getCrewById(order.crewId) : undefined

  return (
    <div
      className="rounded-[var(--accu-radius-md)] bg-[var(--accu-white)] flex overflow-hidden"
      style={{ border: '1px solid var(--accu-gray-2)' }}
    >
      {crewColor && (
        <div className="w-[4px] shrink-0" style={{ background: crewColor }} />
      )}
      <div className="flex-1 min-w-0">
      {/* TOP: Customer / Job */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="accu-text-body-md font-bold text-[var(--accu-gray-6)] truncate">
            {order.customerName}
          </span>
          <span className="accu-text-body-sm text-[var(--accu-gray-4)] shrink-0">
            {order.jobNumber}
          </span>
          <span className="flex-1" />
          {order.hasMoney && (
            <DollarSign className="h-3.5 w-3.5 shrink-0 text-[var(--accu-green)]" />
          )}
          {order.hasAlert && (
            <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[var(--accu-red)]" />
          )}
        </div>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-1 hover:underline"
        >
          <MapPin className="h-3 w-3 shrink-0 text-[var(--accu-gray-3)] mt-0.5" />
          <span className="accu-text-body-sm text-[var(--accu-gray-4)] truncate">{order.address}</span>
        </a>
      </div>

      {/* DIVIDER */}
      <div style={{ borderTop: '1px solid var(--accu-gray-1)' }} />

      {/* BOTTOM: Order */}
      <div className="px-3 pt-2 pb-3 flex flex-col gap-1.5">
        {/* Order name + type badge */}
        <div className="flex items-center gap-2">
          <span className="accu-text-body-sm font-bold text-[var(--accu-gray-6)] truncate flex-1">
            {order.orderName}
          </span>
          <span
            className="shrink-0 rounded-[2px] px-1.5 py-0.5 text-white font-bold uppercase"
            style={{ fontSize: '9px', lineHeight: '11px', background: 'var(--accu-gray-blue)' }}
          >
            {order.orderType}
          </span>
        </div>

        {/* PO + age */}
        <div className="flex items-center gap-2">
          <span className="accu-text-body-sm text-[var(--accu-gray-5)]">{order.poNumber}</span>
          <span
            className="accu-text-body-sm font-bold"
            style={{ color: order.ageDays > 30 ? 'var(--accu-red)' : 'var(--accu-gray-5)' }}
          >
            {order.ageDays}d
          </span>
        </div>

        {/* WOD/AWC status */}
        <div className="flex items-center gap-1.5">
          <WodAwcIndicator
            wodStatus={order.wodStatus}
            awcStatus={order.awcStatus}
            eventType={order.eventType}
          />
          {overdue && (
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--accu-logo-orange)' }} />
          )}
        </div>

        {/* Conditional: Delivery + Supplier */}
        {(order.deliveryDate || order.supplier) && (
          <div className="flex items-center gap-2 flex-wrap">
            {order.deliveryDate && (
              <span className="inline-flex items-center gap-1 accu-text-body-sm text-[var(--accu-gray-5)]">
                <Truck className="h-3 w-3 shrink-0" />
                {order.deliveryDate}
              </span>
            )}
            {order.supplier && (
              <span className="accu-text-body-sm text-[var(--accu-gray-4)]">
                {order.supplier}
              </span>
            )}
          </div>
        )}

        {/* Conditional: Crew + Dates */}
        {(crew || order.startDate) && (
          <div className="flex items-center gap-2 flex-wrap">
            {crew && (
              <span className="inline-flex items-center gap-1 accu-text-body-sm text-[var(--accu-gray-5)]">
                <span className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ background: crew.color }} />
                {crew.name}
              </span>
            )}
            {order.startDate && order.endDate && (
              <span className="inline-flex items-center gap-1 accu-text-body-sm text-[var(--accu-gray-4)]">
                <Calendar className="h-3 w-3 shrink-0" />
                {order.startDate} – {order.endDate}
              </span>
            )}
          </div>
        )}

        {/* Conditional: Criteria badge */}
        {order.criteria !== 'none' && (
          <span
            className="self-start rounded-[2px] px-1.5 py-0.5 font-bold uppercase"
            style={{
              fontSize: '9px',
              lineHeight: '11px',
              background: CRITERIA_STYLES[order.criteria].bg,
              color: CRITERIA_STYLES[order.criteria].text,
            }}
          >
            {order.criteria}
          </span>
        )}
      </div>
      </div>
    </div>
  )
}
