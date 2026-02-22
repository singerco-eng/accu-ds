import { useState } from 'react'
import { FileUploader } from '../../components/FileUploader'

export default function FileUploaderPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 accu-text-display-sm font-bold">File Uploader</h1>
        <p className="accu-text-body-md text-[var(--accu-gray-5)]">Solid-border dropzone with image previews and file list.</p>
      </div>

      <section className="space-y-4 rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="accu-text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Dropzone</h2>
        <FileUploader
          accept="image/*,.pdf"
          multiple
          onFilesSelected={(files) => {
            setCount(files.length)
          }}
        />
        <p className="accu-text-body-sm text-[var(--accu-gray-5)]">Selected files: {count}</p>
      </section>
    </div>
  )
}
