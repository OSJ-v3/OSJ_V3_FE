import { BottomSheet, ModeItem } from ".."

type PageType = "mine" | "status"

interface Props {
    value: PageType
    onClose: () => void
    onChange: (value: PageType) => void
}

export function StartPage({ value, onClose, onChange }: Props) {
    return (
        <>
            <BottomSheet
                title="메인 화면 설정"
                caption="앱에서 처음에 보여질 화면을 선택해보세요."
                onClose={onClose}
            >
                <ModeItem
                    label="내 세탁실"
                    value="mine"
                    current={value}
                    onSelect={onChange}
                />
                <ModeItem
                    label="세탁실 현황"
                    value="status"
                    current={value}
                    onSelect={onChange}
                />
            </BottomSheet>
        </>
    )
}
