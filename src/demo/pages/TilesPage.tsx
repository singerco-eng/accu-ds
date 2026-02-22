import { FileText, AlertCircle, DollarSign, CreditCard } from 'lucide-react'
import { Tile, MilestoneTile, MilestoneIcon, milestoneColors } from '../../components/Tile'
import type { MilestoneStage } from '../../components/Tile'

const pipelineData: { stage: MilestoneStage; count: number; amount: string }[] = [
  { stage: 'lead', count: 14, amount: '–' },
  { stage: 'prospect', count: 11, amount: '$12,772,909' },
  { stage: 'approved', count: 43, amount: '$101,001,672,125' },
  { stage: 'completed', count: 10, amount: '$180,817' },
  { stage: 'invoice', count: 11, amount: '$1,550,954' },
]

export default function TilesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 accu-text-display-sm font-bold">Tiles</h1>
        <p className="accu-text-body-md text-[var(--accu-gray-5)]">Action tiles and milestone tiles from the Figma DS with actual SVG icons pulled from the Figma API.</p>
      </div>

      {/* Action Item Tiles */}
      <section className="rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="mb-4 accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Action Tiles</h2>
        <div className="flex flex-wrap gap-[var(--accu-space-3)]">
          <Tile
            title="Submitted Financial"
            subtitle="Worksheets"
            count="1"
            rightIcon={<FileText className="h-6 w-6 text-[var(--accu-primary-blue)]" />}
          />
          <Tile
            title="Overdue Invoices"
            count="16"
            rightIcon={<AlertCircle className="h-6 w-6 text-[var(--accu-red)]" />}
          />
          <Tile
            title="Invoices Not"
            subtitle="Recorded"
            count="32"
            rightIcon={<FileText className="h-6 w-6 text-[var(--accu-green)]" />}
          />
          <Tile
            title="Requested Payments"
            count="34"
            rightIcon={<CreditCard className="h-6 w-6 text-[var(--accu-primary-blue)]" />}
          />
          <Tile
            title="Cancelled Jobs with"
            subtitle="Balance Due"
            count="0"
            rightIcon={<DollarSign className="h-6 w-6 text-[var(--accu-gray-6)]" />}
          />
          <Tile title="Open Disputes" count="0" />
          <Tile title="No Actions" subtitle="Nothing due" count="0" disabled />
        </div>
      </section>

      {/* Milestone Tiles */}
      <section className="rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="mb-4 accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Milestone Tiles</h2>
        <div className="flex flex-wrap gap-[var(--accu-space-3)]">
          <MilestoneTile stage="lead" count="14" amount="–" />
          <MilestoneTile stage="prospect" count="11" amount="$12,772,909" />
          <MilestoneTile stage="approved" count="43" amount="$101M" />
          <MilestoneTile stage="completed" count="10" amount="$180,817" />
          <MilestoneTile stage="invoice" count="11" amount="$1,550,954" />
          <MilestoneTile stage="unassigned" count="2" amount="$0" />
          <MilestoneTile stage="closed" count="5" amount="$45,200" />
          <MilestoneTile stage="cancelled" count="1" amount="$0" />
        </div>
      </section>

      {/* Pipeline Example (from screenshot) */}
      <section className="rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="accu-text-body-lg font-normal text-[var(--accu-gray-6)]">Current Pipeline</h2>
          <span className="accu-text-body-sm text-[var(--accu-gray-5)]">Active Jobs: 89</span>
        </div>
        <div className="flex items-start justify-around">
          {pipelineData.map((item) => (
            <div key={item.stage} className="flex flex-col items-center gap-1">
              <MilestoneIcon stage={item.stage} size={48} />
              <span className="text-[20px] font-bold" style={{ color: milestoneColors[item.stage] }}>
                {item.count}
              </span>
              <span className="accu-text-body-sm text-[var(--accu-gray-5)]">{item.amount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* All Milestone Icons */}
      <section className="rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="mb-4 accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Milestone Icon Reference</h2>
        <div className="flex flex-wrap gap-[var(--accu-space-4)]">
          {(['lead', 'prospect', 'approved', 'completed', 'invoice', 'unassigned', 'closed', 'cancelled'] as MilestoneStage[]).map((stage) => (
            <div key={stage} className="flex flex-col items-center gap-2">
              <MilestoneIcon stage={stage} size={48} />
              <span className="accu-text-body-sm font-bold capitalize" style={{ color: milestoneColors[stage] }}>{stage}</span>
              <span className="text-[10px] text-[var(--accu-gray-4)]">{milestoneColors[stage]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
