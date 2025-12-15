import styled, { useTheme, keyframes } from "styled-components"
import type { LayoutCell } from "../type"

export function CellSkeleton({ cell }: { cell: LayoutCell }) {
    const theme = useTheme()

    if (cell.type === "empty") return <EmptySkeleton />

    if (cell.type === "single") {
        return <SkeletonBox theme={theme} size="large" />
    }

    return (
        <PairBox>
            <SkeletonBox theme={theme} size="medium" />
            <SkeletonBox theme={theme} size="medium" />
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

const PairBox = styled.div`
    display: flex;
    gap: 12px;
`

const EmptySkeleton = styled.div`
    height: 100px;
`

const SkeletonBox = styled.div<{ theme: any; size: "medium" | "large" }>`
    width: ${({ size }) => (size === "large" ? "100%" : "50%")};
    height: 92px;

    padding: 8px 0;
    border-radius: 16px;

    background-image: ${({ theme }) => `linear-gradient(
        90deg,
        ${theme.colors.Gray.Secondary} 0%,
        ${theme.colors.Gray.SurfaceContainerLowest} 40%,
        ${theme.colors.Gray.Secondary} 80%
    )`};

    background-size: 200% 100%;
    background-repeat: repeat;

    animation: ${shimmer} 1.6s linear infinite;
`
