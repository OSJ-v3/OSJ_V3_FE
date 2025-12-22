import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AlarmRenderer, Splash, ToastRenderer } from "./components";
import { AlarmProvider, ToastProvider } from "./contexts";
import { useSystemTheme, useThemeColor } from "./hooks";
import { useThemeStore } from "./stores";
import { darkTheme, lightTheme, GlobalStyle, AppLayout } from "./styles";
import { Main, Setting, Complain, Detail, Notice } from "./view";
import { useNetworkListener } from "./hooks/useNetworkListener";

function App() {
  useNetworkListener();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((reg) => reg.update());
      });
    }
  }, []);

  const { mode } = useThemeStore();
  const systemTheme = useSystemTheme();

  const appliedTheme =
    mode === "system"
      ? systemTheme === "dark"
        ? darkTheme
        : lightTheme
      : mode === "dark"
      ? darkTheme
      : lightTheme;

  useThemeColor(appliedTheme.colors.Surface);

  return (
    <BrowserRouter>
      <ThemeProvider theme={appliedTheme}>
        <AlarmProvider>
          <AlarmRenderer />
          <ToastProvider>
            <Splash />
            <GlobalStyle />

            <ToastRenderer />

            <AppLayout>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/complain" element={<Complain />} />
                <Route path="/notice/:id" element={<Detail />} />
              </Routes>
            </AppLayout>
          </ToastProvider>
        </AlarmProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
