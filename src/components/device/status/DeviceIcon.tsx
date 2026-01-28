import styled from "styled-components"
import { memo } from "react"
import { WashIcon, DryIcon } from "../../../assets"
import { Text } from "../../common"

interface Props {
    id: number
    type: "WASH" | "DRY"
    state: 0 | 1 | 2 | 3
    size?: "medium" | "large"
    onClick?: () => void
}

export const DeviceIcon = memo(function DeviceIcon({
    id,
    type,
    state,
    size = "medium",
    onClick,
}: Props) {
    return (
        <Wrapper size={size} data-state={state} onClick={onClick}>
            {type === "WASH" ? (
                <WashIcon width={24} height={24} />
            ) : (
                <DryIcon width={24} height={24} />
            )}

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
})

const Wrapper = styled.div<{ size: "medium" | "large" }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 16px;
    padding: 8px 0;

    width: ${({ size }) => (size === "large" ? "100%" : "50%")};

    &[data-state="0"] {
        background: ${({ theme }) => theme.colors.Main.PrimaryContainer};
        svg {
            color: ${({ theme }) => theme.colors.Main.Primary};
        }
    }

    &[data-state="1"] {
        background: ${({ theme }) => theme.colors.Sub.OnTertiary};
        svg {
            color: ${({ theme }) => theme.colors.Sub.Tertiary};
        }
    }

    &[data-state="2"] {
        background: ${({ theme }) => theme.colors.Gray.Secondary};
        svg {
            color: ${({ theme }) => theme.colors.Gray.OnSecondary};
        }
    }

    &[data-state="3"] {
        background: ${({ theme }) => theme.colors.Sub.onError};
        svg {
            color: ${({ theme }) => theme.colors.Sub.Error};
        }
    }
`

const TextGroup = styled.div`
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
