import { Avatar } from '../../components/Avatar'

const imageUrl = 'https://i.pravatar.cc/256?img=12'
const sizes: Array<24 | 32 | 50 | 128> = [24, 32, 50, 128]

export default function AvatarsPage() {
  return (
    <div>
      <h1 className="text-display-sm font-bold mb-6">Avatars</h1>
      <div className="grid gap-8">
        <section>
          <h2 className="text-display-sm font-bold mb-3">Image Variants</h2>
          <div className="flex flex-wrap items-end gap-4">
            {sizes.map((size) => (
              <div key={`img-${size}`} className="flex flex-col items-center gap-2">
                <Avatar size={size} src={imageUrl} alt={`Avatar ${size}`} />
                <span className="text-body-sm font-regular">{size}px</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-display-sm font-bold mb-3">Initials Variants</h2>
          <div className="flex flex-wrap items-end gap-4">
            {sizes.map((size) => (
              <div key={`initial-${size}`} className="flex flex-col items-center gap-2">
                <Avatar size={size} initials="AL" />
                <span className="text-body-sm font-regular">{size}px</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
