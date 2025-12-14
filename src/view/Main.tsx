import { useState } from "react"
import { HeaderTabBar } from "../components/main/HeaderTabBar"
import styled from "styled-components"
import { Text } from "../components/common/Text"
import { Device } from "../components/items/Device"
import { Status } from "./Devices/Status"
import { useStartStore } from "../stores/useStartStore"
import { useAlarmStore } from "../stores/useAlarmStore"

export function Main() {
    const { start } = useStartStore()
    const { alarms } = useAlarmStore()
    const [tab, setTab] = useState<"mine" | "status">(start)

    return (
        <>
            <Wrapper>
                <HeaderTabBar value={tab} onChange={setTab} />

                {tab === "mine" && (
                    <>
                        <TextContainer>
                            <Text font={"heading2"}>
                                알림 설정한
                                <br />
                                세탁기와 건조기
                            </Text>
                            <Text font={"body1"} color="Gray.OnSecondary">
                                알림을 설정하여 세탁기와 건조기를
                                <br />
                                누구보다 빠르게 사용해보세요.
                            </Text>
                        </TextContainer>

                        <DeviceGrid>
                            {alarms.map((d) => (
                                <Device
                                    key={`${d.type}-${d.id}`}
                                    id={d.id}
                                    type={d.type}
                                    state={0}
                                />
                            ))}
                        </DeviceGrid>
                    </>
                )}

                {tab === "status" && (
                    <>
                        <Status />
                    </>
                )}
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    gap: 28px;
`

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    justify-items: start;
    align-items: start;
    flex-direction: column;
    gap: 14px;
`

const DeviceGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding-bottom: 40px;
`
