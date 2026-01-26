import { TriangleIcon } from "../../../assets"
import styled, { useTheme } from "styled-components"
import { DeviceColumn, type DeviceData } from ".."

interface Props {
    layout: any[]
    devices: DeviceData[]
}

export function DeviceLayout({ layout, devices }: Props) {
    const theme = useTheme()

    const deviceMap = devices.reduce(
        (acc, d) => {
            acc[d.id] = d
            return acc
        },
        {} as Record<number, DeviceData>,
    )

    return (
        <Wrapper>
            {layout.map((row: any, idx: number) => {
                const leftCell = row[0] ? [row[0]] : []
                const rightCell = row[1] ? [row[1]] : []

                return (
                    <Row key={idx}>
                        <DeviceColumn cells={leftCell} devices={deviceMap} />
                        <div
                            style={{
                                color: theme.colors.Gray.SurfaceContainerLowest,
                            }}
                        >
                            <TriangleIcon width={12} />
                        </div>
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
