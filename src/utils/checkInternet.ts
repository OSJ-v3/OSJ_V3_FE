export async function checkInternet(timeout = 3000): Promise<boolean> {
    try {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)

        // 실제 우리 서버 api로 변경 (get으로)
        const res = await fetch("https://clients3.google.com/generate_204", {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
        })

        clearTimeout(id)
        return res.status === 204
    } catch {
        return false
    }
}
