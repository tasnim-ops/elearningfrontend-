import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';

const NavBarWel = () => {
    const pages = [{'namepage':'HOME','linkto':'/'},
                    {'namepage':'ABOUT','linkto':'/about'},
                    {'namepage':'CONTACT','linkto':'/contact'}];
                    
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate=useNavigate();
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = (linkto) => {
        navigate(linkto)
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    return (

    <div>
 <AppBar position="static" style={{'backgroundColor':'#225d68'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <Avatar alt="logo" src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690459113/logo3_lmo4r0.jpg" sx={{ width: 56, height: 56 }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.namepage} onClick={()=> handleCloseNavMenu(page.linkto)}>
                    <Typography textAlign="center">
                     {page.namepage}
                    </Typography>
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
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          <Avatar alt="logo" src="https://res.cloudinary.com/ddbiyenrd/image/upload/v1690459113/logo3_lmo4r0.jpg" sx={{ width: 56, height: 56 }} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.namepage}
                onClick={()=> handleCloseNavMenu(page.linkto)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.namepage}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <form >
          <Link to="user/register" ><button className="btn" type='submit'  style={{ backgroundColor: "#660066" ,'color':'#ffffff'}}>Join </button></Link>
          <Link to="user/login" ><button className="btn" type='submit'  style={{ backgroundColor: "#2a969c" ,'color':'#ffffff'}}>SIGN IN</button></Link>

          </form>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}

export default NavBarWel