import React, { ReactNode, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { Stack } from '@mui/material';
import Appointments from './Components/Appointments';
import TeamMember from './Components/Team_Member';
import Dashboard from './Components/DashboardComponent/Dashboard';
import Patients from './Components/Medicines';
import MedicalStaff from './Components/MedicalStaff';
import NavBar from './Components/NavBarComponent/NavBar';
import './App.css';

function App() {
  return (
    <div className='router'>
      <Router>
        <Stack direction={'column'} useFlexGap={true}>
          <NavBar />
          <Routes>
            <Route path="/Appointments" element={<Appointments title='Team THOR' />} />
            <Route path="/team-members" element={<TeamMember />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Medicines" element={<Patients />} />
            <Route path="/Doctors" element={<MedicalStaff />} />
          </Routes>
        </Stack>
      </Router>
    </div>
  );
}

export default App;
