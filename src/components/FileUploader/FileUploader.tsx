import { X } from 'lucide-react'
import { forwardRef, useMemo, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { type FileUploaderProps } from './FileUploader.types'

type PreviewFile = {
  file: File
  previewUrl?: string
}

export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(function FileUploader(
  { accept, multiple, maxSize, onFilesSelected, label = 'Drag and drop your files', className },
  ref,
) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [items, setItems] = useState<PreviewFile[]>([])

  const emitFiles = (nextItems: PreviewFile[]) => {
    const files = nextItems.map((item) => item.file)
    setItems(nextItems)
    onFilesSelected(files)
  }

  const addFiles = (incoming: File[]) => {
    const normalized = incoming
      .filter((file) => (maxSize ? file.size <= maxSize : true))
      .map((file) => ({
        file,
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      }))
    const nextItems = multiple ? [...items, ...normalized] : normalized.slice(0, 1)
    emitFiles(nextItems)
  }

  const onDropFiles = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    addFiles(Array.from(event.dataTransfer.files))
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(event.currentTarget.files ?? []))
    event.currentTarget.value = ''
  }

  const totalSize = useMemo(
    () => items.reduce((sum, item) => sum + item.file.size, 0),
    [items],
  )

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <div
        role="button"
        tabIndex={0}
        className={cn(
          'flex cursor-pointer items-center justify-center border bg-[var(--accu-white)] p-[var(--accu-space-2)] text-center',
          dragging ? 'border-[var(--accu-primary-blue)] bg-[var(--accu-light-blue)]' : 'border-[var(--accu-primary-blue)]',
        )}
        style={{
          width: 'var(--accu-file-dropzone-width)',
          height: 'var(--accu-file-dropzone-height)',
        }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDropFiles}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            inputRef.current?.click()
          }
        }}
      >
        <p className="accu-text-body-lg font-bold text-[var(--accu-primary-blue)]">{label}</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={onInputChange}
      />

      {items.length > 0 ? (
        <div className="mt-[var(--accu-space-4)] space-y-[var(--accu-space-2)]">
          {items.map((item) => (
            <div key={`${item.file.name}-${item.file.lastModified}`} className="flex items-center justify-between border border-[var(--accu-gray-2)] p-[var(--accu-space-2)]">
              <div className="flex items-center gap-[var(--accu-space-2)]">
                {item.previewUrl ? (
                  <img src={item.previewUrl} alt={item.file.name} className="h-10 w-10 rounded-[var(--accu-radius-sm)] object-cover" />
                ) : null}
                <div>
                  <p className="accu-text-body-sm font-bold text-[var(--accu-gray-6)]">{item.file.name}</p>
                  <p className="accu-text-body-sm text-[var(--accu-gray-5)]">{Math.round(item.file.size / 1024)} KB</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-[var(--accu-radius-sm)] p-[var(--accu-space-1)] text-[var(--accu-gray-4)] hover:bg-[var(--accu-gray-1)]"
                onClick={() => emitFiles(items.filter((candidate) => candidate !== item))}
                aria-label={`Remove ${item.file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <p className="accu-text-body-sm text-[var(--accu-gray-5)]">Total: {Math.round(totalSize / 1024)} KB</p>
        </div>
      ) : null}
    </div>
  )
})
