import styled from "styled-components"
import { Text } from "../common/Text"
import { Button } from "../common/Button"

interface Props {
    id: number
    type: "WASH" | "DRY"
    duration: string
    onConfirm: () => void
}

export function AlarmModal({ id, type, duration, onConfirm }: Props) {
    return (
        <Card>
            <Content>
                <Text font="button1" color="Main.Main600">
                    {`${id}번 ${type === "WASH" ? "세탁기" : "건조기"}`}
                </Text>

                <Text font="subTitle2">
                    {type === "WASH" ? "세탁기" : "건조기"}가 종료되었어요
                </Text>

                <TimeRow>
                    <Text font="heading3">작동시간</Text>
                    <Text font="heading1">{duration}</Text>
                </TimeRow>
            </Content>

            <Button onClick={onConfirm}>확인</Button>
        </Card>
    )
}

const Card = styled.div`
    width: 90%;
    max-width: 540px;

    background: ${({ theme }) => theme.colors.System.OnSurface};
    border-radius: 16px;
    padding: 20px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    animation: slideIn 0.25s ease-out;
    transition: transform 0.25s ease, opacity 0.25s ease;

    pointer-events: auto;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-12px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const TimeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`
