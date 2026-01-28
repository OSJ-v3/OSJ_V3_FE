import styled from "styled-components"
import { memo } from "react"
import { type LayoutCell, type DeviceData, DeviceItem } from ".."

interface Props {
    cells: LayoutCell[]
    devices: Record<number, DeviceData>
}

export const DeviceColumn = memo(function DeviceColumn({
    cells,
    devices,
}: Props) {
    return (
        <Col>
            {cells.map((cell, idx) => {
                if (cell.type === "empty") return <Empty key={idx} />

                if (cell.type === "single") {
                    return (
                        <DeviceItem
                            key={cell.device.id}
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
})

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

const Empty = styled.div`
    height: 88px;
`
