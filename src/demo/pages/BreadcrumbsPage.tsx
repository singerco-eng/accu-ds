import { Breadcrumbs } from '../../components/Breadcrumbs'

export default function BreadcrumbsPage() {
  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Breadcrumbs</h1>
      <div className="flex flex-col gap-6">
        <section>
          <h2 className="accu-text-display-sm font-bold mb-3">3-Item Breadcrumb</h2>
          <Breadcrumbs
            items={[
              { label: 'Dashboard', href: '#' },
              { label: 'Projects', href: '#', active: true },
              { label: 'AccuLynx DS' },
            ]}
          />
        </section>

        <section>
          <h2 className="accu-text-display-sm font-bold mb-3">5-Item Breadcrumb</h2>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '#' },
              { label: 'Admin', href: '#' },
              { label: 'Settings', href: '#' },
              { label: 'Users', href: '#' },
              { label: 'User Profile' },
            ]}
          />
        </section>

        <section>
          <h2 className="accu-text-display-sm font-bold mb-3">Back To List Variant</h2>
          <Breadcrumbs items={[{ label: 'Jobs' }]} />
        </section>
      </div>
    </div>
  )
}
