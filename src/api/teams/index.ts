import apiClient from "@/lib/api-client";

export const addTeamMamber = async (data: any) => {
  return await apiClient.post("team/create-team", data);
};

export const getteamMamber = async () => {
  return await apiClient.get(`team/get-all-mamber`);
};