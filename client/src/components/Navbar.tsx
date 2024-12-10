import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import Auth from '../utils/auth';

// MUI Components
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemText from '@mui/material/ListItemText';

const AppNavbar = () => {
  // set modal display state
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{
      width: "100%",
      backgroundColor: '#49191E', // Set the background color to #131313
      height: '100vh', // Ensure the box fills the full height of the drawer
      color: '#CCCCCC', // Set the text and icon color to white
    }}
      role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem>
          <ListItemText><h3>MIST GAMES</h3></ListItemText>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#6c1e23' } }}>
            <ListItemIcon sx={{ color: '#CCCCCC' }}>
              <SearchIcon />
            </ListItemIcon>
            <Nav.Link as={Link} to='/search'>
              <ListItemText>Search for Games</ListItemText>
            </Nav.Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#6c1e23' } }}>
            <ListItemIcon sx={{ color: '#CCCCCC' }}>
              <VideogameAssetIcon />
            </ListItemIcon>
            <Nav.Link as={Link} to='/wishlist'>
              <ListItemText>Your Wishlist</ListItemText>
            </Nav.Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#6c1e23' } }}>
            <ListItemIcon sx={{ color: '#CCCCCC' }}>
              <VideogameAssetIcon />
            </ListItemIcon>
            <Nav.Link as={Link} to='/playing'>
              <ListItemText>Currently Playing</ListItemText>
            </Nav.Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#6c1e23' } }}>
            <ListItemIcon sx={{ color: '#CCCCCC' }}>
              <VideogameAssetIcon />
            </ListItemIcon>
            <Nav.Link as={Link} to='/completed'>
              <ListItemText>Completed Games</ListItemText>
            </Nav.Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ '&:hover': { backgroundColor: '#6c1e23' } }}>
            <ListItemIcon sx={{ color: '#CCCCCC' }}>
              <LogoutIcon />
            </ListItemIcon>
            <Nav.Link onClick={Auth.logout} as={Link} to='/'>
              <ListItemText>Logout</ListItemText>
            </Nav.Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box >
  );

  return (
    <>
      <Box sx={{ backgroundColor: '#49191E' }}>
        <Button sx={{ color: '#FFFFFF', '&:hover': { backgroundColor: '#6c1e23' } }} onClick={toggleDrawer(true)}>
          <MenuIcon sx={{ width: 30, height: 30 }} />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Box>
    </>
  );
};

export default AppNavbar;
