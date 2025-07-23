import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TeamDataState {
  TeamData: any;
}

const initialState: TeamDataState = {
  TeamData: [],
};

export const teamDataSlice = createSlice({
  name: "TeamData",
  initialState,
 reducers: {
  setteamData: (state, action: PayloadAction<any[]>) => {
    state.TeamData = action.payload;
  },
},
});

export const {
  setteamData
} = teamDataSlice.actions;

export default teamDataSlice.reducer;