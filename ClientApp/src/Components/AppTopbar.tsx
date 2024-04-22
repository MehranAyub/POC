import * as React from "react";
import { styled } from "@mui/material/styles";
import Logo from "../Assets/logo.png";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
export interface AppTopbarProps {
  setOpen: any;
  open: any;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const AppTopbar: React.FunctionComponent<AppTopbarProps> = ({
  setOpen,
  open,
}) => {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const Logout = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="fixed" open={open} style={{ backgroundColor: "white" }}>
        <Toolbar>
          {!open && (
            <IconButton
              style={{ color: "#38376e" }}
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography noWrap component="div" sx={{ flexGrow: 1, mt: 2 }}>
            <img style={{ maxWidth: 67 }} src={Logo}></img>
          </Typography>
          <div>
            <Box
              display="flex"
              justifyContent="flex-end"
              flexDirection="row"
              alignItems="center"
            >
              <Typography style={{ color: "#38376e" }} fontWeight={"bold"}>
                Hi Logged User
              </Typography>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                style={{ color: "#38376e" }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                component={Link}
                to={"/Customer/Profile"}
                onClick={handleClose}
                sx={{ fontSize: "14px" }}
              >
                <AccountCircle fontSize="small" sx={{ marginRight: 1 }} />{" "}
                Profile
              </MenuItem>
              <MenuItem onClick={Logout} sx={{ fontSize: "14px" }}>
                <LogoutIcon sx={{ marginRight: 1 }} fontSize="small" /> Log Out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
