import { BottomSheet, ModeItem } from ".."

type AreaType = "남자 학교측" | "남자 기숙사측" | "여자"

interface Props {
    value: AreaType
    onClose: () => void
    onChange: (value: AreaType) => void
}

export function MainPage({ value, onClose, onChange }: Props) {
    return (
        <>
            <BottomSheet
                title="메인 세탁실 설정"
                caption="세탁실 탭에서 처음에 보여질 세탁실을 선택해보세요."
                onClose={onClose}
            >
                <ModeItem
                    label="남자 학교측"
                    value="남자 학교측"
                    current={value}
                    onSelect={onChange}
                />
                <ModeItem
                    label="남자 기숙사측"
                    value="남자 기숙사측"
                    current={value}
                    onSelect={onChange}
                />
                <ModeItem
                    label="여자"
                    value="여자"
                    current={value}
                    onSelect={onChange}
                />
            </BottomSheet>
        </>
    )
}
