import LeadSvg from '../../assets/milestone-icons/lead.svg'
import ProspectSvg from '../../assets/milestone-icons/prospect.svg'
import ApprovedSvg from '../../assets/milestone-icons/approved.svg'
import CompletedSvg from '../../assets/milestone-icons/completed.svg'
import InvoiceSvg from '../../assets/milestone-icons/invoice.svg'
import UnassignedSvg from '../../assets/milestone-icons/unassigned.svg'
import ClosedSvg from '../../assets/milestone-icons/closed.svg'
import CancelledSvg from '../../assets/milestone-icons/cancelled.svg'

export type MilestoneStage =
  | 'lead'
  | 'prospect'
  | 'approved'
  | 'completed'
  | 'invoice'
  | 'unassigned'
  | 'closed'
  | 'cancelled'

const svgMap: Record<MilestoneStage, string> = {
  lead: LeadSvg,
  prospect: ProspectSvg,
  approved: ApprovedSvg,
  completed: CompletedSvg,
  invoice: InvoiceSvg,
  unassigned: UnassignedSvg,
  closed: ClosedSvg,
  cancelled: CancelledSvg,
}

export const milestoneColors: Record<MilestoneStage, string> = {
  lead: '#F4C200',
  prospect: '#F4925D',
  approved: '#8BC541',
  completed: '#17A9E1',
  invoice: '#E54A48',
  unassigned: '#AB55A0',
  closed: '#4D4D4D',
  cancelled: '#9D9D9D',
}

interface MilestoneIconProps {
  stage: MilestoneStage
  size?: number
  className?: string
}

export function MilestoneIcon({ stage, size = 40, className }: MilestoneIconProps) {
  return (
    <img
      src={svgMap[stage]}
      alt={stage}
      width={size}
      height={size}
      className={className}
    />
  )
}
