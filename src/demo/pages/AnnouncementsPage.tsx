import { useState } from 'react'
import { Announcement } from '../../components/Announcement'

const variants = ['info', 'success', 'warning', 'error'] as const
const contentTypes = ['Title Only', 'Title + Message', 'Title + Message + 1 Button', 'Title + Message + 2 Buttons'] as const

export default function AnnouncementsPage() {
  const [dismissed, setDismissed] = useState<Record<string, boolean>>({})

  return (
    <div>
      <h1 className="text-display-sm font-bold mb-6">Announcements</h1>
      <div className="grid gap-4">
        {variants.flatMap((variant) =>
          contentTypes.map((typeLabel, index) => {
            const id = `${variant}-${index}`
            if (dismissed[id]) return null

            return (
              <Announcement
                key={id}
                variant={variant}
                title={`${variant.toUpperCase()} - ${typeLabel}`}
                message={index === 0 ? undefined : 'This is supporting announcement copy from the design system demo.'}
                primaryAction={index >= 2 ? { label: 'Primary', onClick: () => undefined } : undefined}
                secondaryAction={index === 3 ? { label: 'Secondary', onClick: () => undefined } : undefined}
                onDismiss={() => setDismissed((prev) => ({ ...prev, [id]: true }))}
              />
            )
          }),
        )}
      </div>
    </div>
  )
}
