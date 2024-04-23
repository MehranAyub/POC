import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import HomeIcon from "@mui/icons-material/Home";
export interface AppLeftMenuProps {
  setOpen: any;
  open: any;
}

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const AppLeftMenu: React.FunctionComponent<AppLeftMenuProps> = ({
  open,
  setOpen,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#1e1e40",
            color: "#FFFFFF",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" noWrap component="div">
            Menu
          </Typography>
        </Toolbar>

        <IconButton
          onClick={handleDrawerClose}
          style={{ justifyContent: "right" }}
        >
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon sx={{ color: "#ffff" }} />
          ) : (
            <ChevronRightIcon sx={{ color: "#ffff" }} />
          )}
        </IconButton>

        <Divider sx={{ bgcolor: "white" }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/Home");
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/AddTimeCard");
              }}
            >
              <ListItemIcon>
                <Inventory2Icon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary={"Add Time Card"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/TimeCards");
              }}
            >
              <ListItemIcon>
                <PunchClockIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary={"Time Cards"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{ bgcolor: "white" }} />
      </Drawer>
    </>
  );
};
