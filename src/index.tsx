import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { Box, Container, SxProps, Theme, keyframes } from '@mui/material';
import background from './Assets/Images/background.png'

const RootContainerStyle: SxProps<Theme> = {
  margin: '0',
  justifyContent: 'center',
  background: 'linear-gradient(45deg, #020024 0%, #40559f 35%, #00d4ff 100%)',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  height: '100vh',
  width: '100vw',
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render( 
  <Box sx={RootContainerStyle}>
    <Router>
      <App/>
    </Router> 
  </Box>  
);