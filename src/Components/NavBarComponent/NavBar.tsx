import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <nav className='navbar'>

            <Link className='homeButton' to="/">Home</Link>
            <Link className='homeButton' to="/team-members">Team</Link>
            <Link className='homeButton' to="/Dashboard">Dashboard</Link>
            <Link className='homeButton' to="/Medicines">Medicines</Link>
            <Link className='homeButton' to="/Doctors">Doctors</Link>
        </nav>
    )
}

export default NavBar;