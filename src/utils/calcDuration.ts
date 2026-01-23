export function calcDuration(prevAt: string, now: string) {
    const start = new Date(prevAt).getTime()
    const end = new Date(now).getTime()

    const diff = Math.max(0, end - start)

    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)

    return `${hours}시간 ${minutes}분`
}
