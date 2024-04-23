import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AppTopbar } from "../Components/AppTopbar.tsx";
import { AppLeftMenu } from "./AppLeftMenu.tsx";
import HomePage from "../Pages/HomePage.tsx";
import ClientTimeCard from "../Pages/ClientTimeCard.tsx";
import { useSelector } from "react-redux";
import { AppState } from "../Redux/Reducer/rootReducer.tsx";
import UnapprovedTimeCard from "../Pages/UnapprovedTimeCard.tsx";

export interface AuthLayoutProps {}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  backgroundColor: "#f9f9f9",
  minHeight: "calc(100vh)",
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const AuthLayout: React.FunctionComponent<AuthLayoutProps> = () => {
  const token = useSelector((state: AppState) => state.authReducer.token);
  const [open, setOpen] = React.useState(true);
  let navigate = useNavigate();
  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  //   if (!isTokenValid(targetWebAccessToken ?? "", dispatch)) {
  //     navigate("/login");
  //   }

  return (
    <>
      <CssBaseline />

      <AppTopbar setOpen={setOpen} open={open}></AppTopbar>
      <AppLeftMenu setOpen={setOpen} open={open} />

      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path={"/Home"} element={<HomePage />}></Route>
          <Route path={"/ManageTimeCards"} element={<ClientTimeCard />}></Route>
          <Route
            path={"/UnapprovedTimeCards"}
            element={<UnapprovedTimeCard />}
          ></Route>
        </Routes>
      </Main>
    </>
  );
};
