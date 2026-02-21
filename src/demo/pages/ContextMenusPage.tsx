import { Copy, Download, Pencil, Trash2, UserCircle2 } from 'lucide-react'
import { ContextMenu } from '../../components/ContextMenu'

export default function ContextMenusPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-display-sm font-bold">Context Menus</h1>
        <p className="text-body-md text-[var(--accu-gray-5)]">
          3-dot trigger with 200px dropdown, blue text, 24px icons, and divider rows.
        </p>
      </div>

      <section className="rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="mb-4 text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Default Menu</h2>
        <ContextMenu
          items={[
            { label: 'Edit', onClick: () => {}, icon: <Pencil className="h-6 w-6" /> },
            { label: 'Assign', onClick: () => {}, icon: <UserCircle2 className="h-6 w-6" />, dividerAfter: true },
            { label: 'Duplicate', onClick: () => {}, icon: <Copy className="h-6 w-6" /> },
            { label: 'Download', onClick: () => {}, icon: <Download className="h-6 w-6" /> },
            { label: 'Delete', onClick: () => {}, icon: <Trash2 className="h-6 w-6" />, disabled: true },
          ]}
        />
      </section>
    </div>
  )
}
