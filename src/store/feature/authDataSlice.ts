import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserDataState {
  authUserData: any;
}

const initialState: UserDataState = {
  authUserData: null
};

export const authDataSlice = createSlice({
  name: "authData",
  initialState,
  reducers: {
    setAuthUserData: (state, action: PayloadAction<any>) => {
      state.authUserData = action.payload;
    }
  },
});

export const { setAuthUserData } = authDataSlice.actions;

export default authDataSlice.reducer;