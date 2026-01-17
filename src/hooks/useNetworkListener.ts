import { useEffect } from "react";
import { useNetworkStore } from "../stores/useNetworkStore";
import { checkSocket } from "../utils/checkSocket";

const SOCKET_URL =
  import.meta.env.VITE_WS_BASE_URL || "ws://10.113.100.157:8080/client";

export function useNetworkListener() {
  const setStatus = useNetworkStore((s) => s.setStatus);

  useEffect(() => {
    let mounted = true;

    const update = async () => {
      try {
        const ok = await checkSocket(SOCKET_URL);
        if (!mounted) return;

        setStatus(ok ? "online" : "offline");
      } catch {
        if (!mounted) return;
        setStatus("offline");
      }
    };

    setStatus("connecting");
    update();

    const interval = setInterval(update, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [setStatus]);
}
