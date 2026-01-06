import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AxiosError } from "axios";
import { AlarmRenderer, Splash, ToastRenderer } from "./components";
import { AlarmProvider, ToastProvider } from "./contexts";
import { useSystemTheme, useThemeColor } from "./hooks";
import { useNetworkListener } from "./hooks/useNetworkListener";
import { initFCM } from "./hooks/useFCM";
import { useThemeStore } from "./stores";
import { useFCMStore } from "./stores/fcmStore";
import { useAlarmStore } from "./stores";
import { useNoticeAlarmStore } from "./stores/noticeAlarmStore";
import { usePushAlertList } from "./hooks/usePushAlertList";
import { useNoticePushAlert } from "./hooks/useNoticePushAlert";
import { mapExpectStateToType } from "./utils/pushAlertMapper";
import { darkTheme, lightTheme, GlobalStyle, AppLayout } from "./styles";
import { Main, Setting, Complain, Detail, Notice } from "./view";
import { useNotices } from "./hooks/useNotices";
import "./firebase/settingFCM";

function App() {
  useNetworkListener();

  const { data: notices } = useNotices();
  useEffect(() => {
    alert("앱 시작: FCM 초기화 시작함");
    initFCM();
  }, []);

  useEffect(() => {
    if (!notices || notices.length === 0) return;

    const latestNotice = notices[0];
    const lastSeenNoticeId = localStorage.getItem("lastSeenNoticeId");

    if (String(latestNotice.id) !== lastSeenNoticeId) {
      alert(`새로운 공지\n\n${latestNotice.title}`);
      localStorage.setItem("lastSeenNoticeId", String(latestNotice.id));
    }
  }, [notices]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const messageHandler = (event: MessageEvent) => {
      alert(`서비스 워커 메시지:\n\nType: ${event.data.type}`);

      if (event.data.type === "BACKGROUND_MESSAGE") {
        alert(
          `백그라운드 메시지!\n\n제목: ${event.data.payload?.notification?.title}\n내용: ${event.data.payload?.notification?.body}`
        );
      } else if (event.data.type === "NOTIFICATION_CLICKED") {
        alert("알림 클릭됨!");
      } else if (event.data.type === "PUSH_RECEIVED") {
        alert("Push 이벤트 수신됨");
      }
    };

    navigator.serviceWorker.addEventListener("message", messageHandler);

    return () => {
      navigator.serviceWorker.removeEventListener("message", messageHandler);
    };
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.getRegistrations().then((regs) => {
      alert(`등록된 서비스 워커: ${regs.length}개`);
      regs.forEach((reg) => {
        reg.update();
      });
    });
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

  useEffect(() => {
    if (token) {
      alert(`토큰 Store에 저장됨:\n\n${token.substring(0, 40)}...`);
    } else {
      alert("FCM 토큰 아직 없음 or 대기 중)");
    }
  }, [token]);

  const { data: pushAlertList, error: pushAlertError } =
    usePushAlertList(token);

  const { setAlarms } = useAlarmStore();

  useEffect(() => {
    if (pushAlertError) {
      const axiosError = pushAlertError as AxiosError;
      alert(
        `알림 목록 로드 실패\n\nStatus: ${axiosError.response?.status}\nMessage: ${axiosError.message}`
      );
    }
  }, [pushAlertError]);

  useEffect(() => {
    if (!pushAlertList) {
      alert("pushAlertList가 아직 없음 (로딩 중 or 에러)");
      return;
    }

    if (!Array.isArray(pushAlertList)) {
      alert(
        `pushAlertList가 배열 X!\n\n타입: ${typeof pushAlertList}\n\n데이터: ${JSON.stringify(
          pushAlertList
        )}`
      );
      return;
    }

    alert(
      `알림 목록 업데이트\n\n개수: ${
        pushAlertList.length
      }개\n\n데이터: ${JSON.stringify(pushAlertList)}`
    );
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
