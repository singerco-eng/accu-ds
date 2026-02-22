import { type WodAwcStatus, type WodStatus, type AwcStatus, type EventType } from './data/mock-orders'

export type { WodPhase, AwcPhase } from './data/mock-orders'
export { getWodPhase, getAwcPhase } from './data/mock-orders'

const STATUS_STYLES: Record<WodAwcStatus, { bg: string; text: string; border?: string }> = {
  pending:  { bg: 'var(--accu-white)', text: 'var(--accu-gray-4)', border: 'var(--accu-gray-3)' },
  complete: { bg: 'var(--accu-gray-4)', text: 'var(--accu-white)' },
  today:    { bg: '#F4A393', text: 'var(--accu-white)' },
  overdue:  { bg: 'var(--accu-red)', text: 'var(--accu-white)' },
}

interface StatusBadgeProps {
  letter: string
  status: WodAwcStatus
}

function StatusBadge({ letter, status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status]
  return (
    <span
      className="inline-flex h-[18px] w-[18px] items-center justify-center font-bold"
      style={{
        fontSize: '10px',
        lineHeight: 1,
        background: style.bg,
        color: style.text,
        border: style.border ? `1.5px solid ${style.border}` : undefined,
        borderRadius: 2,
      }}
    >
      {letter}
    </span>
  )
}

interface WodAwcIndicatorProps {
  wodStatus: WodStatus
  awcStatus: AwcStatus
  eventType: EventType
}

export default function WodAwcIndicator({ wodStatus, awcStatus, eventType }: WodAwcIndicatorProps) {
  const showWod = eventType !== 'labor-only'
  const showAwc = eventType !== 'material-only'

  return (
    <div className="flex items-center gap-2">
      {showWod ? (
        <div className="flex items-center gap-0.5">
          <StatusBadge letter="W" status={wodStatus.w} />
          <StatusBadge letter="O" status={wodStatus.o} />
          <StatusBadge letter="D" status={wodStatus.d} />
        </div>
      ) : (
        <span
          className="inline-flex items-center px-1.5 font-bold uppercase"
          style={{ fontSize: '9px', lineHeight: '18px', background: 'var(--accu-gray-2)', color: 'var(--accu-gray-5)', borderRadius: 2 }}
        >
          No Material
        </span>
      )}

      {showAwc ? (
        <div className="flex items-center gap-0.5">
          <StatusBadge letter="A" status={awcStatus.a} />
          <StatusBadge letter="W" status={awcStatus.w} />
          <StatusBadge letter="C" status={awcStatus.c} />
        </div>
      ) : (
        <span
          className="inline-flex items-center px-1.5 font-bold uppercase"
          style={{ fontSize: '9px', lineHeight: '18px', background: 'var(--accu-gray-2)', color: 'var(--accu-gray-5)', borderRadius: 2 }}
        >
          No Labor
        </span>
      )}
    </div>
  )
}

export function hasOverdueStatus(wodStatus: WodStatus, awcStatus: AwcStatus): boolean {
  return (
    wodStatus.w === 'overdue' ||
    wodStatus.o === 'overdue' ||
    wodStatus.d === 'overdue' ||
    awcStatus.a === 'overdue' ||
    awcStatus.w === 'overdue' ||
    awcStatus.c === 'overdue'
  )
}

