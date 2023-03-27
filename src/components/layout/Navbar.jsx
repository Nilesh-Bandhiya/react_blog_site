import React, { useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBlogs } from "../../store/blogs-slice";
import { toast } from "react-toastify";

const drawerWidth = 180;
const pages = ["Home", "About"];
const settings = ["Profile", "Logout"];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

const Navbar = ({ handleDrawerOpen, open, handleDrawerClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));
  const currentUser = token?.firstName;
  const currentUserId = token?.id;
  const isAdmin = token?.role === "admin";

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (key) => {
    if (key === "Logout") {
      handleDrawerClose();
      toast.success("User Loggedout");
      localStorage.removeItem("token");
      dispatch(getBlogs());
      navigate("/");
    }

    if (key === "Profile") {
      navigate(`/users/${currentUserId}`);
    }

    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" open={open} className="layout-color">
      <Toolbar>
        {isAdmin && (
          <IconButton
            style={{ color: "white" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <img
          src="../blog-logo.png"
          alt=""
          height="35px"
          style={{ marginLeft: "20px", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
          role="link"
        />
        <Box sx={{ flexGrow: 1, display: "flex", marginLeft: "30px" }}>
          {pages.map((page) => (
            <Button key={page} sx={{ color: "white", display: "block" }}>
              <Link
                className="nav-link"
                to={`/${
                  page.toLowerCase() === "home" ? "" : page.toLowerCase()
                }`}
              >
                {page}
              </Link>
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          {currentUser ? (
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={currentUser}
                src="....."
                style={{ color: "black" }}
              />
            </IconButton>
          ) : (
            <Button variant="contained">
              <Link to="/signin" className="nav-link">
                Login
              </Link>
            </Button>
          )}
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
