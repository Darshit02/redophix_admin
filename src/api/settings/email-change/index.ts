import apiClient from "@/lib/api-client";

export const patchChangeEmail = async (data: any) => {
  return await apiClient.patch("settings/email-change", data);
};