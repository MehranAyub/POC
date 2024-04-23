import * as React from "react";
import Box from "@mui/material/Box";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./AuthLayout.tsx";
import Login from "../Pages/Login.tsx";
import { AppState } from "../Redux/Reducer/rootReducer.tsx";
import { useSelector } from "react-redux";

export const MasterLayout: React.FunctionComponent = () => {
  const isLoggedIn = useSelector(
    (state: AppState) => state.authReducer.isLoggedIn
  );

  return (
    <>
      {isLoggedIn ? (
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <AuthLayout></AuthLayout>{" "}
        </Box>
      ) : (
        <Routes>
          <Route path={"/Login"} element={<Login />}></Route>
          <Route path="/" element={<Navigate to={"/Login"}></Navigate>} />
        </Routes>
      )}
    </>
  );
};
