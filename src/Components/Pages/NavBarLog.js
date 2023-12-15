import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { useState } from "react";
const NavBarLog = () => {
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pages = [
    { namepage: "HOME", linkto: "/" },
    { namepage: "ABOUT", linkto: "/about" },
    { namepage: "CONTACT", linkto: "/contact" },
    {
      namepage: "Categories",
      linkto: role === "student" ? "/categ" : "/editcateg",
    },
    {
      namepage: "Courses",
      linkto: role === "teacher" ? "/addcourse" : "course",
    },
    { namepage: "Teachers", linkto: "/teachers" },
  ];

  // ... (rest of the component)

  const settings = [
    { option: "Profile", linkto: "/user/profile" },
    { option: "Logout", linkto: "/" },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOfUserMenu = (linkto) => {
    //console.log("Handling user menu:", linkto);
    handleCloseUserMenu();
    navigate(linkto);
  };

  const handleOfNavMenu = (linkto) => {
    //console.log("Handling nav menu:", linkto);
    if ((linkto = "/")) {
      dispatch(logout());
    }
    handleCloseNavMenu();
    navigate(linkto);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#225d68" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Avatar
                alt="logo"
                src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690459113/logo3_lmo4r0.jpg"
                sx={{ width: 56, height: 56 }}
              />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.namepage}
                    onClick={() => handleOfUserMenu(page.linkto)}
                  >
                    <Typography textAlign="center">{page.namepage}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Avatar
                alt="logo"
                src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690459113/logo3_lmo4r0.jpg"
                sx={{ width: 56, height: 56 }}
              />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.namepage}
                  onClick={() => {
                    handleCloseNavMenu();
                    handleCloseUserMenu();
                    navigate(page.linkto);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.namepage}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user && user.photo} />
              </IconButton>
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
                    key={setting.option}
                    onClick={() => handleOfNavMenu(setting.linkto)}
                  >
                    <Typography textAlign="center">{setting.option}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default NavBarLog;
