import { useState } from "react"
import { HeaderTabBar } from "../components/main/HeaderTabBar"
import styled from "styled-components"
import { Text } from "../components/common/Text"
import { Device } from "../components/items/Device"
import { Status } from "./Devices/Status"
import { useStartStore } from "../stores/useStartStore"

export function Main() {
    const { start } = useStartStore()
    const [tab, setTab] = useState<"mine" | "status">(start)

    const dummyDevices = [
        { id: 1, type: "WASH", state: 0 },
        { id: 2, type: "DRY", state: 2 },
        { id: 3, type: "DRY", state: 1 },
    ]

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
                            {dummyDevices.map((d) => (
                                <Device
                                    key={`${d.type}-${d.id}`}
                                    id={d.id}
                                    type={d.type as "WASH" | "DRY"}
                                    state={d.state as 0 | 1 | 2 | 3}
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
