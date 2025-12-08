import styled, { keyframes } from "styled-components"
import { useEffect, useState } from "react"
import { useSystemTheme } from "../../hooks/useSystemTheme"
import { useThemeStore } from "../../stores/useThemeStore"
import { darkTheme, lightTheme } from "../../styles/theme"

export function Splash() {
    const { mode } = useThemeStore()
    const systemTheme = useSystemTheme()
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null

    const currentTheme = mode === "system" ? systemTheme : mode

    const appliedTheme = currentTheme === "dark" ? darkTheme : lightTheme

    const logo =
        currentTheme === "dark"
            ? "/splash/logo-dark.png"
            : "/splash/logo-light.png"

    return (
        <Wrapper background={appliedTheme.colors.Surface}>
            <Logo src={logo} alt="logo" />
        </Wrapper>
    )
}

const fadeInOut = keyframes`
  0% { opacity: 0; }
  30% { opacity: 1; }
  70% { opacity: 1; }
  100% { opacity: 0; }
`

const bgFadeInOut = keyframes`
  70% { opacity: 1; }
  100% { opacity: 0; }
`

const Wrapper = styled.div<{ background: string }>`
    position: fixed;
    inset: 0;
    background: ${(p) => p.background};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    animation: ${bgFadeInOut} 2s ease forwards;
`

const Logo = styled.img`
    width: 70%;
    max-width: 400px;
    object-fit: contain;
    animation: ${fadeInOut} 2s ease forwards;
`
