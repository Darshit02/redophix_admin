import apiClient from "@/lib/api-client";

export const sendResetEmail = async (data: { email: string }) => {
  return await apiClient.post("/settings/reset-password-email-send", data);
};

export const confirmResetPassword = async (token: string, data: { password: string }) => {
  return await apiClient.post(`/settings/reset-password/${token}`, data);
};
