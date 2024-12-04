import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

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
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemText from '@mui/material/ListItemText';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{
      width: 250,
      backgroundColor: '#49191E', // Set the background color to #131313
      height: '100vh', // Ensure the box fills the full height of the drawer
      color: '#CCCCCC', // Set the text and icon color to white
    }}
      role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{'&:hover': {backgroundColor: '#6c1e23'}}}>
            <ListItemIcon sx={{ color: '#CCCCCC' }}>
              <SearchIcon />
            </ListItemIcon>
            <Nav.Link as={Link} to='/'>
              <ListItemText>Search for Games</ListItemText>
            </Nav.Link>
          </ListItemButton>
        </ListItem>
        {Auth.loggedIn() ? (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{'&:hover': {backgroundColor: '#6c1e23'}}}>
                <ListItemIcon sx={{ color: '#CCCCCC' }}>
                  <VideogameAssetIcon />
                </ListItemIcon>
                <Nav.Link as={Link} to='/saved'>
                  <ListItemText>See Your Games</ListItemText>
                </Nav.Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{'&:hover': {backgroundColor: '#6c1e23'}}}>
                <ListItemIcon sx={{ color: '#CCCCCC' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <Nav.Link onClick={Auth.logout}>
                  <ListItemText>Logout</ListItemText>
                </Nav.Link>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton sx={{'&:hover': {backgroundColor: '#6c1e23'}}}>
              <ListItemIcon sx={{ color: '#CCCCCC' }}>
                <LoginIcon />
              </ListItemIcon>
              <Nav.Link onClick={() => setShowModal(true)}>
                <ListItemText>Login/Sign Up</ListItemText>
              </Nav.Link>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <div>
        <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
