import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IzyAdminApis } from "../api/Query";

const persistConfig = {
  key: "root",
  storage,
  debug: true,
  // whiteList: [],
  blacklist: [IzyAdminApis.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export type RootStates = ReturnType<typeof reducers>;

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(IzyAdminApis.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
