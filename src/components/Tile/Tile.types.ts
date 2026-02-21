import { type ReactNode } from 'react'
import { type MilestoneStage } from './MilestoneIcon'

export interface ActionTileProps {
  title: string
  subtitle?: string
  count?: ReactNode
  rightIcon?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export interface MilestoneTileProps {
  stage?: MilestoneStage
  icon?: ReactNode
  count?: ReactNode
  amount?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export type TileProps = ActionTileProps
