import { Text, type ColorKey, DeviceAlarmSheet } from ".."
import styled, { useTheme } from "styled-components"
import { useState } from "react"
import { Images } from "../../assets"

interface IProps {
    id: number
    type: "WASH" | "DRY"
    state: 0 | 1 | 2 | 3
}

export function MyDevice({ id, type, state }: IProps) {
    const theme = useTheme()
    const [selected, setSelected] = useState<null | {
        id: number
        type: "WASH" | "DRY"
        state: 0 | 1 | 2 | 3
    }>(null)

    const getStateColor = (
        theme: any,
        state: 0 | 1 | 2 | 3
    ): { background: string; text: ColorKey } => {
        switch (state) {
            case 0:
                return {
                    background: theme.colors.Main.PrimaryContainer,
                    text: "Main.Primary",
                }
            case 1:
                return {
                    background: theme.colors.Sub.OnTertiary,
                    text: "Sub.Tertiary",
                }
            case 2:
                return {
                    background: theme.colors.Gray.Secondary,
                    text: "Gray.OnSecondary",
                }
            case 3:
                return {
                    background: theme.colors.Sub.onError,
                    text: "Sub.Error",
                }
            default:
                return {
                    background: theme.colors.Gray.Secondary,
                    text: "Gray.OnSecondary",
                }
        }
    }

    const stateColor = getStateColor(theme, state)

    const present =
        state == 0
            ? "작동중"
            : state == 1
            ? "사용 가능"
            : state == 2
            ? "연결끊김"
            : "고장"

    return (
        <>
            <Wrapper
                $border={stateColor.background}
                onClick={() => setSelected({ id, type, state })}
            >
                <img
                    width={120}
                    src={type === "WASH" ? Images.Washer : Images.Dryer}
                />
                <Text font={"subTitle2"}>
                    {id}번 {type === "WASH" ? "세탁기" : "건조기"}
                </Text>

                <StateText $background={stateColor.background}>
                    <Text color={stateColor.text} font={"body1"}>
                        {present}
                    </Text>
                </StateText>
            </Wrapper>

            {selected && (
                <DeviceAlarmSheet
                    device={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </>
    )
}

const Wrapper = styled.div<{ $border: string }>`
    width: 100%;
    background: ${({ theme }) => theme.colors.Surface};
    border-radius: 12px;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border: 1.5px solid ${({ $border }) => $border};
`

const StateText = styled.div<{ $background: string }>`
    background: ${({ $background }) => $background};
    width: 120px;
    box-sizing: border-box;
    padding: 6px 31px;
    border-radius: 100px;
    text-align: center;
`
