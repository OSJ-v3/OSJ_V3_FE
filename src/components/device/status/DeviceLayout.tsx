import { TriangleIcon } from "../../../assets"
import styled, { useTheme } from "styled-components"
import { DeviceColumn, type DeviceData, type LayoutCell } from ".."
import { useMemo } from "react"

interface Props {
    layout: LayoutCell[][]
    devices: DeviceData[]
}

export function DeviceLayout({ layout, devices }: Props) {
    const theme = useTheme()

    const deviceMap = useMemo(
        () =>
            devices.reduce(
                (acc, d) => {
                    acc[d.id] = d
                    return acc
                },
                {} as Record<number, DeviceData>,
            ),
        [devices],
    )

    return (
        <Wrapper>
            {layout.map((row, idx) => (
                <Row key={idx}>
                    <DeviceColumn
                        cells={row[0] ? [row[0]] : [{ type: "empty" }]}
                        devices={deviceMap}
                    />

                    <TriangleBox
                        $color={theme.colors.Gray.SurfaceContainerLowest}
                    >
                        <TriangleIcon width={12} />
                    </TriangleBox>

                    <DeviceColumn
                        cells={row[1] ? [row[1]] : [{ type: "empty" }]}
                        devices={deviceMap}
                    />
                </Row>
            ))}
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

const TriangleBox = styled.div<{ $color: string }>`
    color: ${({ $color }) => $color};
    display: flex;
    align-items: center;
`
