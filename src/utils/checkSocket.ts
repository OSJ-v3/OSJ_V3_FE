export function checkSocket(url: string, timeout = 3000): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;

    const ws = new WebSocket(url);

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      ws.close();
      resolve(false);
    }, timeout);

    ws.onopen = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      ws.close();
      resolve(true);
    };

    ws.onerror = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(false);
    };
  });
}
