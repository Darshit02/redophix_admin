import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTeamMamber, getteamMamber } from ".";
import toast from "react-hot-toast";
import { setteamData } from "@/store/feature/teamDataSlice";

type Payload = any;

export const ADD_TEAM_MAMBER = createAsyncThunk<boolean, Payload>(
  "payload",
  async (payload, thunkAPI) => {
    try {
      const response: any = await addTeamMamber(payload);
      if (response.status === 200) {
        toast.success(`Team mamber added successfully)`);
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
      console.error("Mamber adding error:", message, error);
    }

    return false;
  }
);


  export const GET_TEAM_MAMBER = createAsyncThunk<boolean, Payload>(
    "payload",
    async (payload, thunkAPI) => {
      try {
        const data: any = await getteamMamber();
        if (data.status === 200) {
          thunkAPI.dispatch(setteamData(data.data));
          console.log(data.data)
          return true;
        }
      } catch (err) {
        console.error(err);
      }
      return false;
    }
  );
  
