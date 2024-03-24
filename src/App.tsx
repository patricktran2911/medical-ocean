import React, { ReactNode, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Stack } from '@mui/material';
import Home from './Components/Home';
import TeamMember from './Components/Team_Member';
import Dashboard from './Components/DashboardComponent/Dashboard';
import Medicines from './Components/Medicines';
import Doctors from './Components/Doctors';
import NavBar from './Components/NavBarComponent/NavBar';
import './App.css';

function App() {
  return (
    <div className='router'>
      <Router>
        <Stack direction={'column'} useFlexGap={true}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home title='Team THOR' />} />
            <Route path="/team-members" element={<TeamMember />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Medicines" element={<Medicines />} />
            <Route path="/Doctors" element={<Doctors />} />
          </Routes>
        </Stack>
      </Router>
    </div>
  );
}

export default App;
