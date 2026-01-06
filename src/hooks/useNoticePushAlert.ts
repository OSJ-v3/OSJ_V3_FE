import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNoticePushAlert,
  subscribeNoticePushAlert,
  unsubscribeNoticePushAlert,
} from "../apis/notices/fcm";

export const useNoticePushAlert = (token: string | null) =>
  useQuery({
    queryKey: ["notice-push-alert", token],
    queryFn: () => getNoticePushAlert(token!),
    enabled: !!token,
  });

export const useSubscribeNoticePushAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscribeNoticePushAlert,
    onSuccess: (_, token) => {
      alert("공지 알림이 켜짐!");
      queryClient.invalidateQueries({ queryKey: ["notice-push-alert", token] });
    },
    onError: (error: any) => {
      alert(`FUCK 공지 알림 켜기 실패\n\n${error.message}`);
    },
  });
};

export const useUnsubscribeNoticePushAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unsubscribeNoticePushAlert,
    onSuccess: (_, token) => {
      alert("공지 알림이 꺼짐!");
      queryClient.invalidateQueries({ queryKey: ["notice-push-alert", token] });
    },
    onError: (error: any) => {
      alert(`FUCK 공지 알림 끄기 실패\n\n${error.message}`);
    },
  });
};
