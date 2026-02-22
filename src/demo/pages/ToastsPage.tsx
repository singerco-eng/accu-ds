import { useCallback, useState } from 'react'
import { Button } from '../../components/Button'
import { Toast } from '../../components/Toast'
import { type ToastProps } from '../../components/Toast/Toast.types'

type ToastItem = {
  id: number
  variant: ToastProps['variant']
  message: string
}

export default function ToastsPage() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const createToast = useCallback((variant: ToastProps['variant'], message: string) => {
    setToasts((prev) => [{ id: Date.now() + prev.length, variant, message }, ...prev])
  }, [])

  const closeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Toasts</h1>
      <div className="flex flex-wrap gap-3">
        <Button variant="success" onClick={() => createToast('confirmation', 'Your changes were saved successfully.')}>
          Show Confirmation Toast
        </Button>
        <Button variant="warning" onClick={() => createToast('warning', 'Check this warning before continuing.')}>
          Show Warning Toast
        </Button>
        <Button variant="danger" onClick={() => createToast('error', 'Something went wrong. Please retry.')}>
          Show Error Toast
        </Button>
      </div>

      <div className="fixed right-6 top-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} variant={toast.variant} message={toast.message} onClose={() => closeToast(toast.id)} />
        ))}
      </div>
    </div>
  )
}
