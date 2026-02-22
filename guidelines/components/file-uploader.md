### FileUploader

**Purpose**: Provides a drag-and-drop zone and file input for selecting files, with optional previews and size validation.

**Import**:
```tsx
import { FileUploader } from '@al-ds/design-system'
import '@al-ds/design-system/styles.css'
```

**Props**:
| Prop | Type | Default |
|------|------|---------|
| `accept` | `string` | — |
| `multiple` | `boolean` | — |
| `maxSize` | `number` | — |
| `onFilesSelected` | `(files: File[]) => void` | required |
| `label` | `string` | `'Drag and drop your files'` |
| `className` | `string` | — |

**Variants/Options**:
- **Single vs multiple**: Set `multiple` to allow selecting multiple files
- **File types**: Use `accept` (e.g. `"image/*"`, `".pdf,.doc"`) to restrict file types
- **Size limit**: Use `maxSize` (bytes) to reject files exceeding the limit

**Usage Example**:
```tsx
function DocumentUpload() {
  const handleFiles = (files: File[]) => {
    console.log('Selected:', files)
  }
  return (
    <FileUploader
      accept=".pdf,.doc,.docx"
      multiple
      maxSize={5 * 1024 * 1024}
      onFilesSelected={handleFiles}
      label="Drag and drop documents (max 5MB)"
    />
  )
}
```

**Do/Don't**:
- Do: Set `accept` to guide users toward valid file types
- Do: Use `maxSize` to enforce upload limits (e.g. 5MB = `5 * 1024 * 1024`)
- Don't: Omit `onFilesSelected`—it is required to receive selected files
- Don't: Rely on `maxSize` alone for security; validate file size on the server
