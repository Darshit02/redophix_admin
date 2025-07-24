import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { sendResetEmail } from "@/api/settings/reset-password";

export const SEND_RESET_EMAIL = createAsyncThunk(
  "auth/send-reset-password-email",
  async (payload: { email: string }, _thunkAPI) => {
    try {
      const response = await sendResetEmail(payload);
      if (response.status === 200) {
        toast.success("Reset link sent to your email.");
        return true;
      }
    } catch (error: any) {
      const msg = error?.response?.data?.message || "Failed to send reset email.";
      toast.error(msg);
    }
    return false;
  }
);
