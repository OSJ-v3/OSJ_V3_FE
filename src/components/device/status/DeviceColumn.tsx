import styled from "styled-components"
import { type LayoutCell, type DeviceData, DeviceItem } from ".."

interface Props {
    cells: LayoutCell[]
    devices: Record<number, DeviceData>
}

export function DeviceColumn({ cells, devices }: Props) {
    return (
        <Col>
            {cells.map((cell, idx) => {
                if (cell.type === "empty") {
                    return <EmptySlot key={idx} />
                }

                if (cell.type === "single") {
                    return (
                        <DeviceItem
                            key={idx}
                            device={devices[cell.device.id]}
                        />
                    )
                }

                return (
                    <PairBox key={idx}>
                        <DeviceItem device={devices[cell.devices[0].id]} />
                        <DeviceItem device={devices[cell.devices[1].id]} />
                    </PairBox>
                )
            })}
        </Col>
    )
}

const Col = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const PairBox = styled.div`
    display: flex;
    gap: 12px;
`

const EmptySlot = styled.div`
    width: 100%;
    height: 88px;
`
