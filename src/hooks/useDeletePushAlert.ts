import { useMutation } from "@tanstack/react-query";
import { deletePushAlert } from "../apis/pushAlerts";

export const useDeletePushAlert = () =>
  useMutation({
    mutationFn: deletePushAlert,
  });
