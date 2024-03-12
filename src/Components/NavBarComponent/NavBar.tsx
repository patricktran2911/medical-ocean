import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav className='navbar'>
            <Link className='homeButton' to="/">Home</Link>
            <Link className='homeButton' to="/team-members">Team</Link>
        </nav>
    )
}

export default NavBar;