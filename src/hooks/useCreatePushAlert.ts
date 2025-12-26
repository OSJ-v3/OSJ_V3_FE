import { useMutation } from "@tanstack/react-query";
import { createPushAlert } from "../apis/pushAlerts";

export const useCreatePushAlert = () =>
  useMutation({
    mutationFn: createPushAlert,
  });
