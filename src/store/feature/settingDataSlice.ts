import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SettingDataState {
  settingData: any;
}

const initialState: SettingDataState = {
  settingData: null,
};

export const settingDataSlice = createSlice({
  name: "settingData",
  initialState,
  reducers: {
    setsettingData: (state, action: PayloadAction<any>) => {
      state.settingData = action.payload;
    },
  },
});

export const {
  setsettingData
} = settingDataSlice.actions;

export default settingDataSlice.reducer;