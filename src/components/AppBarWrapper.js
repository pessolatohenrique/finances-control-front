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
import BookIcon from "@material-ui/icons/Book";
import PeopleIcon from "@material-ui/icons/People";
import { PROJECT_NAME } from "../constants/default_settings";

const items = [
  {
    table: "autores",
    link: "autores",
    icon: <PeopleIcon />,
  },
  {
    table: "livros",
    link: "livros",
    icon: <BookIcon />,
  },
  {
    table: "livros detalhes",
    link: "livros/5",
    icon: <BookIcon />,
  },
];

function AppBarWrapper() {
  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
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
          <Button color="inherit">Login</Button>
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
