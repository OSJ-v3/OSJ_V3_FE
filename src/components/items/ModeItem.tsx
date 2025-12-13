import { Check } from "lucide-react"
import styled, { useTheme } from "styled-components"
import type { ThemeMode } from "../../stores/useThemeStore"
import { Text } from "../common/Text"

interface ModeItemProps {
    label: string
    value: ThemeMode
    current: ThemeMode
    onSelect: (mode: ThemeMode) => void
}

export function ModeItem({ label, value, current, onSelect }: ModeItemProps) {
    const theme = useTheme()
    const selected = value === current

    return (
        <ModeRow onClick={() => onSelect(value)}>
            <Text font={"button1"} color="System.InverseSurface">
                {label}
            </Text>
            {selected && (
                <Check
                    size={20}
                    color={theme.colors.Main.Primary}
                    strokeWidth={3}
                />
            )}
        </ModeRow>
    )
}

const ModeRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    font-size: 16px;
    cursor: pointer;
`
