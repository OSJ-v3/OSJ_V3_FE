import { BottomSheet, Button } from "../common";
import { useToastContext } from "../../contexts";
import { useAlarmStore } from "../../stores";
import { useFCMStore } from "../../stores/fcmStore";
import { useCreatePushAlert } from "../../hooks/useCreatePushAlert";
import { useDeletePushAlert } from "../../hooks/useDeletePushAlert";

interface Props {
  device: {
    id: number;
    type: "WASH" | "DRY";
    state: 0 | 1 | 2 | 3;
  };
  onClose: () => void;
}

export function DeviceAlarmSheet({ device, onClose }: Props) {
  const { showToast } = useToastContext();

  const { token } = useFCMStore();
  const { hasAlarm } = useAlarmStore();

  const { mutate: createAlert, isPending: isCreating } = useCreatePushAlert();
  const { mutate: deleteAlert, isPending: isDeleting } = useDeletePushAlert();

  const isAlarmed = hasAlarm(device.id);
  const deviceName = device.type === "WASH" ? "세탁기" : "건조기";

  if (isAlarmed) {
    return (
      <BottomSheet
        title={`${device.id}번 ${deviceName}의\n알림을 해제할까요?`}
        caption="알림을 해제하면 종료 알림을 받을 수 없습니다."
        onClose={onClose}
        actions={
          <>
            <Button kind="gray" onClick={onClose} disabled={isDeleting}>
              취소
            </Button>
            <Button
              onClick={() => {
                if (!token) {
                  alert("FCM 토큰이 없. 잠시 후 다시 시도 ㄱㄱ");
                  return;
                }

                deleteAlert(
                  {
                    id: device.id,
                    token,
                  },
                  {
                    onSuccess: () => {
                      alert(`${device.id}번 ${deviceName} 알림 해제 완료`);
                      showToast(
                        `${deviceName} 알림이 해제되었습니다.`,
                        "success"
                      );
                      onClose();
                    },
                    onError: (error: any) => {
                      alert(`알림 해제 실패\n\n${error.message}`);
                    },
                  }
                );
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "처리 중..." : "알림 해제"}
            </Button>
          </>
        }
      />
    );
  }

  if (device.state === 0) {
    return (
      <BottomSheet
        title={`${device.id}번 ${deviceName}의\n알림을 설정할까요?`}
        caption={`${deviceName}가 종료되면 알림을 보내드릴게요.`}
        onClose={onClose}
        actions={
          <>
            <Button kind="gray" onClick={onClose} disabled={isCreating}>
              취소
            </Button>
            <Button
              onClick={() => {
                if (!token) {
                  alert("FCM 토큰이 X 잠시 후 다시 시도ㄱㄱ");
                  return;
                }

                alert(
                  `알림 설정 시작\n\n기기 ID: ${device.id}\n타입: ${deviceName}\nexpectState: 1`
                );

                createAlert(
                  {
                    id: device.id,
                    token,
                    expectState: 1,
                  },
                  {
                    onSuccess: () => {
                      alert(`${device.id}번 ${deviceName} 알림 설정 완료!`);
                      showToast(
                        `${deviceName} 알림 설정이 완료되었습니다.`,
                        "success"
                      );
                      onClose();
                    },
                    onError: (error: any) => {
                      alert(`알림 설정 실패\n\n${error.message}`);
                    },
                  }
                );
              }}
              disabled={isCreating}
            >
              {isCreating ? "처리 중..." : "알림 설정"}
            </Button>
          </>
        }
      />
    );
  }

  const statusMap = {
    1: {
      title: `${device.id}번 ${deviceName}는\n현재 사용 가능해요.`,
      caption: "",
    },
    2: {
      title: `${device.id}번 ${deviceName}는\n연결이 끊겨 있어요.`,
      caption: `다른 ${deviceName}를 이용해주세요.`,
    },
    3: {
      title: `${device.id}번 ${deviceName}는\n고장으로 사용할 수 없어요.`,
      caption: `다른 ${deviceName}를 이용해주세요.`,
    },
  } as const;

  const { title, caption } = statusMap[device.state];

  return (
    <BottomSheet
      title={title}
      caption={caption}
      onClose={onClose}
      actions={<Button onClick={onClose}>확인</Button>}
    />
  );
}
