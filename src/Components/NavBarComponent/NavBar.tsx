import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/team-members">Team</Link>
        </nav>
    )
}

export default NavBar;