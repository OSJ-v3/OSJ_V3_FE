import styled, { useTheme, keyframes } from "styled-components"

export function SkeletonMyDevice() {
    const theme = useTheme()

    return <SkeletonBox theme={theme} />
}

const shimmer = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: -200% 0;
  }
`

const SkeletonBox = styled.div`
    width: 100%;
    height: 250px;

    box-sizing: border-box;
    border-radius: 12px;

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
