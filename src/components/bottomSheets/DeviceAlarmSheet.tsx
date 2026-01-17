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

const AVAILABLE_STATE = 1;

const STATE_MESSAGES = {
  1: (id: number, type: string) => ({
    title: `${id}번 ${type}는\n현재 사용 가능해요.`,
    caption: "",
  }),
  2: (id: number, type: string) => ({
    title: `${id}번 ${type}는\n연결이 끊겨 있어요.`,
    caption: `다른 ${type}를 이용해주세요.`,
  }),
  3: (id: number, type: string) => ({
    title: `${id}번 ${type}는\n고장으로 사용할 수 없어요.`,
    caption: `다른 ${type}를 이용해주세요.`,
  }),
} as const;

export function DeviceAlarmSheet({ device, onClose }: Props) {
  const { showToast } = useToastContext();
  const { token } = useFCMStore();
  const { hasAlarm } = useAlarmStore();
  const { mutate: createAlert, isPending: isCreating } = useCreatePushAlert();
  const { mutate: deleteAlert, isPending: isDeleting } = useDeletePushAlert();

  const isAlarmed = hasAlarm(device.id);
  const deviceName = device.type === "WASH" ? "세탁기" : "건조기";

  const handleDeleteAlert = () => {
    if (!token) {
      showToast("알림 설정을 할 수 없습니다", "error");
      return;
    }

    deleteAlert(
      { id: device.id, token, expectState: AVAILABLE_STATE },
      {
        onSuccess: () => {
          showToast("알림이 해제되었습니다", "success");
          onClose();
        },
        onError: () => {
          showToast("알림 해제에 실패했습니다", "error");
        },
      }
    );
  };

  const handleCreateAlert = () => {
    if (!token) {
      showToast("알림 설정을 할 수 없습니다", "error");
      return;
    }

    createAlert(
      { id: device.id, token, expectState: AVAILABLE_STATE },
      {
        onSuccess: () => {
          showToast("알림 설정 완료!", "success");
          onClose();
        },
        onError: (error: any) => {
          const status = error.response?.status;
          const message =
            status === 404
              ? "기기를 찾을 수 없습니다"
              : status === 409
              ? "이미 알림이 설정되어 있습니다"
              : "알림 설정에 실패했습니다";
          showToast(message, "error");
        },
      }
    );
  };

  if (isAlarmed) {
    return (
      <BottomSheet
        title={`${device.id}번 ${deviceName}의\n알림 설정을 해제하실 건가요?`}
        caption="알림 설정을 해제하면 세탁기나 건조기가 사용 가능해졌을 때 알림을 받을 수 없어요."
        onClose={onClose}
        actions={
          <>
            <Button kind="gray" onClick={onClose}>
              취소
            </Button>
            <Button kind="primary" onClick={handleDeleteAlert}>
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
        title={`${device.id}번 ${deviceName}를\n알림 설정할까요?`}
        caption={`${deviceName}가 사용 가능해지면 알림을 보내드릴게요.`}
        onClose={onClose}
        actions={
          <>
            <Button kind="gray" onClick={onClose}>
              취소
            </Button>
            <Button kind="primary" onClick={handleCreateAlert}>
              {isCreating ? "처리 중..." : "알림 설정"}
            </Button>
          </>
        }
      />
    );
  }

  const { title, caption } = STATE_MESSAGES[device.state](
    device.id,
    deviceName
  );

  return (
    <BottomSheet
      title={title}
      caption={caption}
      onClose={onClose}
      actions={
        <Button kind="primary" onClick={onClose}>
          확인
        </Button>
      }
    />
  );
}
