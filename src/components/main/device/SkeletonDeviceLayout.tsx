import styled, { keyframes, useTheme } from "styled-components"
import type { LayoutCell } from "./type"
import { TriangleIcon } from "../../../assets/icons/triangle"

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

                    {/* 🔺 실제 레이아웃과 동일 */}
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

function CellSkeleton({ cell }: { cell: LayoutCell }) {
    if (cell.type === "empty") return <EmptySkeleton />

    if (cell.type === "single") {
        return <SkeletonBox size="large" />
    }

    return (
        <PairBox>
            <SkeletonBox size="medium" />
            <SkeletonBox size="medium" />
        </PairBox>
    )
}

const shimmer = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: -200% 0;
  }
`

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

const PairBox = styled.div`
    display: flex;
    gap: 12px;
`

const EmptySkeleton = styled.div`
    height: 100px;
`

const SkeletonBox = styled.div<{ size: "medium" | "large" }>`
    width: ${({ size }) => (size === "large" ? "100%" : "50%")};
    height: 92px;

    padding: 8px 0;
    border-radius: 16px;

    background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.04) 0%,
        rgba(255, 255, 255, 0.08) 40%,
        rgba(255, 255, 255, 0.04) 80%
    );

    background-size: 200% 100%;
    background-repeat: repeat;

    animation: ${shimmer} 1.6s linear infinite;
`
