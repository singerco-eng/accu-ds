export interface ProgressBarProps {
  value: number
  max?: number
  color?: 'blue' | 'green' | 'red' | 'gray'
  className?: string
}

export interface ProgressStepsProps {
  steps: string[]
  currentStep: number
  className?: string
}
