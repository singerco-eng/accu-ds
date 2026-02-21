import { useState } from 'react'
import { Button } from '../../components/Button'
import { ModalDrawer } from '../../components/ModalDrawer'

type DrawerSize = 'sm' | 'md' | 'lg'

export default function ModalDrawersPage() {
  const [active, setActive] = useState<DrawerSize | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-display-sm font-bold">Modal Drawers</h1>
        <p className="text-body-md text-[var(--accu-gray-5)]">Right-edge drawers in 600, 900, and 1100 widths.</p>
      </div>

      <section className="rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="mb-4 text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Drawer Sizes</h2>
        <div className="flex flex-wrap gap-[var(--accu-space-3)]">
          <Button onClick={() => setActive('sm')}>Open Small</Button>
          <Button onClick={() => setActive('md')}>Open Medium</Button>
          <Button onClick={() => setActive('lg')}>Open Large</Button>
        </div>
      </section>

      <ModalDrawer
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={`Drawer ${active ?? ''}`}
        size={active ?? 'sm'}
        footer={
          <>
            <Button variant="text" onClick={() => setActive(null)}>
              Cancel
            </Button>
            <Button onClick={() => setActive(null)}>Apply</Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-body-md text-[var(--accu-gray-6)]">Drawer body area follows modal header/footer sizing.</p>
          {Array.from({ length: 6 }).map((_, index) => (
            <p key={index} className="text-body-sm text-[var(--accu-gray-5)]">
              Drawer content row {index + 1}
            </p>
          ))}
        </div>
      </ModalDrawer>
    </div>
  )
}
