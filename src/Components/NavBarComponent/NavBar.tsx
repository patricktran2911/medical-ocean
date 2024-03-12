import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/team-members">Team</Link>
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/Medicines">Medicines</Link>
            <Link to="/Doctors">Doctors</Link>
        </nav>
    )
}

export default NavBar;