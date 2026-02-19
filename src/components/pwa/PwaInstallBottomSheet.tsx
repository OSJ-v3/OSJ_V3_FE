import { BottomSheet, Button, Text } from ".."

interface Props {
    onClose: () => void
    onInstall: () => void
}

export function PwaInstallBottomSheet({ onClose, onInstall }: Props) {
    return (
        <BottomSheet
            title="홈 화면에 추가할까요?"
            caption="앱처럼 빠르게 실행하고 알림도 받아보세요"
            onClose={onClose}
            actions={
                <>
                    <Button variant="gray" onClick={onClose}>
                        나중에
                    </Button>
                    <Button onClick={onInstall}>홈 화면에 추가</Button>
                </>
            }
        />
    )
}
