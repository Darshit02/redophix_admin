import { setsettingData } from "@/store/feature/settingDataSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { patchChangeEmail } from ".";
import toast from "react-hot-toast";

type Payload = any;

export const CHNAGE_EMAIL = createAsyncThunk<boolean, Payload>(
  "payload",
  async (payload, thunkAPI) => {
    try {
      const response: any = await patchChangeEmail(payload);

      if (response.status === 200) {
        thunkAPI.dispatch(setsettingData(response.data));
        toast.success(`Email changed successfully)`);
        return true;
      } else {
        toast.error(`Unexpected`);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong.";

      toast.error(` ${message} `);
      console.error("Change email error:", message, error);
    }

    return false;
  }
);
