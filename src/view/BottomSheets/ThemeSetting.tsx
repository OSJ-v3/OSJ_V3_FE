import { BottomSheet } from "../../components/common/BottomSheet"
import { ModeItem } from "../../components/items/ModeItem"

export type ThemeMode = "light" | "dark" | "system"

interface Props {
    value: ThemeMode
    onClose: () => void
    onChange: (value: ThemeMode) => void
}

export function ThemeSetting({ value, onClose, onChange }: Props) {
    return (
        <>
            <BottomSheet
                title="화면 모드 설정"
                caption="앱에서 보여질 모드를 선택해보세요."
                onClose={onClose}
            >
                <ModeItem
                    label="라이트 모드"
                    value="light"
                    current={value}
                    onSelect={onChange}
                />
                <ModeItem
                    label="다크 모드"
                    value="dark"
                    current={value}
                    onSelect={onChange}
                />
                <ModeItem
                    label="시스템 모드"
                    value="system"
                    current={value}
                    onSelect={onChange}
                />
            </BottomSheet>
        </>
    )
}
