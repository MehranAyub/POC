import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit/react";
import * as Yup from "yup";
import axios from "axios";
import { baseURL } from "../Api/agent.ts";
import { addToken } from "../Redux/Reducer/Features/Auth/AuthSlice.tsx";

export interface User {
  id: number;
  name: string;
  userId: String;
  email: string;
  role: Role;
}

enum Role {
  Admin,
  User,
}

export interface AuthState {
  userData?: User;
  isLoggedIn: boolean;
  token?: string;
}

export interface LoginFormValues {
  userId: string;
  password: string;
}
export const LoginInitialValues: LoginFormValues = {
  userId: "",
  password: "",
};

export const LoginSchema = Yup.object<any>().shape<any>({
  userId: Yup.string().required("User ID is required"),
  password: Yup.string().required("Password is required"),
});

export const AdminLoginApi =
  (values: LoginFormValues, onComplete: any, onError: any) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    await axios
      .post(
        `${baseURL}api/User`,
        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res?.data?.status === 200) {
          dispatch(
            addToken({
              token: res.data.entity.token,
              isLoggedIn: true,
              userData: res.data.entity.userData,
            })
          );
          onComplete();
        } else {
          onError();
        }
      })
      .catch((error) => {
        onError();
      });
  };
