import styled, { useTheme } from "styled-components"
import { Text } from "../common/Text"

type AreaType = "남자 학교측" | "남자 기숙사측" | "여자"

interface Props {
    value: AreaType
    onChange: (area: AreaType) => void
}

export function AreaSelector({ value, onChange }: Props) {
    const theme = useTheme()

    const areas: AreaType[] = ["남자 학교측", "남자 기숙사측", "여자"]

    return (
        <Wrapper>
            <Text font="heading3">{value}</Text>

            <ButtonRow>
                {areas.map((area) => {
                    const selected = value === area

                    return (
                        <AreaButton
                            key={area}
                            $selected={selected}
                            $theme={theme}
                            onClick={() => onChange(area)}
                        >
                            <Text
                                font="button1"
                                color={
                                    selected ? "Surface" : "Gray.OnSecondary"
                                }
                            >
                                {area}
                            </Text>
                        </AreaButton>
                    )
                })}
            </ButtonRow>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

const AreaButton = styled.button<{
    $selected: boolean
    $theme: any
}>`
    padding: 10px 22px;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: 200ms;
    background: ${({ $selected, $theme }) =>
        $selected ? $theme.colors.Main.Primary : $theme.colors.Gray.Secondary};
`
