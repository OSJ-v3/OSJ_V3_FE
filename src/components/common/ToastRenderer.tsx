import { Toast } from "./Toast"
import { useToastContext } from "../../contexts/ToastContext"

export function ToastRenderer() {
    const { toast, visible } = useToastContext()

    if (!toast) return null

    return <Toast text={toast.text} type={toast.type} visible={visible} />
}
