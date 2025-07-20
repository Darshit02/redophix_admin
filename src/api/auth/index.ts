import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUserData } from "@/store/feature/authDataSlice";
import apiClient from "@/lib/api-client";
import type { User } from "@/types/auth";
import { apiEndPoints } from "../end-points";

interface LoginResponse {
  success: string;
  message: string;
  data: User & { accessToken: string };
}

interface LoginVariables {
  email: string;
  password: string;
}

const login = async ({
  email,
  password,
}: LoginVariables): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(apiEndPoints.login, {
    email,
    password,
  });
  return response.data;
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      dispatch(setAuthUserData(data));
    },
    onError: (error: any) => {
      // Handle error responses and show appropriate toast messages
      const errorMessage =
        error?.response?.data?.message ||
        "Invalid credentials. Please try again.";
      toast.error(errorMessage);
    },
  });
};
