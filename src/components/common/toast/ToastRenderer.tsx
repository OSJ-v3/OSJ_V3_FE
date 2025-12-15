import { useToastContext } from "../../../contexts"
import { Toast } from "./Toast"

export function ToastRenderer() {
    const { toast, visible } = useToastContext()

    if (!toast) return null

    return <Toast text={toast.text} type={toast.type} visible={visible} />
}
