import { combineReducers } from "@reduxjs/toolkit";
import { authApi, authReducer } from "./Features/Auth/AuthSlice.tsx";
import {
  TimeSheetApi,
  TimeSheetReducer,
} from "./Features/TimeSheet/TimeSheetSlice.tsx";

const rootReducer = combineReducers({
  authReducer,
  TimeSheetReducer,
  [authApi.reducerPath]: authApi.reducer,
  [TimeSheetApi.reducerPath]: TimeSheetApi.reducer,
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
