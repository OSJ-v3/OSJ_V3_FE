import { Check } from "lucide-react"
import styled, { useTheme } from "styled-components"
import { Text } from "../common"

interface ModeItemProps<T extends string> {
    label: string
    value: T
    current: T
    onSelect: (value: T) => void
}

export function ModeItem<T extends string>({
    label,
    value,
    current,
    onSelect,
}: ModeItemProps<T>) {
    const theme = useTheme()
    const selected = value === current

    return (
        <Container onClick={() => onSelect(value)}>
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
        </Container>
    )
}

const Container = styled.div`
    padding: 14px 16px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
