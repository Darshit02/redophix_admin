import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any[] = [];

export const teamDataSlice = createSlice({
  name: "TeamData",
  initialState,
  reducers: {
    setteamData: (_state, action: PayloadAction<any[]>) => {
      return action.payload; 
    },
  },
});

export const { setteamData } = teamDataSlice.actions;
export default teamDataSlice.reducer;
