import styled from "styled-components"
import { DeviceItem } from "./DeviceItem"
import type { DeviceData, LayoutCell } from "./type"

interface Props {
    row: LayoutCell[]
    devices: Record<number, DeviceData>
}

export function DeviceRow({ row, devices }: Props) {
    return (
        <RowWrapper>
            {row.map((cell, idx) => {
                if (cell.type === "single") {
                    return (
                        <SingleBox key={idx}>
                            <DeviceItem
                                device={{
                                    id: cell.device.id,
                                    type: cell.device.deviceType,
                                    state: devices[cell.device.id]?.state ?? 0,
                                }}
                            />
                        </SingleBox>
                    )
                }

                if (cell.type === "pair") {
                    return (
                        <DoubleWrapper key={idx}>
                            <DeviceItem
                                device={{
                                    id: cell.devices[0].id,
                                    type: cell.devices[0].deviceType,
                                    state:
                                        devices[cell.devices[0].id]?.state ?? 0,
                                }}
                            />
                            <Spacer />
                            <DeviceItem
                                device={{
                                    id: cell.devices[1].id,
                                    type: cell.devices[1].deviceType,
                                    state:
                                        devices[cell.devices[1].id]?.state ?? 0,
                                }}
                            />
                        </DoubleWrapper>
                    )
                }
            })}
        </RowWrapper>
    )
}

const RowWrapper = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    margin-bottom: 16px;
`

const SingleBox = styled.div`
    flex: 1;
`

const DoubleWrapper = styled.div`
    display: flex;
    flex: 1;
    gap: 8px;
`

const Spacer = styled.div`
    width: 8px;
`
