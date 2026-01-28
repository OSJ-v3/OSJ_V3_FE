import { memo, useMemo, useState } from "react"
import styled, { useTheme } from "styled-components"
import { Text, type ColorKey, DeviceAlarmSheet } from ".."
import { Images } from "../../assets"

type DeviceState = 0 | 1 | 2 | 3
type DeviceType = "WASH" | "DRY"

interface IProps {
    id: number
    type: DeviceType
    state: DeviceState
}

const STATE_LABEL: Record<DeviceState, string> = {
    0: "작동중",
    1: "사용 가능",
    2: "연결끊김",
    3: "고장",
}

const getStateColor = (
    theme: any,
    state: DeviceState,
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

export const MyDevice = memo(
    function MyDevice({ id, type, state }: IProps) {
        const theme = useTheme()

        const [selected, setSelected] = useState<{
            id: number
            type: DeviceType
            state: DeviceState
        } | null>(null)

        const stateColor = useMemo(
            () => getStateColor(theme, state),
            [theme, state],
        )

        const label = useMemo(() => STATE_LABEL[state], [state])

        const imageSrc = type === "WASH" ? Images.Washer : Images.Dryer

        return (
            <>
                <Wrapper
                    $border={stateColor.background}
                    onClick={() => setSelected({ id, type, state })}
                >
                    <img
                        width={120}
                        height={120}
                        src={imageSrc}
                        loading="lazy"
                        decoding="async"
                        alt={`${id}번 ${type === "WASH" ? "세탁기" : "건조기"}`}
                    />

                    <Text font="subTitle2">
                        {id}번 {type === "WASH" ? "세탁기" : "건조기"}
                    </Text>

                    <StateText $background={stateColor.background}>
                        <Text color={stateColor.text} font="body1">
                            {label}
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
    },
    (prev, next) =>
        prev.id === next.id &&
        prev.type === next.type &&
        prev.state === next.state,
)

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
    padding: 6px 31px;
    border-radius: 100px;
    text-align: center;
`
