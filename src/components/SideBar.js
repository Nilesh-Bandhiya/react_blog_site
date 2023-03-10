import React from 'react'
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from 'react-router-dom';

const drawerWidth = 180

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SideBar = ({ handleDrawerClose, open }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {["My Blogs", "All Blogs", "Users"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Link
                className='nav-link-black'
                to={`/${text.toLowerCase() === "all blogs" ? "" : text.toLowerCase()
                  }`}
              >
                <ListItemText primary={text} />
                </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default SideBar