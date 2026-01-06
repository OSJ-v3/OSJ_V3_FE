import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPushAlert } from "../apis/pushAlerts";

export const useCreatePushAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPushAlert,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["push-alerts", variables.token],
      });
    },
  });
};
