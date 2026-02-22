import { ChevronDown, Download, Plus } from 'lucide-react'
import { Button } from '../../components/Button'
import { type ButtonVariant } from '../../components/Button/Button.types'

const variants: { label: string; value: ButtonVariant }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Outline', value: 'outline' },
  { label: 'Text', value: 'text' },
  { label: 'Warning', value: 'warning' },
  { label: 'Danger', value: 'danger' },
  { label: 'Success', value: 'success' },
]

function ButtonRow({ variant, disabled }: { variant: ButtonVariant; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant={variant} disabled={disabled}>
        Label Only
      </Button>
      <Button variant={variant} iconOnly iconLeft={<Plus />} aria-label="Icon only" disabled={disabled} />
      <Button variant={variant} iconLeft={<Plus />} disabled={disabled}>
        Label + Icon
      </Button>
      <Button variant={variant} iconRight={<ChevronDown />} disabled={disabled}>
        Icon + Label
      </Button>
      <Button variant={variant} iconLeft={<Plus />} iconRight={<Download />} disabled={disabled}>
        Icon + Label + Icon
      </Button>
    </div>
  )
}

export default function ButtonsPage() {
  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Buttons</h1>
      {variants.map((variant) => (
        <section key={variant.value} className="mb-8">
          <h2 className="accu-text-display-sm font-bold mb-4">{variant.label}</h2>
          <div className="mb-3">
            <ButtonRow variant={variant.value} />
          </div>
          <ButtonRow variant={variant.value} disabled />
        </section>
      ))}
    </div>
  )
}
