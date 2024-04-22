import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { AuthState } from "../../../../Models/User";
import { axiosBaseQuery, baseURL } from "../../../../Api/agent.ts";

const initialState: AuthState = { isLoggedIn: false };

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userData = action.payload.userData;
    },
    removeToken: (state) => {
      state.token = undefined;
      state.isLoggedIn = false;
      state.userData = undefined;
    },
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (build) => ({}),
});

export const { addToken, removeToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
