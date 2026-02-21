import { forwardRef } from 'react'
import { cn } from '../../lib/utils'
import { type AvatarProps } from './Avatar.types'

const fontSizeMap: Record<NonNullable<AvatarProps['size']>, { size: string; weight: number }> = {
  24: { size: '10px', weight: 700 },
  32: { size: '12px', weight: 300 },
  50: { size: '18px', weight: 300 },
  128: { size: '42px', weight: 300 },
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { src, alt = 'Avatar', initials = '', size = 32, className },
  ref,
) {
  const font = fontSizeMap[size] ?? { size: `${Math.round(size * 0.375)}px`, weight: 300 }
  const label = initials.trim().slice(0, 2).toUpperCase()

  return (
    <div
      ref={ref}
      className={cn('inline-flex items-center justify-center overflow-hidden rounded-full', className)}
      style={{ width: `${size}px`, height: `${size}px`, background: 'var(--accu-gray-2)' }}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span
          style={{
            color: 'var(--accu-gray-5)',
            fontSize: font.size,
            fontWeight: font.weight,
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
})
