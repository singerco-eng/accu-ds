import { Tag } from '../../components/Tag'

export default function TagsPage() {
  return (
    <div>
      <h1 className="text-display-sm font-bold mb-6">Tags</h1>
      <p className="text-body-md mb-6" style={{ color: 'var(--accu-gray-5)' }}>
        Small solid-colored labels. 10px text, white on colored background.
      </p>

      <section className="mb-8">
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Color Variants
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="blue" weight="regular">Blue Regular</Tag>
          <Tag variant="darkBlue" weight="regular">Dark Blue Regular</Tag>
          <Tag variant="gray" weight="light">Gray Light</Tag>
          <Tag variant="gray" weight="regular">Gray Regular</Tag>
        </div>
      </section>

      <section>
        <h2
          className="font-bold mb-3 uppercase tracking-wide"
          style={{ fontSize: '10px', color: 'var(--accu-gray-5)' }}
        >
          Removable
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="blue" removable onRemove={() => undefined}>Removable Blue</Tag>
          <Tag variant="gray" weight="regular" removable onRemove={() => undefined}>Removable Gray</Tag>
        </div>
      </section>
    </div>
  )
}
