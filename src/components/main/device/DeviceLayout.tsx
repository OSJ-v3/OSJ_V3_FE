import type { LayoutCell, DeviceData } from "./type"
import { DeviceColumn } from "./DeviceColumn"
import styled from "styled-components"
import MoveRouteIcon from "../../../assets/icons/triangle.png"

interface Props {
    layout: LayoutCell[][]
    devices: DeviceData[]
}

export function DeviceLayout({ layout, devices }: Props) {
    const deviceMap = devices.reduce((acc, d) => {
        acc[d.id] = d
        return acc
    }, {} as Record<number, DeviceData>)

    return (
        <Wrapper>
            {layout.map((row, idx) => {
                const leftCell = row[0] ? [row[0]] : []
                const rightCell = row[1] ? [row[1]] : []

                return (
                    <Row key={idx}>
                        <DeviceColumn cells={leftCell} devices={deviceMap} />
                        <img src={MoveRouteIcon} width={12} />
                        <DeviceColumn cells={rightCell} devices={deviceMap} />
                    </Row>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 16px;
`
