import { Panel } from '../../components/Panel'

export default function PanelsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-display-sm font-bold">Panels</h1>
        <p className="text-body-md text-[var(--accu-gray-5)]">Panel headers with 50px height, gray-1 background, and collapsible body.</p>
      </div>

      <section className="space-y-4 rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">States</h2>

        <Panel title="Open Panel" defaultOpen>
          <p className="text-body-md text-[var(--accu-gray-6)]">Panel body content appears with border and rounded bottom corners.</p>
        </Panel>

        <Panel title="Closed Panel">
          <p className="text-body-md text-[var(--accu-gray-6)]">Closed by default.</p>
        </Panel>

        <Panel title="Disabled Panel" disabled>
          <p className="text-body-md text-[var(--accu-gray-6)]">This should not be interactive.</p>
        </Panel>
      </section>
    </div>
  )
}
