import * as React from "react";
import Box from "@mui/material/Box";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./AuthLayout.tsx";
import Login from "../Pages/Login.tsx";
import { AppState } from "../Redux/Reducer/rootReducer.tsx";
import { useSelector } from "react-redux";

export const MasterLayout: React.FunctionComponent = () => {
  const token = useSelector((state: AppState) => state.authReducer.token);

  return (
    <>
      {token ? (
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <AuthLayout></AuthLayout>{" "}
        </Box>
      ) : (
        <Routes>
          <Route path={"/Login"} element={<Login />}></Route>
        </Routes>
      )}
    </>
  );
};
