import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "./styles/theme"
import { useThemeStore } from "./stores/useThemeStore"
import { useSystemTheme } from "./hooks/useSystemTheme"
import { useThemeColor } from "./hooks/useThemeColor"
import { GlobalStyle } from "./styles/GlobalStyle"
import { AppLayout } from "./styles/AppLayout"
import "./styles/global.css"
import { Text } from "./components/common/Text"

function App() {
    const { mode } = useThemeStore()
    const systemTheme = useSystemTheme()

    const appliedTheme =
        mode === "system"
            ? systemTheme === "dark"
                ? darkTheme
                : lightTheme
            : mode === "dark"
            ? darkTheme
            : lightTheme
    // const appliedTheme = lightTheme

    useThemeColor(appliedTheme.colors.Surface)

    return (
        <>
            <ThemeProvider theme={appliedTheme}>
                <GlobalStyle />
                <AppLayout>
                    <Text>HelloWorld</Text>
                    <Text font={"caption"}>HelloWorld</Text>
                    <Text font={"heading1"} color="Main.Primary">
                        HelloWorld
                    </Text>
                </AppLayout>
            </ThemeProvider>
        </>
    )
}

export default App
