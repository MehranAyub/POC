import { AnyAction } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { removeToken } from "../../Redux/Reducer/Features/Auth/AuthSlice.tsx";

export const logout = () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  dispatch(removeToken());
};
