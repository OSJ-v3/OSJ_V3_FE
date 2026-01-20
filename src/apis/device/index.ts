import { instance } from ".."

export async function fetchPushAlertList(token: string) {
    const res = await instance.get<number[]>("/push-alerts/list", {
        params: { token },
    })

    return res.data
}
