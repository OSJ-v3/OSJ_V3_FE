import { useQuery } from "@tanstack/react-query";
import { getPushAlertList } from "../apis/pushAlerts";

export const usePushAlertList = (token: string | null) =>
  useQuery({
    queryKey: ["push-alerts", token],
    queryFn: () => getPushAlertList(token!),
    enabled: !!token,
    select: (res) => res.data,
  });
