import { forwardRef, useImperativeHandle, useRef, useMemo, useEffect, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import { type EventInput, type EventContentArg } from '@fullcalendar/core'
import { crews, getCrewColor } from './data/crews'
import { mockOrders, type MockOrder } from './data/mock-orders'
import CalendarEventCard from './CalendarEventCard'
import './scheduler-calendar.css'

export interface SchedulerCalendarHandle {
  getApi: () => ReturnType<InstanceType<typeof FullCalendar>['getApi']> | null
}

function buildResources() {
  const tradeMap = new Map<string, string[]>()
  for (const crew of crews) {
    const list = tradeMap.get(crew.trade) ?? []
    list.push(crew.id)
    tradeMap.set(crew.trade, list)
  }

  const resources: {
    id: string
    title: string
    parentId?: string
    color?: string
    extendedProps?: Record<string, unknown>
  }[] = []

  for (const [trade, crewIds] of tradeMap) {
    const tradeId = `trade-${trade.toLowerCase().replace(/\s+/g, '-')}`
    resources.push({
      id: tradeId,
      title: trade.toUpperCase(),
      extendedProps: { isTrade: true },
    })

    for (const crewId of crewIds) {
      const crew = crews.find((c) => c.id === crewId)!
      resources.push({
        id: crew.id,
        title: crew.name,
        parentId: tradeId,
        color: crew.color,
        extendedProps: { crewColor: crew.color },
      })
    }
  }

  return resources
}

function buildCalendarEvents(): EventInput[] {
  return mockOrders
    .filter((o) => o.isScheduled && o.startDate && o.endDate && o.crewId)
    .map((order) => {
      const endPlusOne = new Date(order.endDate!)
      endPlusOne.setDate(endPlusOne.getDate() + 1)

      const crewColor = getCrewColor(order.crewId) ?? 'var(--accu-gray-4)'

      return {
        id: order.id,
        resourceId: order.crewId!,
        start: order.startDate!,
        end: endPlusOne.toISOString().split('T')[0],
        title: order.customerName,
        borderColor: crewColor,
        backgroundColor: 'var(--accu-white)',
        textColor: 'var(--accu-gray-6)',
        extendedProps: { order },
      }
    })
}

interface SchedulerCalendarProps {
  view: string
  date: Date
  slotMinWidth?: number
  onDateRangeChange?: (centerDate: Date) => void
}

export const VIEW_MAP: Record<string, string> = {
  week: 'resourceTimelineWeek',
  day: 'resourceTimelineDay',
  month: 'resourceTimelineMonth',
}

const SchedulerCalendar = forwardRef<SchedulerCalendarHandle, SchedulerCalendarProps>(
  function SchedulerCalendar({ view, date, slotMinWidth, onDateRangeChange }, ref) {
    const calendarRef = useRef<FullCalendar>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const resources = useMemo(() => buildResources(), [])
    const events = useMemo(() => buildCalendarEvents(), [])
    const shifting = useRef(false)

    const viewsConfig = useMemo(() => ({
      resourceTimelineWeek: {
        type: 'resourceTimeline' as const,
        duration: { weeks: 3 },
        slotDuration: { days: 1 },
        slotLabelFormat: [
          { month: 'long' as const, year: 'numeric' as const },
          { weekday: 'short' as const, day: 'numeric' as const },
        ],
        slotMinWidth: view === 'week' ? (slotMinWidth ?? 80) : 80,
      },
      resourceTimelineDay: {
        type: 'resourceTimeline' as const,
        duration: { days: 3 },
        slotDuration: { hours: 1 },
        slotLabelFormat: [
          { weekday: 'long' as const, month: 'short' as const, day: 'numeric' as const },
          { hour: 'numeric' as const, meridiem: 'short' as const },
        ],
        slotMinWidth: view === 'day' ? (slotMinWidth ?? 50) : 50,
      },
      resourceTimelineMonth: {
        type: 'resourceTimeline' as const,
        duration: { months: 3 },
        slotDuration: { days: 1 },
        slotLabelFormat: [
          { month: 'long' as const, year: 'numeric' as const },
          { day: 'numeric' as const },
        ],
        slotMinWidth: view === 'month' ? (slotMinWidth ?? 30) : 30,
      },
    }), [view, slotMinWidth])

    const renderEventContent = useCallback((arg: EventContentArg) => {
      const order = arg.event.extendedProps.order as MockOrder | undefined
      if (!order) return null
      return <CalendarEventCard order={order} viewType={arg.view.type} />
    }, [])

    useImperativeHandle(ref, () => ({
      getApi: () => calendarRef.current?.getApi() ?? null,
    }))

    const fcView = VIEW_MAP[view] ?? 'resourceTimelineWeek'

    const handleDatesSet = useCallback((info: { start: Date; end: Date }) => {
      if (shifting.current) return
      const mid = new Date((info.start.getTime() + info.end.getTime()) / 2)
      onDateRangeChange?.(mid)
    }, [onDateRangeChange])

    useEffect(() => {
      const el = containerRef.current
      if (!el) return

      const scroller = el.querySelector('.fc-timeline-body .fc-scroller') as HTMLElement | null
      if (!scroller) return

      let rafId: number | null = null

      const onScroll = () => {
        if (rafId) return
        rafId = requestAnimationFrame(() => {
          rafId = null
          const api = calendarRef.current?.getApi()
          if (!api || shifting.current) return

          const threshold = 80
          const atLeft = scroller.scrollLeft < threshold
          const atRight = scroller.scrollLeft + scroller.clientWidth > scroller.scrollWidth - threshold

          if (atLeft || atRight) {
            shifting.current = true
            const savedRatio = scroller.scrollLeft / scroller.scrollWidth

            if (atRight) api.next()
            else api.prev()

            requestAnimationFrame(() => {
              const newPos = savedRatio * scroller.scrollWidth
              scroller.scrollLeft = newPos
              shifting.current = false

              const viewApi = api.view
              const mid = new Date((viewApi.activeStart.getTime() + viewApi.activeEnd.getTime()) / 2)
              onDateRangeChange?.(mid)
            })
          }
        })
      }

      scroller.addEventListener('scroll', onScroll, { passive: true })
      return () => {
        scroller.removeEventListener('scroll', onScroll)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }, [fcView, onDateRangeChange])

    return (
      <div ref={containerRef} className="scheduler-calendar h-full w-full">
        <FullCalendar
          ref={calendarRef}
          plugins={[resourceTimelinePlugin]}
          initialView={fcView}
          initialDate={date}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          headerToolbar={false}
          resources={resources}
          events={events}
          eventContent={renderEventContent}
          height="100%"
          resourceAreaWidth={160}
          resourceAreaHeaderContent="Crews"
          resourceOrder="title"
          nowIndicator
          datesSet={handleDatesSet}
          views={viewsConfig}
        />
      </div>
    )
  },
)

export default SchedulerCalendar
