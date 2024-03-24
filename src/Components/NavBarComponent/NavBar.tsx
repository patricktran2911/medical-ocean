import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import './NavBar.css';

function NavBar() {
    return (
        <Stack 
        className='navbar' 
        direction={'row'}
        boxSizing={'border-box'}
        boxShadow={16}>
            <Link className='homeButton' to="/">Home</Link>
            <Link className='homeButton' to="/team-members">Team</Link>
            <Link className='homeButton' to="/Dashboard">Dashboard</Link>
            <Link className='homeButton' to="/Medicines">Medicines</Link>
            <Link className='homeButton' to="/Doctors">Doctors</Link>
        </Stack>
    )
}

export default NavBar;