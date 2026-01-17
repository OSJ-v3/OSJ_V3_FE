import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AlarmRenderer, Splash, ToastRenderer } from "./components";
import { AlarmProvider, ToastProvider } from "./contexts";
import { useSystemTheme, useThemeColor } from "./hooks";
import { useNetworkListener } from "./hooks/useNetworkListener";
import { initFCM } from "./hooks/useFCM";
import { useThemeStore } from "./stores";
import { useFCMStore } from "./stores/fcmStore";
import { useAlarmStore } from "./stores";
import { usePushAlertList } from "./hooks/usePushAlertList";
import { mapExpectStateToType } from "./utils/pushAlertMapper";
import { darkTheme, lightTheme, GlobalStyle, AppLayout } from "./styles";
import { Main, Setting, Complain, Detail, Notice } from "./view";
import { useNotices } from "./hooks/useNotices";
import "./firebase/settingFCM";

function App() {
  useNetworkListener();
  const { data: notices } = useNotices();

  useEffect(() => {
    initFCM();
  }, []);

  useEffect(() => {
    if (!notices?.length) return;

    const latestNotice = notices[0];
    const lastSeenNoticeId = localStorage.getItem("lastSeenNoticeId");

    if (String(latestNotice.id) !== lastSeenNoticeId) {
      localStorage.setItem("lastSeenNoticeId", String(latestNotice.id));
    }
  }, [notices]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data.type === "PUSH_ALERT" ||
        event.data.type === "BACKGROUND_ALERT"
      ) {
        alert(event.data.message);
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
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

  const { token } = useFCMStore();
  const { data: pushAlertList } = usePushAlertList(token);
  const { setAlarms } = useAlarmStore();

  useEffect(() => {
    if (!pushAlertList || !Array.isArray(pushAlertList)) return;

    setAlarms(
      pushAlertList.map((d) => ({
        id: d.id,
        type: mapExpectStateToType(d.expectState),
      }))
    );
  }, [pushAlertList, setAlarms]);

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
                <Route path="/notice/:id" element={<Detail />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/complain" element={<Complain />} />
              </Routes>
            </AppLayout>
          </ToastProvider>
        </AlarmProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
