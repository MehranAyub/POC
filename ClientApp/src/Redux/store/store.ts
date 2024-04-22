import { Action, configureStore } from "@reduxjs/toolkit";
import {
  createMigrate,
  createTransform,
  PersistConfig,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk, { ThunkAction } from "redux-thunk";

import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer, { AppState } from "../Reducer/rootReducer.tsx";
import { TimeSheetApi } from "../Reducer/Features/TimeSheet/TimeSheetSlice.tsx";
const TransformCredentials = createTransform(
  (inboundState: any, key): any => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key) => {
    return {
      ...outboundState,
    };
  },
  {}
);

const MIGRATION_DEBUG = true;
const migrations = {
  3: (state: any) => ({
    ...state._persist,
  }),
  20: (state: any) => ({
    ...state._persist,
  }),
  25: (state: any) => ({
    ...state._persist,
  }),
};

const persistConfig: PersistConfig<any, any, any, any> = {
  key: "root",
  storage: storage,
  whitelist: ["authReducer"],
  version: 1,
  migrate: createMigrate(migrations, { debug: MIGRATION_DEBUG }),
  transforms: [TransformCredentials],
};

const persistedReducer = persistReducer<any>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disabling checks for serializability
      immutableCheck: false, // Disabling checks for immutability
    }).concat(TimeSheetApi.middleware),
});

export const persistCallBack = () => {};

setupListeners(store.dispatch);
// store.subscribe(agentListener);

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store, null, persistCallBack);
export default store;
