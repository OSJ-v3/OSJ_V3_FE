import { useToastContext } from "../../contexts";
import { useAlarmStore } from "../../stores";
import { BottomSheet, Button } from "../common";

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
  const { hasAlarm, addAlarm, removeAlarm } = useAlarmStore();
  const isAlarmed = hasAlarm(device.id);

  const deviceName = device.type === "WASH" ? "세탁기" : "건조기";

  if (isAlarmed) {
    return (
      <BottomSheet
        title={`${device.id}번${deviceName}의\n알림 설정을 해제하실 건가요?`}
        caption="알림 설정을 해제하시면 종료 알림을 받으실 수 없습니다."
        onClose={onClose}
        actions={
          <>
            <Button kind="gray" onClick={onClose}>
              취소
            </Button>
            <Button
              onClick={() => {
                removeAlarm(device.id);

                showToast(`${deviceName} 알림이 해제되었습니다.`, "success");

                onClose();
              }}
            >
              알림 해제
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
        caption={`${deviceName}가 종료되면 알림을 드릴게요.`}
        onClose={onClose}
        actions={
          <>
            <Button kind="gray" onClick={onClose}>
              취소
            </Button>
            <Button
              onClick={() => {
                addAlarm({
                  id: device.id,
                  type: device.type,
                });

                showToast(
                  `${deviceName} 알림 설정이 완료되었습니다.`,
                  "success"
                );

                onClose();
              }}
            >
              알림 설정
            </Button>
          </>
        }
      />
    );
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
