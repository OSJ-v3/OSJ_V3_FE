import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePushAlert } from "../apis/pushAlerts";

export const useDeletePushAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePushAlert,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["push-alerts", variables.token],
      });
    },
  });
};
