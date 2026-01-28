import styled, { useTheme } from "styled-components"
import { WashIcon, DryIcon } from "../../../assets"
import { Text } from "../../common"
import { useMemo } from "react"

interface IProps {
    id: number
    type: "WASH" | "DRY"
    state: 0 | 1 | 2 | 3
    size?: "medium" | "large"
    onClick?: () => void
}

export function DeviceIcon({
    id,
    type,
    state,
    size = "medium",
    onClick,
}: IProps) {
    const theme = useTheme()

    const stateColor = useMemo(() => {
        switch (state) {
            case 0:
                return {
                    background: theme.colors.Main.PrimaryContainer,
                    icon: theme.colors.Main.Primary,
                }
            case 1:
                return {
                    background: theme.colors.Sub.OnTertiary,
                    icon: theme.colors.Sub.Tertiary,
                }
            case 2:
                return {
                    background: theme.colors.Gray.Secondary,
                    icon: theme.colors.Gray.OnSecondary,
                }
            case 3:
                return {
                    background: theme.colors.Sub.onError,
                    icon: theme.colors.Sub.Error,
                }
            default:
                return {
                    background: theme.colors.Gray.Secondary,
                    icon: theme.colors.Gray.OnSecondary,
                }
        }
    }, [state, theme])

    const Icon = type === "WASH" ? WashIcon : DryIcon

    return (
        <Wrapper
            size={size}
            $background={stateColor.background}
            onClick={onClick}
        >
            <Icon style={{ color: stateColor.icon }} width={24} height={24} />

            <TextGroup>
                <Text color="System.InverseSurface" font="subTitle3">
                    {id}번
                </Text>
                <Text color="System.InverseSurface" font="body1">
                    {type === "WASH" ? "세탁기" : "건조기"}
                </Text>
            </TextGroup>
        </Wrapper>
    )
}

const Wrapper = styled.div<{
    size: "medium" | "large"
    $background: string
}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: ${({ $background }) => $background};
    border-radius: 16px;

    width: ${({ size }) => (size === "large" ? "100%" : "50%")};
    min-height: 88px;

    padding: 8px 0;
`

const TextGroup = styled.div`
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
