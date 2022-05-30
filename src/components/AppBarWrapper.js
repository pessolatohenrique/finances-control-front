import React, { useState } from "react";
import {
  Typography,
  AppBar,
  Box,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import { PROJECT_NAME } from "../constants/default_settings";
import { isPageWithoutLogin } from "../utils/pages";

const items = [
  {
    table: "dashboard",
    link: "",
    icon: <DashboardIcon />,
  },
  {
    table: "novo ganho",
    link: "ganho/novo",
    icon: <AttachMoneyIcon />,
  },
  {
    table: "nova despesa",
    link: "gasto/novo",
    icon: <MoneyOffIcon />,
  },
];

function AppBarWrapper(props) {
  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/signin";
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            data-testid="menu-button"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            data-testid="project-name"
          >
            {PROJECT_NAME}
          </Typography>
          {!isPageWithoutLogin() && (
            <Button
              color="inherit"
              onClick={logout}
              data-testid="logout-button"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          <List>
            {items.map((item, key) => (
              <ListItem button key={key}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Button size="small" color="primary" href={`/${item.link}`}>
                  {item.table}
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </Box>
  );
}

export default AppBarWrapper;
