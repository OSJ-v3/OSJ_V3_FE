import { instance } from "../../apis"
import { useToastContext } from "../../contexts/ToastContext"
import { useAlarmStore, useFcmStore } from "../../stores"
import { BottomSheet, Button } from "../common"

interface Props {
    device: {
        id: number
        type: "WASH" | "DRY"
        state: 0 | 1 | 2 | 3
    }
    onClose: () => void
}

export function DeviceAlarmSheet({ device, onClose }: Props) {
    const { showToast } = useToastContext()
    const { hasAlarm, addAlarm, removeAlarm } = useAlarmStore()
    const { token } = useFcmStore()
    const isAlarmed = hasAlarm(device.id)

    const deviceName = device.type === "WASH" ? "세탁기" : "건조기"

    const handleRemoveAlarm = async () => {
        if (!token) {
            showToast("알림 토큰이 없습니다.", "error")
            return
        }

        try {
            await instance.delete("/push-alerts", {
                data: {
                    id: device.id,
                    token,
                },
            })

            removeAlarm(device.id)
            showToast(`${deviceName} 알림이 해제되었습니다.`, "success")
            onClose()
        } catch (err: any) {
            const status = err?.response?.status

            if (status === 404) {
                showToast("존재하지 않는 기기입니다.", "error")
            } else if (status === 409) {
                showToast("이미 알림이 해제된 상태입니다.", "info")
            } else {
                showToast("알림 해제에 실패했어요.", "error")
                console.error("알람 해제 요청 실패", err)
            }
        }
    }

    const handleAddAlarm = async () => {
        if (device.state !== 0) {
            showToast("작동 중인 기기만 알림을 설정할 수 있어요.", "error")
            return
        }

        if (!token) {
            showToast("알림 토큰이 없습니다.", "error")
            return
        }

        try {
            await instance.post("/push-alerts", {
                id: device.id,
                token,
            })

            addAlarm({ id: device.id, type: device.type })
            showToast(`${deviceName} 알림 설정이 완료되었습니다.`, "success")
            onClose()
        } catch (err: any) {
            const status = err?.response?.status

            if (status === 404) {
                showToast("존재하지 않는 기기입니다.", "error")
            } else if (status === 409) {
                showToast("이미 알림이 설정되어 있어요.", "info")
            } else {
                showToast("알림 설정에 실패했어요.", "error")
                console.error("알람 등록 요청 실패", err)
            }
        }
    }

    if (isAlarmed) {
        return (
            <BottomSheet
                title={`${device.id}번${deviceName}의\n알림 설정을 해제하실 건가요?`}
                caption="알림 설정을 해제하시면 종료 알림을 받으실 수 없습니다."
                onClose={onClose}
                actions={
                    <>
                        <Button variant="gray" onClick={onClose}>
                            취소
                        </Button>
                        <Button onClick={handleRemoveAlarm}>알림 해제</Button>
                    </>
                }
            />
        )
    }

    if (device.state === 0) {
        return (
            <BottomSheet
                title={`${device.id}번 ${deviceName}의\n알림을 설정할까요?`}
                caption={`${deviceName}가 종료되면 알림을 드릴게요.`}
                onClose={onClose}
                actions={
                    <>
                        <Button variant="gray" onClick={onClose}>
                            취소
                        </Button>
                        <Button onClick={handleAddAlarm}>알림 설정</Button>
                    </>
                }
            />
        )
    }

    const statusMap = {
        1: {
            title: `${device.id}번 ${deviceName}는\n현재 사용할 수 있어요!`,
            caption: "",
        },
        2: {
            title: `${device.id}번 ${deviceName}는\n연결이 끊겨서 사용할 수 없어요.`,
            caption: `다른 ${deviceName}를 사용해주세요.\n빠른 시일 내에 연결해 사용 가능하도록 하겠습니다.`,
        },
        3: {
            title: `${device.id}번 ${deviceName}는\n고장으로 인해 사용할 수 없어요.`,
            caption: `다른 ${deviceName}를 사용해주세요.\n빠른 시일 내에 수리해 사용 가능하도록 하겠습니다.`,
        },
    } as const

    const { title, caption } = statusMap[device.state]

    return (
        <BottomSheet
            title={title}
            caption={caption}
            onClose={onClose}
            actions={<Button onClick={onClose}>확인</Button>}
        />
    )
}
