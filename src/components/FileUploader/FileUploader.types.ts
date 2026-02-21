export interface FileUploaderProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  onFilesSelected: (files: File[]) => void
  label?: string
  className?: string
}
