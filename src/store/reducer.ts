import { combineReducers } from "@reduxjs/toolkit";
import adminSlice from "../features/adminSlice";
import { IzyAdminApis } from "../api/Query";

export const reducers = combineReducers({
  admin: adminSlice,
  [IzyAdminApis.reducerPath]: IzyAdminApis.reducer,
});
