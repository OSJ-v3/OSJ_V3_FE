import { TriangleIcon } from "../../../assets/icons/triangle"
import styled, { useTheme } from "styled-components"
import { type LayoutCell, CellSkeleton } from ".."

interface Props {
    layout: LayoutCell[][]
}

export function SkeletonDeviceLayout({ layout }: Props) {
    const theme = useTheme()

    return (
        <Wrapper>
            {layout.map((row, rIdx) => (
                <Row key={rIdx}>
                    <Col>
                        {row[0] ? (
                            <CellSkeleton cell={row[0]} />
                        ) : (
                            <EmptySkeleton />
                        )}
                    </Col>

                    <TriangleWrapper
                        style={{
                            color: theme.colors.Gray.SurfaceContainerLowest,
                        }}
                    >
                        <TriangleIcon width={12} />
                    </TriangleWrapper>

                    <Col>
                        {row[1] ? (
                            <CellSkeleton cell={row[1]} />
                        ) : (
                            <EmptySkeleton />
                        )}
                    </Col>
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

const Col = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const TriangleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const EmptySkeleton = styled.div`
    height: auto;
`
