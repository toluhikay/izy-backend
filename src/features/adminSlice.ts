import { createSlice } from "@reduxjs/toolkit";
import { IzyAdminApis } from "../api/Query";

interface AdminDetails {
  adminPayload: any;
  token: string | null;
}

const initialState = {
  adminPayload: null,
  token: null,
} as AdminDetails;

const AdminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setAdminUserPayload: (state, { payload }) => {},
    logOutAdmin: (state) => {
      state.adminPayload = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(IzyAdminApis.endpoints.adminLogin.matchFulfilled, (state, { payload }) => {
      state.token = payload?.access_token;
    });
  },
});

export const { setAdminUserPayload, logOutAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;
