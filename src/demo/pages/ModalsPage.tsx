import { useState } from 'react'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

type ModalSize = 'sm' | 'lg' | 'xl' | 'fullscreen'

export default function ModalsPage() {
  const [active, setActive] = useState<ModalSize | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-display-sm font-bold">Modals</h1>
        <p className="text-body-md text-[var(--accu-gray-5)]">Popup modal sizes from Figma with header/body/footer slots.</p>
      </div>

      <section className="rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="mb-4 text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Modal Sizes</h2>
        <div className="flex flex-wrap gap-[var(--accu-space-3)]">
          <Button onClick={() => setActive('sm')}>Open Small (650)</Button>
          <Button onClick={() => setActive('lg')}>Open Large (950)</Button>
          <Button onClick={() => setActive('xl')}>Open XL (1100)</Button>
          <Button onClick={() => setActive('fullscreen')}>Open Fullscreen</Button>
        </div>
      </section>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={`Modal ${active ?? ''}`}
        size={active ?? 'sm'}
        footer={
          <>
            <Button variant="text" onClick={() => setActive(null)}>
              Cancel
            </Button>
            <Button onClick={() => setActive(null)}>Save</Button>
          </>
        }
      >
        <div className="space-y-3">
          <p className="text-body-md text-[var(--accu-gray-6)]">
            Modal body is scrollable with a fixed Figma header/footer structure.
          </p>
          {Array.from({ length: 8 }).map((_, index) => (
            <p key={index} className="text-body-sm text-[var(--accu-gray-5)]">
              Sample content row {index + 1}
            </p>
          ))}
        </div>
      </Modal>
    </div>
  )
}
