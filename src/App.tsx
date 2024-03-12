import React, { ReactNode, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import TeamMember from './Components/Team_Member';
import NavBar from './Components/NavBarComponent/NavBar';
import './App.css';

function App() {
  return (
    <div className='router'>
      <Router>
       <BackgroundSetter>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home title='Team THOR' />} />
            <Route path="/team-members" element={<TeamMember />} />
        </Routes>
        </div>
        </BackgroundSetter>
      </Router>
    </div>
  );
}

type BackgroundSetterProps = {
  children: ReactNode;
}

function BackgroundSetter({ children }: BackgroundSetterProps) {
  const location = useLocation();

  useEffect(() => {
    // Change the background based on the route
    switch (location.pathname) {
      case '/':
        document.body.style.backgroundColor = '#f0f0f0'; // Example background color for home
        break;
      case '/team-members':
        document.body.style.backgroundColor = '#b0c4de'; // Example background color for team-members
        break;
      // Add more cases for other paths as needed
      default:
        document.body.style.backgroundColor = 'black'; // Default background color
    }
  }, [location]);

  return <>{children}</>;
}

export default App;
